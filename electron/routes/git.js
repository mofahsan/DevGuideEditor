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
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var gitUtils_1 = require("../gitUtils/gitUtils");
var path_1 = __importDefault(require("path"));
var axios_1 = __importDefault(require("axios"));
var fileUtils_1 = require("../utils/fileUtils");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
var forkRepoPath = "../../../../backend-editor/FORKED_REPO";
var forkedRepoPathBinary = "./FORKED_REPO";
var forkedRepoComputedPath = fileUtils_1.isBinary ? path_1.default.join(path_1.default.dirname(process.execPath), forkedRepoPathBinary) : forkRepoPath;
exports.app.post("/init", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var link, _a, username, repoUrl, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                link = "";
                _a = req.body, username = _a.username, repoUrl = _a.repoUrl, token = _a.token;
                if (!username || !repoUrl || !token) {
                    res.status(400).send("Missing required parameters");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, gitUtils_1.forkRepository)(token, repoUrl)];
            case 1:
                link = _b.sent();
                return [4 /*yield*/, (0, gitUtils_1.cloneRepo)(token, username, repoUrl)];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.log(err_1);
                res.status(500).send("Error initializing repository");
                return [2 /*return*/];
            case 4:
                res.status(200).send(link);
                return [2 /*return*/];
        }
    });
}); });
exports.app.get("/branches", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var branches, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, gitUtils_1.getBranches)(path_1.default.resolve(__dirname, forkedRepoComputedPath))];
            case 1:
                branches = _a.sent();
                res.status(200).send(branches);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).send("Error fetching branches");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.app.post("/changeBranch", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var branchName, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                branchName = req.body.branchName;
                if (!branchName) {
                    res.status(400).send("Missing required parameters");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, gitUtils_1.changeBranch)(path_1.default.resolve(__dirname, forkedRepoComputedPath), branchName)];
            case 2:
                _a.sent();
                return [4 /*yield*/, axios_1.default.post("http://localhost:1000/tree/reload")];
            case 3:
                _a.sent();
                res.status(200).send("Branch changed successfully");
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                res.status(500).send("Error changing branch");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.app.get("/status", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, gitUtils_1.getStatus)(path_1.default.resolve(__dirname, forkedRepoComputedPath))];
            case 1:
                status = _a.sent();
                res.status(200).send(JSON.stringify(status, null, 2));
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).send("Error fetching status");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.app.delete("/reset", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, gitUtils_1.resetCurrentBranch)(path_1.default.resolve(__dirname, forkedRepoComputedPath))];
            case 1:
                _a.sent();
                return [4 /*yield*/, axios_1.default.post("http://localhost:1000/tree/reload")];
            case 2:
                _a.sent();
                res.status(200).send("Reset successful");
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.status(500).send("Error resetting repository");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.app.post("/openPR", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, message, title, token, url, repoPath, extractedBranchName, _b, pr, err_6;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, message = _a.message, title = _a.title, token = _a.token, url = _a.url;
                if (!message || !title || !token || !url) {
                    res.status(400).send("Missing required parameters");
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                repoPath = path_1.default.resolve(__dirname, forkedRepoComputedPath);
                return [4 /*yield*/, (0, gitUtils_1.stashFetchCommitAndPushChanges)(repoPath, message)];
            case 2:
                _c.sent();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
            case 3:
                _c.sent();
                _b = gitUtils_1.extractBranchName;
                return [4 /*yield*/, (0, gitUtils_1.getBranches)(repoPath)];
            case 4:
                extractedBranchName = _b.apply(void 0, [(_c.sent()).currentBranch]);
                console.log("Branch name", extractedBranchName);
                return [4 /*yield*/, (0, gitUtils_1.raisePr)(token, url, repoPath, title, message, extractedBranchName)];
            case 5:
                pr = _c.sent();
                res.status(200).send(pr);
                return [3 /*break*/, 7];
            case 6:
                err_6 = _c.sent();
                console.log(err_6);
                res.status(500).send("Error creating PR");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
