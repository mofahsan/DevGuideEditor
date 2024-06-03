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
exports.ComponentsType = void 0;
var fileUtils_1 = require("../fileUtils");
var folderTypeEditable_1 = require("../folderTypeEditable");
var yamlUtils_1 = require("../yamlUtils");
var AttributesFolderTypeEditable_1 = require("./AttributeType/AttributesFolderTypeEditable");
var enumFolderType_1 = require("./enumType/enumFolderType");
var tagsFolderType_1 = require("./tagType/tagsFolderType");
var flowFolderType_1 = require("./flowType/flowFolderType");
var exampleFolderType_1 = require("./examplesType/exampleFolderType");
var ComponentsType = /** @class */ (function (_super) {
    __extends(ComponentsType, _super);
    function ComponentsType(path, id) {
        var _this = _super.call(this, path, id) || this;
        _this.allowedList = [
            AttributesFolderTypeEditable_1.AttributesFolderTypeEditable.REGISTER_ID,
            enumFolderType_1.EnumFolderType.REGISTER_ID,
            tagsFolderType_1.TagsFolderType.REGISTER_ID,
            flowFolderType_1.FlowFolderType.REGISTER_ID,
            exampleFolderType_1.ExampleFolderType.REGISTER_ID,
        ];
        return _this;
    }
    ComponentsType.prototype.getRegisterID = function () {
        return ComponentsType.REGISTER_ID;
    };
    ComponentsType.prototype.add = function (new_editable) {
        return __awaiter(this, void 0, void 0, function () {
            var completeData, addedChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.allowedList.includes(new_editable.ID)) {
                            throw new Error("".concat(new_editable.ID, " TYPE IS NOT ALLOWED IN ") + this.getRegisterID());
                        }
                        completeData = {
                            ID: new_editable.ID,
                            name: this.GetForcedName(new_editable.ID),
                        };
                        return [4 /*yield*/, _super.prototype.add.call(this, completeData)];
                    case 1:
                        _a.sent();
                        addedChild = this.childrenEditables.find(function (s) { return s.name === completeData.name; });
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefComponents)(this.yamlPathLong, addedChild.name)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentsType.prototype.getData = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.childrenEditables.length === 0)
                    return [2 /*return*/, []];
                data = this.childrenEditables.map(function (editable) {
                    return {
                        name: editable.name,
                        registerID: editable.getRegisterID(),
                        path: "".concat(_this.name, "/").concat(editable.name),
                    };
                });
                console.log(data);
                return [2 /*return*/, data];
            });
        });
    };
    ComponentsType.prototype.remove = function (deleteTarget) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.remove.call(this, deleteTarget)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, yamlUtils_1.updateYamlRefComponents)(this.yamlPathLong, deleteTarget.folderName, true)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentsType.prototype.saveData = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fileUtils_1.copyDir)(this.longPath, path)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ComponentsType.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    ComponentsType.prototype.GetForcedName = function (ID) {
        if (ID === AttributesFolderTypeEditable_1.AttributesFolderTypeEditable.REGISTER_ID) {
            return "attributes";
        }
        if (ID === enumFolderType_1.EnumFolderType.REGISTER_ID) {
            return "enum";
        }
        if (ID === tagsFolderType_1.TagsFolderType.REGISTER_ID) {
            return "tags";
        }
        if (ID === flowFolderType_1.FlowFolderType.REGISTER_ID) {
            return "flows";
        }
        if (ID === exampleFolderType_1.ExampleFolderType.REGISTER_ID) {
            return "examples";
        }
        return "UNKNOWN";
    };
    ComponentsType.prototype.update = function (Editable) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("".concat(this.getRegisterID(), " does not support Patch!"));
            });
        });
    };
    ComponentsType.REGISTER_ID = "COMPONENTS-FOLDER";
    return ComponentsType;
}(folderTypeEditable_1.folderTypeEditable));
exports.ComponentsType = ComponentsType;
module.exports = { ComponentsType: ComponentsType };