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
exports.AttributesFolderTypeEditable = void 0;
var AttributeRow_1 = require("./AttributeRow");
var folderTypeEditable_1 = require("../../folderTypeEditable");
var yamlUtils_1 = require("../../yamlUtils");
var AttributesFolderTypeEditable = /** @class */ (function (_super) {
    __extends(AttributesFolderTypeEditable, _super);
    function AttributesFolderTypeEditable(path, id) {
        var _this = this;
        console.log(path);
        _this = _super.call(this, path, id) || this;
        _this.allowedList = [AttributeRow_1.AttributeFile.REGISTER_ID];
        return _this;
    }
    AttributesFolderTypeEditable.prototype.getRegisterID = function () {
        return AttributesFolderTypeEditable.REGISTER_ID;
    };
    AttributesFolderTypeEditable.prototype.add = function (new_editable) {
        return __awaiter(this, void 0, void 0, function () {
            var addedChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.allowedList.includes(new_editable.ID)) {
                            console.log(new_editable);
                            throw new Error("Attributes only allow ".concat(AttributeRow_1.AttributeFile.REGISTER_ID, " as children."));
                        }
                        return [4 /*yield*/, _super.prototype.add.call(this, new_editable)];
                    case 1:
                        _a.sent();
                        addedChild = this.childrenEditables.find(function (s) { return s.name === new_editable.name; });
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefAttr)(this.yamlPathLong, addedChild.name)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AttributesFolderTypeEditable.prototype.getData = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var data_1, _i, _a, editable, child_data, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.childrenEditables.length === 0)
                            return [2 /*return*/, []];
                        if (!(query.type === "pathSet")) return [3 /*break*/, 5];
                        data_1 = new Set();
                        _i = 0, _a = this.childrenEditables;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        editable = _a[_i];
                        return [4 /*yield*/, editable.getData(query)];
                    case 2:
                        child_data = _b.sent();
                        for (key in child_data) {
                            child_data[key].forEach(function (element) {
                                data_1.add(element.path);
                            });
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, Array.from(data_1)];
                    case 5: return [2 /*return*/, this.childrenEditables.map(function (editable) { return editable.name; })];
                }
            });
        });
    };
    AttributesFolderTypeEditable.prototype.remove = function (deleteTarget) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.remove.call(this, deleteTarget)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefAttr)(this.yamlPathLong, deleteTarget.folderName, true)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AttributesFolderTypeEditable.prototype.update = function (update) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.update.call(this, update)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefAttr)(this.yamlPathLong, update.oldName, true)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefAttr)(this.yamlPathLong, update.newName)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AttributesFolderTypeEditable.REGISTER_ID = "ATTRIBUTE_FOLDER";
    return AttributesFolderTypeEditable;
}(folderTypeEditable_1.folderTypeEditable));
exports.AttributesFolderTypeEditable = AttributesFolderTypeEditable;