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
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToYamlWithRefs = void 0;
var yaml_1 = require("yaml");
function convertToYamlWithRefs(input) {
    var doc = new yaml_1.Document(input);
    var cache = new Map();
    function serialize(obj) {
        try {
            return JSON.stringify(obj);
        }
        catch (_a) {
            return null; // Handle non-serializable values
        }
    }
    function manageAnchorsAndAliases(obj, path) {
        if (path === void 0) { path = []; }
        if (obj && typeof obj === "object") {
            var serialized = serialize(obj);
            if (serialized === null)
                return;
            if (cache.has(serialized)) {
                var node = cache.get(serialized);
                doc.setIn(path, doc.createAlias(node));
            }
            else {
                cache.set(serialized, doc.getIn(path));
                Object.keys(obj).forEach(function (key) {
                    manageAnchorsAndAliases(obj[key], __spreadArray(__spreadArray([], path, true), [key], false));
                });
            }
        }
    }
    manageAnchorsAndAliases(input);
    return doc.toString();
}
exports.convertToYamlWithRefs = convertToYamlWithRefs;
