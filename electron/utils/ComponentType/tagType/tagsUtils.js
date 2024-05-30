"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsToNested = exports.tagsFromApi = exports.mergeTagObjectRecords = void 0;
var js_yaml_1 = __importDefault(require("js-yaml"));
function mergeTagObjectRecords(record1, record2) {
    var mergedRecord = {};
    var mergeTags = function (tags1, tags2) {
        var mergedTags = __spreadArray([], tags1, true);
        var tagMap = new Map(tags1.map(function (tag) { return [tag.code, tag]; }));
        tags2.forEach(function (tag) {
            if (tagMap.has(tag.code)) {
                var existingTag = tagMap.get(tag.code);
                // Deep merge logic for TagInfo, adjust according to your needs
                existingTag.description = tag.description
                    ? tag.description
                    : existingTag.description;
                existingTag.reference = tag.reference
                    ? tag.reference
                    : existingTag.reference;
                existingTag.required = tag.required
                    ? tag.required
                    : existingTag.required;
                existingTag.list = tag.list ? tag.list : existingTag.list;
            }
            else {
                mergedTags.push(tag);
            }
        });
        return mergedTags;
    };
    var addItems = function (key, items) {
        if (!mergedRecord[key]) {
            mergedRecord[key] = [];
        }
        items.forEach(function (item) {
            var existingItem = mergedRecord[key].find(function (existing) { return existing.path === item.path; });
            if (existingItem) {
                existingItem.tag = mergeTags(existingItem.tag, item.tag);
            }
            else {
                mergedRecord[key].push(item);
            }
        });
    };
    Object.keys(record1).forEach(function (key) { return addItems(key, record1[key]); });
    Object.keys(record2).forEach(function (key) { return addItems(key, record2[key]); });
    return mergedRecord;
}
exports.mergeTagObjectRecords = mergeTagObjectRecords;
function tagsFromApi(yamlData) {
    var obj = js_yaml_1.default.load(yamlData);
    var data = {};
    for (var key in obj) {
        data[key] = listDetailedPaths(obj[key]);
    }
    return data;
}
exports.tagsFromApi = tagsFromApi;
function tagsToNested(data) {
    var nestedData = {};
    for (var key in data) {
        nestedData[key] = convertDetailedPathsToNestedObjects(data[key]);
    }
    return nestedData;
}
exports.tagsToNested = tagsToNested;
function listDetailedPaths(obj) {
    var detailedPaths = [];
    detailedPaths = explorePaths(obj, "", detailedPaths);
    return detailedPaths;
}
function explorePaths(subObj, currentPath, detailedPaths) {
    for (var key in subObj) {
        var newPath = currentPath ? "".concat(currentPath, ".").concat(key) : key;
        if (typeof subObj[key] === "object" &&
            subObj[key] !== null &&
            !Array.isArray(subObj[key])) {
            detailedPaths = explorePaths(subObj[key], newPath, detailedPaths);
        }
        if (Array.isArray(subObj[key])) {
            var tags = subObj[key].map(function (element) {
                return {
                    code: element.code,
                    description: element.description,
                    reference: element.reference,
                    required: element.required,
                    list: element.list,
                };
            });
            detailedPaths.push({ path: newPath, tag: tags });
        }
    }
    return detailedPaths;
}
function convertDetailedPathsToNestedObjects(detailedPaths) {
    function setPath(obj, path, value) {
        var keys = path.split(".");
        var lastKey = keys.pop();
        var lastObj = keys.reduce(function (obj, key) { return (obj[key] = obj[key] || {}); }, obj);
        lastObj[lastKey] = value;
    }
    var nestedObject = {};
    detailedPaths.forEach(function (element) {
        setPath(nestedObject, element.path, element.tag);
    });
    return nestedObject;
}
// (async () => {
//   const filePath = path.resolve(
//     __dirname,
//     "../../../../../ONDC-NTS-Specifications/tags/index.yaml"
//   );
//   const data = await loadYamlWithRefs(filePath);
//   //   console.log(JSON.stringify(data, null, 2));
//   const det = listDetailedPaths(data);
//   const nested = convertDetailedPathsToNestedObjects(det);
//   console.log(JSON.stringify(det, null, 2));
//   console.log(convertToYamlWithRefs(nested));
// })();
