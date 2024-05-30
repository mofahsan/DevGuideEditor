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
var express_session_1 = __importDefault(require("express-session"));
var RegisterList_1 = require("../utils/RegisterList");
var EditableRegistry_1 = require("../utils/EditableRegistry");
var sessionInstances = {};
(0, RegisterList_1.initRegistry)();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, express_session_1.default)({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if you're using HTTPS
}));
function checkQueryParams(req, res, next) {
    var _a = req.query, editableID = _a.editableID, editableName = _a.editableName, sessionID = _a.sessionID;
    // Check if both query parameters are present
    if (!editableID || !editableName || !sessionID) {
        // If any parameter is missing, send an error response
        console.log("Missing required query parameters");
        res.status(400).json({
            error: "Missing required query parameters. Please include all editableID, editableName,sessionID.",
            errorMessage: "Missing required query parameters. Please include all editableID, editableName,sessionID.",
        });
        return; // Prevent further execution
    }
    req.editableID = editableID;
    req.editableName = editableName;
    req.sessionID = sessionID;
    next();
}
exports.app.use(checkQueryParams);
exports.app.use(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!!sessionInstances[req.sessionID]) return [3 /*break*/, 2];
                _a = sessionInstances;
                _b = req.sessionID;
                return [4 /*yield*/, EditableRegistry_1.EditableRegistry.loadComponent("../../ONDC-NTS-Specifications/api/cp0", "cp0")];
            case 1:
                _a[_b] = _c.sent();
                _c.label = 2;
            case 2:
                next();
                return [2 /*return*/];
        }
    });
}); });
exports.app.use(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var comp, target, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                comp = sessionInstances[req.sessionID];
                target = null;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, comp.getTarget(req.editableID, req.editableName, comp)];
            case 2:
                target = _b.sent();
                // console.log("target:", target);
                req.target = target;
                next();
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                res.status(404).send("Editable Not Found!");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.app.get("/guide", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, req.target.getData()];
            case 1:
                data = _a.sent();
                res.status(200).send(data);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(404).send("Data Not Found!");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.app.post("/guide", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, req.target.add(req.body)];
            case 1:
                _a.sent();
                res.status(200).send("Data Added!");
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                res.status(400).send("Data Not Added!");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.app.put("/guide", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.target.update(req.body)];
            case 1:
                _a.sent();
                res.status(200).send("Data Updated!");
                return [2 /*return*/];
        }
    });
}); });
exports.app.delete("/guide", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comp, parent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comp = sessionInstances[req.sessionID];
                return [4 /*yield*/, comp.findParent(req.editableID, req.editableName, comp)];
            case 1:
                parent = _a.sent();
                console.log("PARENT IS ", parent);
                if (!(parent == "-1")) return [3 /*break*/, 2];
                comp.destroy();
                delete sessionInstances[req.sessionID];
                return [3 /*break*/, 4];
            case 2:
                if (!(parent != null)) return [3 /*break*/, 4];
                return [4 /*yield*/, parent.remove(req.target)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (parent == null) {
                    res.status(404).send("Editable Not Found!");
                }
                res.status(200).send("Data Deleted!");
                return [2 /*return*/];
        }
    });
}); });
