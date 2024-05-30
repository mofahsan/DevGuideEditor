"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagFileType = void 0;
var FileTypeEditable_1 = require("../../FileTypeEditable");
var fileUtils_1 = require("../../fileUtils");
var yamlRefConvert_1 = require("../../extraUtils/yamlRefConvert");
var yamlUtils_1 = require("../../yamlUtils");
var tagsUtils_1 = require("./tagsUtils");
var TagFileType = /** @class */ (function (_super) {
    __extends(TagFileType, _super);
    function TagFileType(path, name) {
        return _super.call(this, path, name) || this;
    }
    TagFileType.prototype.getRegisterID = function () {
        return TagFileType.REGISTER_ID;
    };
    TagFileType.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = tagsUtils_1.tagsFromApi;
                        return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(this.yamlPathLong)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    TagFileType.prototype.add = function (dataToAdd) {
        return __awaiter(this, void 0, void 0, function () {
            var data, newData, yml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("adding data", dataToAdd);
                        this.setMissingReferences(dataToAdd);
                        return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        newData = (0, tagsUtils_1.mergeTagObjectRecords)(data, dataToAdd);
                        yml = (0, tagsUtils_1.tagsToNested)(newData);
                        return [4 /*yield*/, (0, yamlUtils_1.overrideYaml)(this.yamlPathLong, (0, yamlRefConvert_1.convertToYamlWithRefs)(yml))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TagFileType.prototype.remove = function (dataToDel) {
        return __awaiter(this, void 0, void 0, function () {
            var data, key, val, _loop_1, _i, val_1, tagGroup, yml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        for (key in dataToDel) {
                            val = dataToDel[key];
                            if (data.hasOwnProperty(key)) {
                                if (typeof val === "string") {
                                    delete data[key];
                                }
                                else if (Array.isArray(val)) {
                                    _loop_1 = function (tagGroup) {
                                        if (tagGroup.type === "tagGroup") {
                                            data[key] = data[key].filter(function (d) { return d.path !== tagGroup.path; });
                                        }
                                        else if (tagGroup.type === "tag") {
                                            var target = data[key].find(function (d) { return d.path === tagGroup.path; });
                                            if (target) {
                                                target.tag = target.tag.filter(function (t) { return !tagGroup.tag.find(function (tg) { return tg.code === t.code; }); });
                                            }
                                        }
                                    };
                                    for (_i = 0, val_1 = val; _i < val_1.length; _i++) {
                                        tagGroup = val_1[_i];
                                        _loop_1(tagGroup);
                                    }
                                }
                            }
                        }
                        yml = (0, tagsUtils_1.tagsToNested)(data);
                        return [4 /*yield*/, (0, yamlUtils_1.overrideYaml)(this.yamlPathLong, (0, yamlRefConvert_1.convertToYamlWithRefs)(yml))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TagFileType.prototype.update = function (dataToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _loop_2, key, yml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        if (dataToUpdate.hasOwnProperty("oldName") &&
                            dataToUpdate.hasOwnProperty("newName") &&
                            !Array.isArray(dataToUpdate.newName) &&
                            !Array.isArray(dataToUpdate.oldName)) {
                            data[dataToUpdate.newName] = data[dataToUpdate.oldName];
                            delete data[dataToUpdate.oldName];
                        }
                        else {
                            _loop_2 = function (key) {
                                if (data.hasOwnProperty(key)) {
                                    data[key] = data[key].map(function (d) {
                                        var updated = dataToUpdate[key].find(function (u) { return u.path === d.path; });
                                        return updated ? updated : d;
                                    });
                                }
                            };
                            for (key in dataToUpdate) {
                                _loop_2(key);
                            }
                        }
                        yml = (0, tagsUtils_1.tagsToNested)(data);
                        return [4 /*yield*/, (0, yamlUtils_1.overrideYaml)(this.yamlPathLong, (0, yamlRefConvert_1.convertToYamlWithRefs)(yml))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TagFileType.prototype.setMissingReferences = function (dataToAdd) {
        for (var key in dataToAdd) {
            for (var _i = 0, _a = dataToAdd[key]; _i < _a.length; _i++) {
                var data = _a[_i];
                data.tag.forEach(function (e) {
                    if (!e.reference) {
                        e.reference = "<PR/Issue/Discussion Links md format text";
                    }
                    e.list.forEach(function (l) {
                        if (!l.reference) {
                            l.reference = "<PR/Issue/Discussion Links md format text";
                        }
                    });
                });
            }
        }
    };
    TagFileType.REGISTER_ID = "TAG_FILE";
    return TagFileType;
}(FileTypeEditable_1.FileTypeEditable));
exports.TagFileType = TagFileType;
