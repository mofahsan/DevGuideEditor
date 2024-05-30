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
exports.flowToNested = exports.flowFromApi = exports.mergeFlowObjectRecords = void 0;
var js_yaml_1 = __importDefault(require("js-yaml"));
function mergeFlowObjectRecords(record1, record2) {
    var mergedRecord = {};
    var addItems = function (key, items) {
        if (mergedRecord[key]) {
            mergedRecord[key] = __spreadArray(__spreadArray([], mergedRecord[key], true), items, true);
        }
        else {
            mergedRecord[key] = __spreadArray([], items, true);
        }
    };
    Object.keys(record1).forEach(function (key) { return addItems(key, record1[key]); });
    Object.keys(record2).forEach(function (key) { return addItems(key, record2[key]); });
    return mergedRecord;
}
exports.mergeFlowObjectRecords = mergeFlowObjectRecords;
function flowFromApi(yamlData) {
    var obj = js_yaml_1.default.load(yamlData);
    // let data = {};
    // for (const key in obj) {
    //   data[key] = listDetailedPaths(obj[key]);
    // }
    // return data;
    return obj;
}
exports.flowFromApi = flowFromApi;
function flowToNested(data) {
    var nestedData = {};
    for (var key in data) {
        nestedData[key] = convertDetailedPathsToNestedObjects(data[key]);
    }
    return nestedData;
}
exports.flowToNested = flowToNested;
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
            var flow = subObj[key].map(function (element) {
                return {
                    code: element.code,
                    description: element.description,
                    reference: element.reference,
                    required: element.required,
                    list: element.list,
                };
            });
            detailedPaths.push({ path: newPath, Flow: flow });
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
        setPath(nestedObject, element.path, element.Flow);
    });
    return nestedObject;
}
// (async () => {
//   const filePath = path.resolve(
//     __dirname,
//     "../../../../../ONDC-NTS-Specifications/flow/index.yaml"
//   );
//   const data = await loadYamlWithRefs(filePath);
//   //   console.log(JSON.stringify(data, null, 2));
//   const det = listDetailedPaths(data);
//   const nested = convertDetailedPathsToNestedObjects(det);
//   console.log(JSON.stringify(det, null, 2));
//   console.log(convertToYamlWithRefs(nested));
// })();
