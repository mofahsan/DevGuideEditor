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
exports.folderTypeEditable = void 0;
var Editable_1 = require("./Editable");
var EditableRegistry_1 = require("./EditableRegistry");
var FileTypeEditable_1 = require("./FileTypeEditable");
var folderTypeEditable = /** @class */ (function (_super) {
    __extends(folderTypeEditable, _super);
    function folderTypeEditable(path, name) {
        var _this = _super.call(this, path, name) || this;
        _this.childrenEditables = [];
        return _this;
    }
    /**
     * Adds a new editable to the childrenEditables array.
     * @param {Object} newEditable - The new editable object to add.
     * @param {string} newEditable.ID - The unique identifier for the editable.
     * @param {string} newEditable.name - The name of the editable.
     */
    folderTypeEditable.prototype.add = function (newEditable) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log(this.childrenEditables.map(function (s) { return s.name; }));
                        if (this.childrenEditables.map(function (s) { return s.name; }).includes(newEditable.name)) {
                            throw new Error("Editable Already Exists!");
                        }
                        _b = (_a = this.childrenEditables).push;
                        return [4 /*yield*/, EditableRegistry_1.EditableRegistry.create(newEditable.ID, this.longPath + "/".concat(newEditable.name), newEditable.name)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Adds a new editable to the childrenEditables array.
     * @param {Object} deleteTarget - The new editable object to delete.
     */
    folderTypeEditable.prototype.remove = function (deleteTarget) {
        return __awaiter(this, void 0, void 0, function () {
            var target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DELETING", deleteTarget);
                        target = this.childrenEditables.find(function (s) { return s.name === deleteTarget.folderName; });
                        this.childrenEditables = this.childrenEditables.filter(function (s) { return s !== target; });
                        // console.log(target);
                        return [4 /*yield*/, target.destroy()];
                    case 1:
                        // console.log(target);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    folderTypeEditable.prototype.update = function (update) {
        return __awaiter(this, void 0, void 0, function () {
            var target, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("PATCHING", update);
                        target = this.childrenEditables.find(function (s) { return s.name === update.oldName; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, target.renameFolder(update.newName)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw new Error(e_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    folderTypeEditable.prototype.findParent = function (id, name, first) {
        var searchChildEditable = function (editable) {
            if (editable instanceof FileTypeEditable_1.FileTypeEditable) {
                return null;
            }
            if (!(editable instanceof folderTypeEditable)) {
                return;
            }
            for (var _i = 0, _a = editable.childrenEditables; _i < _a.length; _i++) {
                var childEditable = _a[_i];
                if (childEditable.getRegisterID() === id &&
                    childEditable.name === name) {
                    return editable;
                }
                var target_1 = searchChildEditable(childEditable);
                if (target_1) {
                    return target_1;
                }
            }
            return null;
        };
        if (first.getRegisterID() === id && first.name === name) {
            return "-1";
        }
        var target = searchChildEditable(first);
        return target;
    };
    folderTypeEditable.prototype.getTarget = function (id, name, first) {
        var searchChildEditable = function (editable) {
            // console.log(editable.getRegisterID(), editable.name);
            if (editable.getRegisterID() === id && editable.name === name) {
                return editable;
            }
            if (editable instanceof FileTypeEditable_1.FileTypeEditable ||
                !(editable instanceof folderTypeEditable)) {
                return null;
            }
            for (var _i = 0, _a = editable.childrenEditables; _i < _a.length; _i++) {
                var childEditable = _a[_i];
                console.log("ITERATING: ", childEditable.getRegisterID(), childEditable.name);
                var target_2 = searchChildEditable(childEditable);
                if (target_2) {
                    console.log("FOUND!");
                    return target_2;
                }
            }
            console.log("ITERATION FAILED!");
            return null;
        };
        var target = searchChildEditable(first);
        if (!target) {
            console.log("NOT FOUND!");
            throw new Error("Editable Not Found!");
        }
        return target;
    };
    return folderTypeEditable;
}(Editable_1.Editable));
exports.folderTypeEditable = folderTypeEditable;
