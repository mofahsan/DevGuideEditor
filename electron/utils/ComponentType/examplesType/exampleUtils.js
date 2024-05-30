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
exports.GetFormData = exports.AddForm = exports.DeleteExampleFolder = exports.AddExampleJson = void 0;
var fs_1 = __importDefault(require("fs"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var promises_1 = __importDefault(require("fs/promises"));
function AddExampleJson(addExample) {
    return __awaiter(this, void 0, void 0, function () {
        var path, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    path = "".concat(addExample.folderPath, "/").concat(addExample.folderApi);
                    return [4 /*yield*/, promises_1.default.mkdir(path, { recursive: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, promises_1.default.writeFile("".concat(path, "/").concat(addExample.exampleName, ".yaml"), js_yaml_1.default.dump(addExample.exampleValue))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    throw new Error("Error adding example: ".concat(e_1));
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.AddExampleJson = AddExampleJson;
function DeleteExampleFolder(folderPath) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, promises_1.default.rm(folderPath, { recursive: true })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    throw new Error("Error deleting example: ".concat(e_2));
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.DeleteExampleFolder = DeleteExampleFolder;
function AddForm(formName, formHtml, folderPath) {
    return __awaiter(this, void 0, void 0, function () {
        var path, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    path = "".concat(folderPath, "/forms");
                    return [4 /*yield*/, promises_1.default.mkdir(path, { recursive: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, promises_1.default.writeFile("".concat(folderPath, "/forms/").concat(formName, ".html"), formHtml)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    throw new Error("Error adding form: ".concat(e_3));
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.AddForm = AddForm;
function GetFormData(folderPath) {
    return __awaiter(this, void 0, void 0, function () {
        var path, files, formFiles, formData, _i, formFiles_1, file, data, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    path = "".concat(folderPath, "/forms");
                    if (!fs_1.default.existsSync(path)) {
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, promises_1.default.readdir(path)];
                case 1:
                    files = _a.sent();
                    formFiles = files.filter(function (file) { return file.endsWith(".html"); });
                    if (formFiles.length === 0)
                        return [2 /*return*/, undefined];
                    formData = [];
                    _i = 0, formFiles_1 = formFiles;
                    _a.label = 2;
                case 2:
                    if (!(_i < formFiles_1.length)) return [3 /*break*/, 5];
                    file = formFiles_1[_i];
                    return [4 /*yield*/, promises_1.default.readFile("".concat(path, "/").concat(file), "utf8")];
                case 3:
                    data = _a.sent();
                    formData.push({
                        formName: file.replace(".html", ""),
                        formHtml: data,
                    });
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, formData];
                case 6:
                    e_4 = _a.sent();
                    throw new Error("Error getting form data: ".concat(e_4));
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.GetFormData = GetFormData;
