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
exports.overrideYaml = exports.updateYamlRefExampleDomain = exports.updateYamlRefExamples = exports.updateYamlRefTags = exports.updateYamlRefEnum = exports.updateYamlRefFlow = exports.updateYamlRefAttr = exports.updateYamlRefComponents = void 0;
var fs_1 = __importDefault(require("fs"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var fileUtils_1 = require("./fileUtils");
function updateYamlRefComponents(filePath_1, section_1) {
    return __awaiter(this, arguments, void 0, function (filePath, section, del) {
        if (del === void 0) { del = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(section === "enum" || section === "tags")) return [3 /*break*/, 2];
                    return [4 /*yield*/, updateYamlRef(filePath, section, { $ref: "./".concat(section, "/default/index.yaml") }, del)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, updateYamlRef(filePath, section, { $ref: "./".concat(section, "/index.yaml") }, del)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateYamlRefComponents = updateYamlRefComponents;
function updateYamlRefAttr(filePath_1, section_1) {
    return __awaiter(this, arguments, void 0, function (filePath, section, del) {
        if (del === void 0) { del = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateYamlRef(filePath, section, {
                        attribute_set: { $ref: "./".concat(section, "/index.yaml") },
                    }, del)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateYamlRefAttr = updateYamlRefAttr;
function updateYamlRefFlow(filePath_1, section_1) {
    return __awaiter(this, arguments, void 0, function (filePath, section, del) {
        if (del === void 0) { del = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateYamlRef(filePath, section, { $ref: "./".concat(section, "/index.yaml") }, del, "array")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateYamlRefFlow = updateYamlRefFlow;
function updateYamlRefEnum(filePath_1, section_1) {
    return __awaiter(this, arguments, void 0, function (filePath, section, del) {
        if (del === void 0) { del = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateYamlRef(filePath, section, {
                        enum_set: { $ref: "./".concat(section, "/index.yaml") },
                    }, del)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateYamlRefEnum = updateYamlRefEnum;
function updateYamlRefTags(filePath_1, section_1) {
    return __awaiter(this, arguments, void 0, function (filePath, section, del) {
        if (del === void 0) { del = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateYamlRef(filePath, section, {
                        tags: { $ref: "./".concat(section, "/index.yaml") },
                    }, del)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateYamlRefTags = updateYamlRefTags;
function updateYamlRefExamples(exampleRef_1) {
    return __awaiter(this, arguments, void 0, function (exampleRef, del) {
        if (del === void 0) { del = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateYamlRef(exampleRef.filePath, exampleRef.section, {
                        summary: exampleRef.summary,
                        description: exampleRef.description,
                        example_set: { $ref: "./".concat(exampleRef.section, "/index.yaml") },
                    }, del)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateYamlRefExamples = updateYamlRefExamples;
function updateYamlRefExampleDomain(filePath_1, section_1, summary_1, description_1, exampleName_1) {
    return __awaiter(this, arguments, void 0, function (filePath, section, summary, description, exampleName, del) {
        var refToAdd, data, _a, _b, existing, filtered;
        if (del === void 0) { del = false; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    refToAdd = [
                        {
                            summary: summary,
                            description: description,
                            value: { $ref: "./".concat(section, "/").concat(exampleName, ".yaml") },
                        },
                    ];
                    if (!fs_1.default.existsSync(filePath)) return [3 /*break*/, 2];
                    _b = (_a = js_yaml_1.default).load;
                    return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(filePath)];
                case 1:
                    data = _b.apply(_a, [_c.sent()]);
                    data = data || {};
                    if (data[section]) {
                        existing = data[section].examples;
                        if (existing) {
                            filtered = existing.filter(function (s) {
                                return refToAdd.every(function (r) { return r.value.$ref !== s.value.$ref; });
                            });
                            refToAdd = __spreadArray(__spreadArray([], filtered, true), refToAdd, true);
                        }
                    }
                    _c.label = 2;
                case 2: return [4 /*yield*/, updateYamlRef(filePath, section, {
                        examples: refToAdd,
                    }, del)];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateYamlRefExampleDomain = updateYamlRefExampleDomain;
function updateYamlRef(filePath_1, section_1, updateLike_1) {
    return __awaiter(this, arguments, void 0, function (filePath, section, updateLike, del, type) {
        var stats, fileContents, data, newYaml, error_1;
        var _a;
        if (del === void 0) { del = false; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fs_1.default.promises.stat(filePath)];
                case 1:
                    stats = _b.sent();
                    if (!stats.isFile()) {
                        throw new Error("The specified path (".concat(filePath, ") is not a file."));
                    }
                    return [4 /*yield*/, fs_1.default.promises.readFile(filePath, "utf8")];
                case 2:
                    fileContents = _b.sent();
                    data = (_a = js_yaml_1.default.load(fileContents)) !== null && _a !== void 0 ? _a : {};
                    if (type == "array") {
                        if (del) {
                            data = updateLike;
                        }
                        else {
                            data = !data.length ? [] : data;
                            data.push(updateLike);
                        }
                    }
                    else {
                        if (del) {
                            delete data[section];
                        }
                        else {
                            data[section] = updateLike;
                        }
                    }
                    newYaml = js_yaml_1.default.dump(data);
                    return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, newYaml, "utf8")];
                case 3:
                    _b.sent();
                    console.log("".concat(section, " has been updated with new $ref successfully."));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.error("Error updating the YAML file:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function overrideYaml(filePath, yamlData) {
    return __awaiter(this, void 0, void 0, function () {
        var stats, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fs_1.default.promises.stat(filePath)];
                case 1:
                    stats = _a.sent();
                    if (!stats.isFile()) {
                        throw new Error("The specified path (".concat(filePath, ") is not a file."));
                    }
                    // const newYaml = yaml.dump(data);
                    return [4 /*yield*/, fs_1.default.promises.writeFile(filePath, yamlData, "utf8")];
                case 2:
                    // const newYaml = yaml.dump(data);
                    _a.sent();
                    console.log("".concat(filePath, " has been updated successfully."));
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error updating the YAML file:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.overrideYaml = overrideYaml;
// (async () => {
//   updateYamlRefComponents(
//     path.join(__dirname, "../../ONDC-NTS-Specifications/api/cp0/index.yaml"),
//     "new_section",
//     true
//   );
//   // updateYamlRefAttr('./index.yaml', 'new_section');
// })();
