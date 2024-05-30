"use strict";
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
exports.EditableRegistry = void 0;
var promises_1 = __importDefault(require("fs/promises"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var yamlUtils_1 = require("./yamlUtils");
var fileUtils_1 = require("./fileUtils");
var EditableRegistry = /** @class */ (function () {
    function EditableRegistry() {
    }
    EditableRegistry.register = function (cls) {
        this.registry[cls.REGISTER_ID] = cls;
    };
    EditableRegistry.create = function (type, path, name) {
        return __awaiter(this, void 0, void 0, function () {
            var cls, object, removeContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cls = this.registry[type];
                        if (!cls) {
                            throw new Error("No registered class with ID ".concat(type));
                        }
                        object = new cls(path, name);
                        removeContent = false;
                        if (object.getRegisterID().includes("FOLDER")) {
                            if (object.getRegisterID() === "COMPONENTS-FOLDER") {
                                removeContent = false;
                            }
                            else {
                                removeContent = true;
                            }
                        }
                        return [4 /*yield*/, object.initIndexYaml(path, removeContent)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, object];
                }
            });
        });
    };
    EditableRegistry.loadComponent = function (componentPath, name) {
        return __awaiter(this, void 0, void 0, function () {
            var comp, compFiles, _i, compFiles_1, file, _a, compFiles_2, file;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, EditableRegistry.create("COMPONENTS-FOLDER", componentPath, name)];
                    case 1:
                        comp = _b.sent();
                        return [4 /*yield*/, promises_1.default.readdir(comp.folderPath, {
                                withFileTypes: true,
                            })];
                    case 2:
                        compFiles = _b.sent();
                        _i = 0, compFiles_1 = compFiles;
                        _b.label = 3;
                    case 3:
                        if (!(_i < compFiles_1.length)) return [3 /*break*/, 6];
                        file = compFiles_1[_i];
                        if (!file.isDirectory())
                            return [3 /*break*/, 5];
                        if (!(file.name === "enums")) return [3 /*break*/, 5];
                        return [4 /*yield*/, fs_1.default.renameSync("".concat(comp.folderPath, "/enums"), "".concat(comp.folderPath, "/enum"))];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, promises_1.default.readdir(comp.folderPath, {
                            withFileTypes: true,
                        })];
                    case 7:
                        compFiles = _b.sent();
                        _a = 0, compFiles_2 = compFiles;
                        _b.label = 8;
                    case 8:
                        if (!(_a < compFiles_2.length)) return [3 /*break*/, 15];
                        file = compFiles_2[_a];
                        if (!file.isDirectory())
                            return [3 /*break*/, 14];
                        return [4 /*yield*/, EditableRegistry.loadAttributes(file, comp)];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, EditableRegistry.loadEnums(file, comp)];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, EditableRegistry.loadTags(file, comp)];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, EditableRegistry.loadExamples(file, comp)];
                    case 12:
                        _b.sent();
                        return [4 /*yield*/, EditableRegistry.loadFlows(file, comp)];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14:
                        _a++;
                        return [3 /*break*/, 8];
                    case 15: return [2 /*return*/, comp];
                }
            });
        });
    };
    EditableRegistry.loadTags = function (file, comp) {
        return __awaiter(this, void 0, void 0, function () {
            var defExists, ymlPath, indexExists, data, tagFolder, tagFiles, _i, tagFiles_1, tagFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(file.name === "tags")) return [3 /*break*/, 10];
                        defExists = fs_1.default.existsSync("".concat(comp.folderPath, "/tags/default"));
                        ymlPath = "".concat(comp.folderPath, "/tags/index.yaml");
                        indexExists = fs_1.default.existsSync(ymlPath);
                        data = "";
                        console.log("Yml exists: ".concat(indexExists, " def exists: ").concat(defExists));
                        if (!indexExists) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, fileUtils_1.loadYamlWithRefs)(ymlPath)];
                    case 1:
                        data = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, comp.add({ ID: "TAG_FOLDER" })];
                    case 3:
                        _a.sent();
                        tagFolder = comp.getTarget("TAG_FOLDER", "tags", comp);
                        return [4 /*yield*/, promises_1.default.readdir(tagFolder.folderPath, {
                                withFileTypes: true,
                            })];
                    case 4:
                        tagFiles = _a.sent();
                        if (!!defExists) return [3 /*break*/, 6];
                        if (!(data !== "")) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, yamlUtils_1.overrideYaml)(tagFolder.folderPath + "/default/index.yaml", js_yaml_1.default.dump(data))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i = 0, tagFiles_1 = tagFiles;
                        _a.label = 7;
                    case 7:
                        if (!(_i < tagFiles_1.length)) return [3 /*break*/, 10];
                        tagFile = tagFiles_1[_i];
                        if (!(tagFile.isDirectory() && tagFile.name !== "default")) return [3 /*break*/, 9];
                        return [4 /*yield*/, tagFolder.add({
                                ID: "TAG_FILE",
                                name: tagFile.name,
                            })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    EditableRegistry.loadFlows = function (file, comp) {
        return __awaiter(this, void 0, void 0, function () {
            var attr, attrFiles, _i, attrFiles_1, attrFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(file.name === "flows")) return [3 /*break*/, 6];
                        return [4 /*yield*/, comp.add({
                                ID: "FLOW_FOLDER",
                            })];
                    case 1:
                        _a.sent();
                        attr = comp.getTarget("FLOW_FOLDER", "flows", comp);
                        return [4 /*yield*/, promises_1.default.readdir(attr.folderPath, {
                                withFileTypes: true,
                            })];
                    case 2:
                        attrFiles = _a.sent();
                        _i = 0, attrFiles_1 = attrFiles;
                        _a.label = 3;
                    case 3:
                        if (!(_i < attrFiles_1.length)) return [3 /*break*/, 6];
                        attrFile = attrFiles_1[_i];
                        if (!attrFile.isDirectory()) return [3 /*break*/, 5];
                        return [4 /*yield*/, attr.add({
                                ID: "FLOW_FILE",
                                name: attrFile.name,
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EditableRegistry.loadEnums = function (file, comp) {
        return __awaiter(this, void 0, void 0, function () {
            var defExists, ymlPath, indexExists, data, enumFolder, enumFiles, _i, enumFiles_1, enumFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(file.name === "enum")) return [3 /*break*/, 10];
                        defExists = fs_1.default.existsSync("".concat(comp.folderPath, "/enum/default"));
                        ymlPath = "".concat(comp.folderPath, "/enum/index.yaml");
                        indexExists = fs_1.default.existsSync(ymlPath);
                        data = "";
                        console.log("Yml exists: ".concat(indexExists, " def exists: ").concat(defExists));
                        if (!indexExists) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, fileUtils_1.loadYamlWithRefs)(ymlPath)];
                    case 1:
                        data = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, comp.add({ ID: "ENUM_FOLDER" })];
                    case 3:
                        _a.sent();
                        enumFolder = comp.getTarget("ENUM_FOLDER", "enum", comp);
                        return [4 /*yield*/, promises_1.default.readdir(enumFolder.folderPath, {
                                withFileTypes: true,
                            })];
                    case 4:
                        enumFiles = _a.sent();
                        if (!!defExists) return [3 /*break*/, 6];
                        if (!(data !== "")) return [3 /*break*/, 6];
                        return [4 /*yield*/, (0, yamlUtils_1.overrideYaml)(enumFolder.folderPath + "/default/index.yaml", js_yaml_1.default.dump(data))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i = 0, enumFiles_1 = enumFiles;
                        _a.label = 7;
                    case 7:
                        if (!(_i < enumFiles_1.length)) return [3 /*break*/, 10];
                        enumFile = enumFiles_1[_i];
                        if (!(enumFile.isDirectory() && enumFile.name !== "default")) return [3 /*break*/, 9];
                        return [4 /*yield*/, enumFolder.add({
                                ID: "ENUM_FILE",
                                name: enumFile.name,
                            })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    EditableRegistry.loadAttributes = function (file, comp) {
        return __awaiter(this, void 0, void 0, function () {
            var attr, attrFiles, _i, attrFiles_2, attrFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(file.name === "attributes")) return [3 /*break*/, 6];
                        return [4 /*yield*/, comp.add({
                                ID: "ATTRIBUTE_FOLDER",
                            })];
                    case 1:
                        _a.sent();
                        attr = comp.getTarget("ATTRIBUTE_FOLDER", "attributes", comp);
                        return [4 /*yield*/, promises_1.default.readdir(attr.folderPath, {
                                withFileTypes: true,
                            })];
                    case 2:
                        attrFiles = _a.sent();
                        _i = 0, attrFiles_2 = attrFiles;
                        _a.label = 3;
                    case 3:
                        if (!(_i < attrFiles_2.length)) return [3 /*break*/, 6];
                        attrFile = attrFiles_2[_i];
                        if (!attrFile.isDirectory()) return [3 /*break*/, 5];
                        return [4 /*yield*/, attr.add({
                                ID: "ATTRIBUTE_FILE",
                                name: attrFile.name,
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EditableRegistry.loadExamples = function (file, comp) {
        return __awaiter(this, void 0, void 0, function () {
            var indexData, indexPath, _a, _b, exampleFolder, _c, _d, _e, _i, key, ref, folderName, folderPath, ymlName, e_1, exampleFiles, _f, exampleFiles_1, file_1, exampleDomainName, subIndexPath, secondaryPath, subYamlData, addedExample, subFiles, _g, subFiles_1, subFile, data, _h, _j, example;
            var _k;
            var _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        if (file.name !== "examples")
                            return [2 /*return*/];
                        indexData = {};
                        indexPath = "".concat(comp.folderPath, "/examples/index.yaml");
                        if (!fs_1.default.existsSync(indexPath)) return [3 /*break*/, 2];
                        _b = (_a = js_yaml_1.default).load;
                        return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(indexPath)];
                    case 1:
                        indexData = _b.apply(_a, [_o.sent()]);
                        indexData = indexData || {};
                        _o.label = 2;
                    case 2: return [4 /*yield*/, comp.add({ ID: "EXAMPLE_FOLDER" })];
                    case 3:
                        _o.sent();
                        exampleFolder = comp.getTarget("EXAMPLE_FOLDER", "examples", comp);
                        _c = indexData;
                        _d = [];
                        for (_e in _c)
                            _d.push(_e);
                        _i = 0;
                        _o.label = 4;
                    case 4:
                        if (!(_i < _d.length)) return [3 /*break*/, 10];
                        _e = _d[_i];
                        if (!(_e in _c)) return [3 /*break*/, 9];
                        key = _e;
                        ref = indexData[key].example_set.$ref;
                        folderName = ref.split("/")[1];
                        folderPath = "".concat(exampleFolder.folderPath, "/").concat(folderName);
                        _o.label = 5;
                    case 5:
                        _o.trys.push([5, 8, , 9]);
                        if (!fs_1.default.existsSync(folderPath)) return [3 /*break*/, 7];
                        return [4 /*yield*/, (0, fileUtils_1.renameFolder)(folderPath, key)];
                    case 6:
                        _o.sent();
                        ymlName = ref.split("/")[2];
                        indexData[key].example_set.$ref = "./".concat(key, "/").concat(ymlName);
                        _o.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_1 = _o.sent();
                        console.log("skipping rename", e_1);
                        return [3 /*break*/, 9];
                    case 9:
                        _i++;
                        return [3 /*break*/, 4];
                    case 10: return [4 /*yield*/, promises_1.default.readdir(exampleFolder.folderPath, {
                            withFileTypes: true,
                        })];
                    case 11:
                        exampleFiles = _o.sent();
                        _f = 0, exampleFiles_1 = exampleFiles;
                        _o.label = 12;
                    case 12:
                        if (!(_f < exampleFiles_1.length)) return [3 /*break*/, 25];
                        file_1 = exampleFiles_1[_f];
                        if (!file_1.isDirectory())
                            return [3 /*break*/, 24];
                        exampleDomainName = file_1.name;
                        subIndexPath = "".concat(exampleFolder.folderPath, "/").concat(exampleDomainName, "/index.yaml");
                        secondaryPath = "";
                        if (!(indexData &&
                            indexData[exampleDomainName] &&
                            indexData[exampleDomainName].example_set.$ref)) return [3 /*break*/, 14];
                        secondaryPath = path_1.default.resolve(file_1.path || exampleFolder.folderPath, // handle undefined path as binary mode doesn't provide path variable
                        indexData[exampleDomainName].example_set.$ref);
                        console.log("secondary path", secondaryPath);
                        if (!fs_1.default.existsSync(secondaryPath)) return [3 /*break*/, 14];
                        return [4 /*yield*/, promises_1.default.rename(secondaryPath, subIndexPath)];
                    case 13:
                        _o.sent();
                        _o.label = 14;
                    case 14:
                        subYamlData = {};
                        if (!fs_1.default.existsSync(subIndexPath)) return [3 /*break*/, 16];
                        return [4 /*yield*/, (0, fileUtils_1.loadYamlWithRefs)(subIndexPath)];
                    case 15:
                        subYamlData = (_o.sent());
                        subYamlData = subYamlData || {};
                        _o.label = 16;
                    case 16: return [4 /*yield*/, exampleFolder.add({
                            ID: "EXAMPLE_DOMAIN_FOLDER",
                            name: exampleDomainName,
                            description: ((_l = indexData[exampleDomainName]) === null || _l === void 0 ? void 0 : _l.description) || "TBD",
                            summary: ((_m = indexData[exampleDomainName]) === null || _m === void 0 ? void 0 : _m.summary) || exampleDomainName,
                        })];
                    case 17:
                        _o.sent();
                        addedExample = exampleFolder.getTarget("EXAMPLE_DOMAIN_FOLDER", exampleDomainName, exampleFolder);
                        return [4 /*yield*/, promises_1.default.readdir(addedExample.folderPath, {
                                withFileTypes: true,
                            })];
                    case 18:
                        subFiles = _o.sent();
                        _g = 0, subFiles_1 = subFiles;
                        _o.label = 19;
                    case 19:
                        if (!(_g < subFiles_1.length)) return [3 /*break*/, 24];
                        subFile = subFiles_1[_g];
                        if (!subFile.isDirectory())
                            return [3 /*break*/, 23];
                        if (!subYamlData.hasOwnProperty(subFile.name)) return [3 /*break*/, 23];
                        data = subYamlData[subFile.name];
                        ForceUniqueSummary(data);
                        _h = 0, _j = data.examples;
                        _o.label = 20;
                    case 20:
                        if (!(_h < _j.length)) return [3 /*break*/, 23];
                        example = _j[_h];
                        return [4 /*yield*/, addedExample.add({
                                name: subFile.name,
                                ID: "JSON",
                                examples: (_k = {},
                                    _k[subFile.name] = [
                                        {
                                            ID: "JSON",
                                            name: subFile.name,
                                            exampleName: " ",
                                            summary: example.summary,
                                            description: example.description,
                                            exampleValue: example.value,
                                        },
                                    ],
                                    _k),
                            })];
                    case 21:
                        _o.sent();
                        _o.label = 22;
                    case 22:
                        _h++;
                        return [3 /*break*/, 20];
                    case 23:
                        _g++;
                        return [3 /*break*/, 19];
                    case 24:
                        _f++;
                        return [3 /*break*/, 12];
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    EditableRegistry.registry = {};
    return EditableRegistry;
}());
exports.EditableRegistry = EditableRegistry;
function ForceUniqueSummary(data) {
    var summaryCounts = data.examples
        .map(function (s) { return s.summary.trim(); })
        .reduce(function (acc, summary) {
        acc[summary] = (acc[summary] || 0) + 1;
        return acc;
    }, {});
    var summaryTracker = {};
    data.examples.forEach(function (example) {
        var summary = example.summary;
        if (summaryCounts[summary] > 1) {
            if (!summaryTracker[summary]) {
                summaryTracker[summary] = 0;
            }
            summaryTracker[summary]++;
            example.summary = "".concat(summary, "-").concat(summaryTracker[summary]);
        }
    });
}
// initRegistry();
// EditableRegistry.loadComponent(
//   "../../../ONDC-NTS-Specifications/api/components",
//   "components"
// );
// renameFolder(
//   path.resolve(
//     __dirname,
//     "../../../ONDC-NTS-Specifications/api/components/examples/personal-loan"
//   ),
//   "personal-loans"
// );
