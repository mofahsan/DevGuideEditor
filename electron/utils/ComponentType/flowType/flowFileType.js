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
exports.FlowFileType = void 0;
var FileTypeEditable_1 = require("../../FileTypeEditable");
var fileUtils_1 = require("../../fileUtils");
var yamlRefConvert_1 = require("../../extraUtils/yamlRefConvert");
var yamlUtils_1 = require("../../yamlUtils");
var flowUtils_1 = require("./flowUtils");
var FlowFileType = /** @class */ (function (_super) {
    __extends(FlowFileType, _super);
    function FlowFileType(path, name) {
        return _super.call(this, path, name) || this;
    }
    FlowFileType.prototype.getRegisterID = function () {
        return FlowFileType.REGISTER_ID;
    };
    FlowFileType.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = flowUtils_1.flowFromApi;
                        return [4 /*yield*/, (0, fileUtils_1.readYamlFile)(this.yamlPathLong)];
                    case 1:
                        response = _a.apply(void 0, [_b.sent()]);
                        console.log("ahsan");
                        return [2 /*return*/, response];
                }
            });
        });
    };
    FlowFileType.prototype.add = function (dataToAdd) {
        return __awaiter(this, void 0, void 0, function () {
            var data, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        data = data == undefined ? {} : data;
                        for (key in dataToAdd) {
                            data[key] = dataToAdd[key];
                        }
                        // const newData = mergeFlowObjectRecords(data, dataToAdd);
                        // const yml = flowToNested(data);
                        return [4 /*yield*/, (0, yamlUtils_1.overrideYaml)(this.yamlPathLong, (0, yamlRefConvert_1.convertToYamlWithRefs)(data))];
                    case 2:
                        // const newData = mergeFlowObjectRecords(data, dataToAdd);
                        // const yml = flowToNested(data);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FlowFileType.prototype.remove = function (dataToDel) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _loop_1, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        _loop_1 = function (key) {
                            var val = dataToDel[key];
                            if (data.hasOwnProperty(key)) {
                                if (typeof val === "string") {
                                    delete data[key];
                                }
                                else if (Array.isArray(val)) {
                                    data[key] = data[key].filter(function (d, index) {
                                        // return !val.some((del) => del.path === d.path);
                                        return index !== +val[0];
                                    });
                                }
                            }
                        };
                        for (key in dataToDel) {
                            _loop_1(key);
                        }
                        // const yml = flowToNested(data);
                        return [4 /*yield*/, (0, yamlUtils_1.overrideYaml)(this.yamlPathLong, (0, yamlRefConvert_1.convertToYamlWithRefs)(data))];
                    case 2:
                        // const yml = flowToNested(data);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FlowFileType.prototype.update = function (dataToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var data, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        for (key in dataToUpdate) {
                            data[key] = dataToUpdate[key];
                        }
                        return [4 /*yield*/, (0, yamlUtils_1.overrideYaml)(this.yamlPathLong, (0, yamlRefConvert_1.convertToYamlWithRefs)(data))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FlowFileType.prototype.setMissingReferences = function (dataToAdd) {
        for (var key in dataToAdd) {
            for (var _i = 0, _a = dataToAdd[key]; _i < _a.length; _i++) {
                var data = _a[_i];
                data.Flow.forEach(function (e) {
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
    FlowFileType.REGISTER_ID = "FLOW_FILE";
    return FlowFileType;
}(FileTypeEditable_1.FileTypeEditable));
exports.FlowFileType = FlowFileType;
