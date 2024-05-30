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
exports.CreateSave = exports.HistoryUtil = void 0;
var fileUtils_1 = require("./fileUtils");
var path_1 = __importDefault(require("path"));
var promises_1 = __importDefault(require("fs/promises"));
var fileUtils_2 = require("./fileUtils");
var HistoryUtil = /** @class */ (function () {
    function HistoryUtil(maxHistory) {
        this.history = [];
        this.maxHistory = maxHistory;
        var historyPath = fileUtils_2.isBinary ? path_1.default.join(path_1.default.dirname(process.execPath), "./history") : path_1.default.resolve(__dirname, "../../history");
        this.historyPath = historyPath;
        this.initializeHistoryFolder();
    }
    HistoryUtil.prototype.initializeHistoryFolder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, fileUtils_1.deleteFolderSync)(this.historyPath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, promises_1.default.mkdir(this.historyPath, { recursive: true })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Failed to create history directory:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HistoryUtil.prototype.addHistory = function (components) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, directoryName, directoryPath, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.history.length >= this.maxHistory)) return [3 /*break*/, 2];
                        // Optionally, remove the oldest directory
                        return [4 /*yield*/, this.removeOldestHistory()];
                    case 1:
                        // Optionally, remove the oldest directory
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        timestamp = new Date().toISOString().replace(/[:.]/g, "-");
                        directoryName = "history-".concat(timestamp);
                        directoryPath = path_1.default.join(this.historyPath, directoryName);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, (0, fileUtils_1.copyDir)(components.folderPath, directoryPath)];
                    case 4:
                        _a.sent();
                        this.history.push(directoryPath);
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error("Failed to save history:", error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HistoryUtil.prototype.removeOldestHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldestHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.history.length === 0)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        oldestHistory = this.history.shift();
                        return [4 /*yield*/, promises_1.default.rm(oldestHistory, { recursive: true })];
                    case 2:
                        _a.sent();
                        console.log("Removed oldest history: ".concat(oldestHistory));
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Failed to remove oldest history:", error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HistoryUtil.prototype.undoLastAction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastHistory;
            return __generator(this, function (_a) {
                if (this.history.length === 0) {
                    console.log("No history to undo");
                    throw new Error("No history to undo");
                }
                try {
                    lastHistory = this.history.pop();
                    return [2 /*return*/, lastHistory];
                }
                catch (error) {
                    console.error("Failed to get latest history:", error);
                }
                return [2 /*return*/];
            });
        });
    };
    return HistoryUtil;
}());
exports.HistoryUtil = HistoryUtil;
function CreateSave(components) {
    return __awaiter(this, void 0, void 0, function () {
        var histroyPath;
        return __generator(this, function (_a) {
            console.log("Creating Save");
            histroyPath = path_1.default.resolve(__dirname, "../../history");
            return [2 /*return*/];
        });
    });
}
exports.CreateSave = CreateSave;
