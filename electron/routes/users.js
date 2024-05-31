"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express_session_1 = __importDefault(require("express-session"));
var RegisterList_1 = require("../utils/RegisterList");
var EditableRegistry_1 = require("../utils/EditableRegistry");
var folderTypeEditable_1 = require("../utils/folderTypeEditable");
var FileTypeEditable_1 = require("../utils/FileTypeEditable");
var fileUtils_1 = require("../utils/fileUtils");
var histroyUtils_1 = require("../utils/histroyUtils");
var build_1 = require("../utils/build/build");
var fileUtils_2 = require("../utils/fileUtils");
var electron_root_path_1 = require("electron-root-path");
var path_1 = __importDefault(require("path"));
var sessionInstances = {};
var currentSessionID = "";
var history = new histroyUtils_1.HistoryUtil(5);
var forkedCompPath = fileUtils_2.isBinary ? path_1.default.join(electron_root_path_1.rootPath, "../", "FORKED_REPO/api/components") : "../../../FORKED_REPO/api/components";
(0, RegisterList_1.initRegistry)();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, express_session_1.default)({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if you're using HTTPS
}));
exports.app.all("/guide/*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fullPath, pathSegments, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fullPath = req.params[0];
                pathSegments = fullPath.split("/");
                if (pathSegments.length < 1) {
                    console.log(pathSegments);
                    res.status(400).json({
                        error: "Invalid path",
                        errorMessage: "Invalid path",
                    });
                    return [2 /*return*/];
                }
                currentSessionID = pathSegments[0];
                if (!(!sessionInstances[currentSessionID] && req.method !== "DELETE")) return [3 /*break*/, 2];
                // const oldPath = `../../../ONDC-NTS-Specifications/api/${currentSessionID}`;
                _a = sessionInstances;
                _b = currentSessionID;
                return [4 /*yield*/, EditableRegistry_1.EditableRegistry.loadComponent(forkedCompPath, currentSessionID)];
            case 1:
                // const oldPath = `../../../ONDC-NTS-Specifications/api/${currentSessionID}`;
                _a[_b] = _c.sent();
                _c.label = 2;
            case 2:
                next();
                return [2 /*return*/];
        }
    });
}); });
var parent = undefined;
var target = undefined;
exports.app.all("/guide/*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fullPath, pathSegments, _loop_1, _i, _a, item, state_1;
    return __generator(this, function (_b) {
        fullPath = req.params[0];
        pathSegments = fullPath.split("/");
        target = sessionInstances[pathSegments[0]];
        _loop_1 = function (item) {
            if (target instanceof folderTypeEditable_1.folderTypeEditable) {
                // console.log("children", target.chilrenEditables);
                var sub = target.childrenEditables.find(function (child) { return child.name === item; });
                if (sub) {
                    parent = target;
                    target = sub;
                }
                else {
                    console.log("PATH DONT EXIST");
                    res.status(404).json({
                        error: "PATH DONT EXIST",
                        errorMessage: "could not find path",
                    });
                    return { value: void 0 };
                }
            }
            else if (target instanceof FileTypeEditable_1.FileTypeEditable) {
                console.log("PATH DONT EXIST", target);
                res.status(404).json({
                    error: "PATH DONT EXIST",
                    errorMessage: "could not find path",
                });
                return { value: void 0 };
            }
        };
        for (_i = 0, _a = pathSegments.slice(1); _i < _a.length; _i++) {
            item = _a[_i];
            state_1 = _loop_1(item);
            if (typeof state_1 === "object")
                return [2 /*return*/, state_1.value];
        }
        next();
        return [2 /*return*/];
    });
}); });
exports.app.get("/guide/*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, _a, _b, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                query = __assign({}, req.query);
                query = query ? query : {};
                _b = (_a = res.status(200)).send;
                return [4 /*yield*/, target.getData(query)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _c.sent();
                res.status(500).json({
                    error: "Internal Server Error",
                    errorMessage: e_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.app.post("/reload", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _i, key, _d, _e, e_2;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 5, , 6]);
                // delete sessionInstances[currentSessionID];
                // const oldPath = `../../../ONDC-NTS-Specifications/api/${currentSessionID}`;
                // sessionInstances[currentSessionID] = await EditableRegistry.loadComponent(
                //   oldPath,
                //   currentSessionID
                // );
                console.log(sessionInstances);
                _a = sessionInstances;
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _f.label = 1;
            case 1:
                if (!(_i < _b.length)) return [3 /*break*/, 4];
                _c = _b[_i];
                if (!(_c in _a)) return [3 /*break*/, 3];
                key = _c;
                _d = sessionInstances;
                _e = key;
                return [4 /*yield*/, EditableRegistry_1.EditableRegistry.loadComponent(forkedCompPath, "components")];
            case 2:
                _d[_e] = _f.sent();
                _f.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                res.status(200).send("DATA RELOADED");
                return [3 /*break*/, 6];
            case 5:
                e_2 = _f.sent();
                console.error(e_2);
                res.status(500).json({
                    error: "Internal Server Error",
                    errorMessage: e_2.message,
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.app.post("/guide/*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, history.addHistory(sessionInstances[currentSessionID])];
            case 1:
                _a.sent();
                return [4 /*yield*/, target.add(req.body)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(201).send("DATA ADDED")];
            case 3:
                e_3 = _a.sent();
                console.error(e_3);
                res.status(500).json({
                    error: "Internal Server Error",
                    errorMessage: e_3.message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.app.put("/guide/*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var source, targetName, comp, folderPath, _a, _b, e_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                // const query = { ...req.query };
                console.log("UNDOING");
                return [4 /*yield*/, history.undoLastAction()];
            case 1:
                source = _c.sent();
                targetName = req.params[0].split("/")[0];
                console.log(targetName);
                comp = sessionInstances[targetName];
                folderPath = comp.folderPath;
                return [4 /*yield*/, comp.destroy()];
            case 2:
                _c.sent();
                return [4 /*yield*/, (0, fileUtils_1.overwriteFolder)(source, folderPath)];
            case 3:
                _c.sent();
                return [4 /*yield*/, (0, fileUtils_1.deleteFolderSync)(source)];
            case 4:
                _c.sent();
                console.log("COPY DONE");
                //`../../../FORKED_REPO/api/${targetName}`
                _a = sessionInstances;
                _b = "components";
                return [4 /*yield*/, EditableRegistry_1.EditableRegistry.loadComponent(forkedCompPath, "components")];
            case 5:
                //`../../../FORKED_REPO/api/${targetName}`
                _a[_b] = _c.sent();
                res.status(200).send("DATA UNDONE");
                return [3 /*break*/, 7];
            case 6:
                e_4 = _c.sent();
                console.log("CAUGHT ERROR");
                console.error(e_4);
                res.status(500).json({
                    error: "Internal Server Error",
                    errorMessage: e_4.message,
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.app.patch("/guide/*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, history.addHistory(sessionInstances[currentSessionID])];
            case 1:
                _a.sent();
                console.log("updating");
                return [4 /*yield*/, target.update(req.body)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send("DATA UPDATED")];
            case 3:
                e_5 = _a.sent();
                console.error(e_5);
                res.status(500).json({
                    error: "Internal Server Error",
                    errorMessage: e_5.message,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.app.delete("/guide/*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, comp, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, history.addHistory(sessionInstances[currentSessionID])];
            case 1:
                _a.sent();
                console.log("query", req.query);
                if (!(Object.keys(req.query).length > 0)) return [3 /*break*/, 3];
                body = __assign({}, req.query);
                return [4 /*yield*/, target.remove(body)];
            case 2:
                _a.sent();
                res.status(200).send("DATA DELETED");
                return [2 /*return*/];
            case 3:
                comp = sessionInstances[req.params[0].split("/")[0]];
                if (!(comp === target)) return [3 /*break*/, 4];
                comp.destroy();
                delete sessionInstances[req.params[0].split("/")[0]];
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, parent.remove({ folderName: target.name })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                res.status(200).send("DATA DELETED");
                return [3 /*break*/, 8];
            case 7:
                e_6 = _a.sent();
                console.log(e_6);
                res.status(500).json({
                    error: "Internal Server Error",
                    errorMessage: e_6.message,
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.app.delete("/sessions", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var key;
    return __generator(this, function (_a) {
        try {
            for (key in sessionInstances) {
                delete sessionInstances[key];
            }
            res.status(200).send("SESSION DELETED");
        }
        catch (e) {
            res.status(500).json({
                error: "Internal Server Error",
                errorMessage: e.message,
            });
        }
        return [2 /*return*/];
    });
}); });
exports.app.post("/build", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, build_1.buildWrapper)("components")];
            case 1:
                _a.sent();
                res.send("build triggered");
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                res.status(500).json({
                    error: "Internal Server Error",
                    errorMessage: e_7.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
