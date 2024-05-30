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
exports.ExampleFolderType = void 0;
var folderTypeEditable_1 = require("../../folderTypeEditable");
var yamlUtils_1 = require("../../yamlUtils");
var fileUtils_1 = require("../../fileUtils");
var js_yaml_1 = __importDefault(require("js-yaml"));
var ExampleDomainFolderType_1 = require("./ExampleDomainFolderType");
var promises_1 = require("fs/promises");
var ExampleFolderType = /** @class */ (function (_super) {
    __extends(ExampleFolderType, _super);
    function ExampleFolderType(path, name) {
        var _this = _super.call(this, path, name) || this;
        _this.allowedList = [ExampleDomainFolderType_1.ExampleDomainFolderType.REGISTER_ID];
        return _this;
    }
    ExampleFolderType.prototype.getRegisterID = function () {
        return ExampleFolderType.REGISTER_ID;
    };
    ExampleFolderType.prototype.add = function (newEditable) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.allowedList.includes(newEditable.ID)) {
                            throw new Error("Enums only allow ".concat(this.allowedList, " as children."));
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, _super.prototype.add.call(this, { ID: newEditable.ID, name: newEditable.name })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefExamples)({
                                section: newEditable.name,
                                summary: newEditable.summary,
                                description: newEditable.description,
                                filePath: this.yamlPathLong,
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        throw new Error("Error adding example: ".concat(e_1));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //q:
    ExampleFolderType.prototype.getData = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var string, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(query.type === "reference")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getReferenceData()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(this.yamlPathLong)];
                    case 3:
                        string = _a.sent();
                        data = js_yaml_1.default.load(string);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ExampleFolderType.prototype.getReferenceData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refs, _i, _a, child, data, _b, _c, _d, _e, key, _f, _g, ex, val, val, _h, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        refs = [];
                        console.log("getting reference data");
                        _i = 0, _a = this.childrenEditables;
                        _k.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 12];
                        child = _a[_i];
                        return [4 /*yield*/, child.getData({})];
                    case 2:
                        data = _k.sent();
                        _b = data;
                        _c = [];
                        for (_d in _b)
                            _c.push(_d);
                        _e = 0;
                        _k.label = 3;
                    case 3:
                        if (!(_e < _c.length)) return [3 /*break*/, 11];
                        _d = _c[_e];
                        if (!(_d in _b)) return [3 /*break*/, 10];
                        key = _d;
                        _f = 0, _g = data[key];
                        _k.label = 4;
                    case 4:
                        if (!(_f < _g.length)) return [3 /*break*/, 10];
                        ex = _g[_f];
                        if (!ex.formName) return [3 /*break*/, 6];
                        val = {};
                        return [4 /*yield*/, (0, promises_1.readFile)(this.folderPath + "/".concat(child.name, "/").concat(key, "/").concat(ex.formName, ".html"), "utf8")];
                    case 5:
                        val = _k.sent();
                        val = val ? val : {};
                        refs.push({
                            $ref: "../../examples/".concat(child.name, "/").concat(key, "/").concat(ex.formName, ".html"),
                            value: val,
                        });
                        return [3 /*break*/, 9];
                    case 6:
                        val = {};
                        _j = (_h = js_yaml_1.default).load;
                        return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(this.folderPath + "/".concat(child.name, "/").concat(key, "/").concat(ex.apiName, ".yaml"))];
                    case 7: return [4 /*yield*/, _j.apply(_h, [_k.sent()])];
                    case 8:
                        val = _k.sent();
                        val = val ? val : {};
                        refs.push({
                            $ref: "../../examples/".concat(child.name, "/").concat(key, "/").concat(ex.apiName, ".yaml"),
                            value: val,
                        });
                        _k.label = 9;
                    case 9:
                        _f++;
                        return [3 /*break*/, 4];
                    case 10:
                        _e++;
                        return [3 /*break*/, 3];
                    case 11:
                        _i++;
                        return [3 /*break*/, 1];
                    case 12: return [2 /*return*/, { refs: refs }];
                }
            });
        });
    };
    ExampleFolderType.prototype.remove = function (deleteTarget) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.remove.call(this, deleteTarget)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefExamples)({
                                section: deleteTarget.folderName,
                                summary: "",
                                description: "",
                                filePath: this.yamlPathLong,
                            }, true)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExampleFolderType.prototype.update = function (update) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.update.call(this, update)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefExamples)({
                                section: update.oldName,
                                summary: "",
                                description: "",
                                filePath: this.yamlPathLong,
                            }, true)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefExamples)({
                                section: update.newName,
                                summary: update.summary,
                                description: update.description,
                                filePath: this.yamlPathLong,
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExampleFolderType.REGISTER_ID = "EXAMPLE_FOLDER";
    return ExampleFolderType;
}(folderTypeEditable_1.folderTypeEditable));
exports.ExampleFolderType = ExampleFolderType;
