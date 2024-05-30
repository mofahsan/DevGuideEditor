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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleDomainFolderType = void 0;
var folderTypeEditable_1 = require("../../folderTypeEditable");
var yamlUtils_1 = require("../../yamlUtils");
var fileUtils_1 = require("../../fileUtils");
var js_yaml_1 = __importDefault(require("js-yaml"));
var exampleUtils_1 = require("./exampleUtils");
var path_1 = __importDefault(require("path"));
var ExampleDomainFolderType = /** @class */ (function (_super) {
    __extends(ExampleDomainFolderType, _super);
    function ExampleDomainFolderType(path, name) {
        return _super.call(this, path, name) || this;
    }
    ExampleDomainFolderType.prototype.getRegisterID = function () {
        return ExampleDomainFolderType.REGISTER_ID;
    };
    ExampleDomainFolderType.prototype.add = function (newExamples) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _i, key, _d, _e, example, generatedName;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = newExamples.examples;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _f.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 6];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 5];
                        key = _c;
                        _d = 0, _e = newExamples.examples[key];
                        _f.label = 2;
                    case 2:
                        if (!(_d < _e.length)) return [3 /*break*/, 5];
                        example = _e[_d];
                        generatedName = key + "_" + example.summary.trim().split(" ").join("_");
                        example.exampleName = generatedName;
                        example.name = key;
                        return [4 /*yield*/, this.addSingleExample(example)];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4:
                        _d++;
                        return [3 /*break*/, 2];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ExampleDomainFolderType.prototype.addSingleExample = function (newEditable) {
        return __awaiter(this, void 0, void 0, function () {
            var validExample;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (newEditable.name === "forms" && newEditable.ID !== "FORM") {
                            throw new Error("To use form please select form type");
                        }
                        if (!(newEditable.ID === "FORM")) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, exampleUtils_1.AddForm)(newEditable.exampleName, newEditable.exampleValue, this.folderPath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!(newEditable.ID === "JSON")) return [3 /*break*/, 6];
                        // console.log("validating json", newEditable.exampleValue);
                        if (typeof newEditable.exampleValue === "string") {
                            newEditable.exampleValue = JSON.parse(newEditable.exampleValue);
                        }
                        return [4 /*yield*/, (0, fileUtils_1.ValidateJsonSchema)(newEditable.exampleValue)];
                    case 3:
                        validExample = _a.sent();
                        if (!validExample) {
                            throw new Error("Invalid Example JSON");
                        }
                        console.log("validated json");
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefExampleDomain)(this.yamlPathLong, newEditable.name, newEditable.summary, newEditable.description, newEditable.exampleName)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (0, exampleUtils_1.AddExampleJson)({
                                folderApi: newEditable.name,
                                exampleName: newEditable.exampleName,
                                exampleValue: newEditable.exampleValue,
                                folderPath: this.folderPath,
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ExampleDomainFolderType.prototype.getData = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var string, data, parsedData, getData, _a, _b, _c, _i, key, _d, _e, e, p, fileData, formData;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(this.yamlPathLong)];
                    case 1:
                        string = _f.sent();
                        data = js_yaml_1.default.load(string);
                        parsedData = data;
                        getData = {};
                        _a = parsedData;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 7];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 6];
                        key = _c;
                        getData[key] = [];
                        _d = 0, _e = parsedData[key].examples;
                        _f.label = 3;
                    case 3:
                        if (!(_d < _e.length)) return [3 /*break*/, 6];
                        e = _e[_d];
                        p = path_1.default.resolve(this.folderPath, e.value.$ref);
                        return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(p)];
                    case 4:
                        fileData = _f.sent();
                        getData[key].push({
                            summary: e.summary,
                            description: e.description,
                            apiName: e.value.$ref.split("/").pop().split(".")[0],
                            $ref: e.value.$ref,
                            exampleJson: js_yaml_1.default.load(fileData),
                        });
                        _f.label = 5;
                    case 5:
                        _d++;
                        return [3 /*break*/, 3];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [4 /*yield*/, (0, exampleUtils_1.GetFormData)(this.folderPath)];
                    case 8:
                        formData = _f.sent();
                        if (formData) {
                            getData["forms"] = formData;
                        }
                        return [2 /*return*/, getData];
                }
            });
        });
    };
    ExampleDomainFolderType.prototype.remove = function (deleteTarget) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log(deleteTarget);
                        if (!deleteTarget.formName) return [3 /*break*/, 2];
                        console.log("deleting form", deleteTarget.formName);
                        return [4 /*yield*/, (0, fileUtils_1.deleteFile)(this.folderPath + "/form/".concat(deleteTarget.formName, ".html"))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!deleteTarget.exampleName) return [3 /*break*/, 6];
                        _b = (_a = js_yaml_1.default).load;
                        return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(this.yamlPathLong)];
                    case 3:
                        data = _b.apply(_a, [_c.sent()]);
                        data[deleteTarget.folderName].examples = data[deleteTarget.folderName].examples.filter(function (e) {
                            return (e.value.$ref !==
                                "./".concat(deleteTarget.folderName, "/").concat(deleteTarget.exampleName, ".yaml"));
                        });
                        return [4 /*yield*/, (0, yamlUtils_1.overrideYaml)(this.yamlPathLong, js_yaml_1.default.dump(data))];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, (0, fileUtils_1.deleteFile)(this.folderPath +
                                "/".concat(deleteTarget.folderName, "/").concat(deleteTarget.exampleName, ".yaml"))];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        // await super.remove(deleteTarget);
                        (0, exampleUtils_1.DeleteExampleFolder)(this.folderPath + "/".concat(deleteTarget.folderName));
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefExampleDomain)(this.yamlPathLong, deleteTarget.folderName, "", "", "", true)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ExampleDomainFolderType.prototype.update = function (update) {
        return __awaiter(this, void 0, void 0, function () {
            var exName, exValue, data, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(update.type === "EXAMPLE")) return [3 /*break*/, 4];
                        exName = update.oldName + "_" + update.summary.trim().split(" ").join("_");
                        return [4 /*yield*/, (0, fileUtils_1.readYamlFile)("".concat(this.folderPath, "/").concat(update.oldName, "/").concat(exName, ".yaml"))];
                    case 1:
                        exValue = _d.sent();
                        exValue = js_yaml_1.default.load(exValue);
                        return [4 /*yield*/, this.remove({
                                folderName: update.oldName,
                                exampleName: exName,
                            })];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, this.add({
                                ID: "",
                                name: "",
                                examples: (_c = {},
                                    _c[update.oldName] = [
                                        {
                                            ID: "JSON",
                                            name: update.oldName,
                                            exampleName: "",
                                            summary: update.newName,
                                            description: update.description,
                                            exampleValue: exValue,
                                        },
                                    ],
                                    _c),
                            })];
                    case 3:
                        _d.sent();
                        return [2 /*return*/];
                    case 4:
                        _b = (_a = js_yaml_1.default).load;
                        return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(this.yamlPathLong)];
                    case 5:
                        data = _b.apply(_a, [_d.sent()]);
                        data[update.oldName].examples = data[update.oldName].examples.map(function (e) {
                            if (e.value.$ref === "./".concat(update.exampleName, ".yaml")) {
                                return {
                                    summary: update.summary,
                                    description: update.description,
                                    value: { $ref: "./".concat(update.newName, "/").concat(update.exampleName, ".yaml") },
                                };
                            }
                            return e;
                        });
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefExampleDomain)(this.yamlPathLong, update.oldName, "", "", update.exampleName, true)];
                    case 6:
                        _d.sent();
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefExampleDomain)(this.yamlPathLong, update.newName, update.summary, update.description, update.exampleName)];
                    case 7:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExampleDomainFolderType.REGISTER_ID = "EXAMPLE_DOMAIN_FOLDER";
    return ExampleDomainFolderType;
}(folderTypeEditable_1.folderTypeEditable));
exports.ExampleDomainFolderType = ExampleDomainFolderType;
