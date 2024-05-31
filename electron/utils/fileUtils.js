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
exports.ValidateJsonSchema = exports.copyDir = exports.readYamlFile = exports.overwriteFolder = exports.deleteFolderSync = exports.deleteFile = exports.renameFolder = exports.createIndexYaml = exports.loadYamlWithRefs = exports.isBinary = void 0;
var fs_1 = __importDefault(require("fs"));
var fse = require("fs-extra");
var fs_p = require("fs").promises;
var path_1 = __importDefault(require("path"));
var electron_root_path_1 = require("electron-root-path");
var json_schema_ref_parser_1 = __importDefault(require("@apidevtools/json-schema-ref-parser"));
exports.isBinary = electron_root_path_1.rootPath.split(".").pop() === "app";
function loadYamlWithRefs(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var schema, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, json_schema_ref_parser_1.default.dereference(filePath)];
                case 1:
                    schema = _a.sent();
                    return [2 /*return*/, schema];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error parsing schema:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.loadYamlWithRefs = loadYamlWithRefs;
function createIndexYaml(relativeFolderPath_1) {
    return __awaiter(this, arguments, void 0, function (relativeFolderPath, removeContent) {
        var folderPath, indexYamlPath, structure, err_1;
        if (removeContent === void 0) { removeContent = true; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    folderPath = exports.isBinary ? relativeFolderPath : path_1.default.join(__dirname, relativeFolderPath);
                    console.log("Resolved folder path:", folderPath);
                    indexYamlPath = path_1.default.join(folderPath, "index.yaml");
                    structure = "";
                    if (fs_1.default.existsSync(indexYamlPath) && removeContent) {
                        console.log("index.yaml already exists, deleting it...");
                        fs_1.default.unlinkSync(indexYamlPath);
                    }
                    else if (fs_1.default.existsSync(indexYamlPath)) {
                        console.log("index.yaml already exists, not deleting it...");
                        return [2 /*return*/, [indexYamlPath, folderPath]];
                    }
                    if (!!fs_1.default.existsSync(folderPath)) return [3 /*break*/, 2];
                    console.log("Folder does not exist, creating it...");
                    return [4 /*yield*/, fs_p.mkdir(folderPath, { recursive: true, mode: 448 })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, fs_p.writeFile(indexYamlPath, structure, "utf8")];
                case 3:
                    _a.sent();
                    console.log("index.yaml created successfully!");
                    return [2 /*return*/, [indexYamlPath, folderPath]];
                case 4:
                    err_1 = _a.sent();
                    console.error("Error creating index.yaml:", err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createIndexYaml = createIndexYaml;
function renameFolder(folderPath, newName) {
    return __awaiter(this, void 0, void 0, function () {
        var parentDir, newFolderPath, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parentDir = path_1.default.dirname(folderPath);
                    newFolderPath = path_1.default.join(parentDir, newName);
                    console.log("Old folder path:", folderPath);
                    console.log("New folder path:", newFolderPath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 7]);
                    return [4 /*yield*/, fs_1.default.promises.access(newFolderPath)];
                case 2:
                    _a.sent();
                    throw new Error("Folder with the new name already exists!");
                case 3:
                    e_1 = _a.sent();
                    if (!(e_1.code === "ENOENT")) return [3 /*break*/, 5];
                    // Folder does not exist, proceed with renaming
                    return [4 /*yield*/, fs_1.default.promises.rename(folderPath, newFolderPath)];
                case 4:
                    // Folder does not exist, proceed with renaming
                    _a.sent();
                    console.log("Folder renamed successfully to ".concat(newName));
                    return [2 /*return*/, [newFolderPath + "/index.yaml", newFolderPath]];
                case 5: throw e_1;
                case 6: return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.renameFolder = renameFolder;
function deleteFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_p.unlink(filePath)];
                case 1:
                    _a.sent();
                    console.log("File deleted successfully!");
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error("Error deleting file:", err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteFile = deleteFile;
// Function to delete a folder synchronously at a given path
function deleteFolderSync(folderPath) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_1.default.promises.rm(folderPath, { recursive: true, force: true })];
                case 1:
                    _a.sent();
                    console.log("Folder successfully deleted");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error deleting the folder:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteFolderSync = deleteFolderSync;
function overwriteFolder(source, target) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fse.ensureDir(target)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fse.emptyDir(target)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, copyDir(source, target)];
                case 3:
                    _a.sent();
                    console.log("Folder overwritten successfully");
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error("Error overwriting the folder:", error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.overwriteFolder = overwriteFolder;
function readYamlFile(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var fileData, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_p.readFile(filePath, "utf8")];
                case 1:
                    fileData = _a.sent();
                    return [2 /*return*/, fileData];
                case 2:
                    err_3 = _a.sent();
                    console.error("Error reading YAML file:", err_3);
                    throw err_3; // Rethrow the error for caller to handle if needed
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.readYamlFile = readYamlFile;
function copyDir(src_1, dest_1) {
    return __awaiter(this, arguments, void 0, function (src, dest, ignoreFiles) {
        var files, _i, files_1, file, srcPath, destPath, stat;
        if (ignoreFiles === void 0) { ignoreFiles = [
            "node_modules",
            ".git",
            "package.json",
            "package-lock.json",
            "README.md",
        ]; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    src = path_1.default.resolve(__dirname, src);
                    dest = path_1.default.resolve(__dirname, dest);
                    return [4 /*yield*/, fs_p.mkdir(dest, { recursive: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fs_p.readdir(src)];
                case 2:
                    files = _a.sent();
                    _i = 0, files_1 = files;
                    _a.label = 3;
                case 3:
                    if (!(_i < files_1.length)) return [3 /*break*/, 9];
                    file = files_1[_i];
                    if (ignoreFiles.includes(file)) {
                        console.log("Ignoring file: ".concat(file));
                        return [3 /*break*/, 8];
                    }
                    srcPath = path_1.default.join(src, file);
                    destPath = path_1.default.join(dest, file);
                    return [4 /*yield*/, fs_p.stat(srcPath)];
                case 4:
                    stat = _a.sent();
                    if (!stat.isDirectory()) return [3 /*break*/, 6];
                    return [4 /*yield*/, copyDir(srcPath, destPath)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, fs_p.copyFile(srcPath, destPath)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 3];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.copyDir = copyDir;
function ValidateJsonSchema(jsonSchema) {
    return __awaiter(this, void 0, void 0, function () {
        var schema, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, JSON.parse(JSON.stringify(jsonSchema))];
                case 1:
                    schema = _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error parsing schema:", error_4);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.ValidateJsonSchema = ValidateJsonSchema;
// // Example usage:
// const sourceFilePath = "../../ONDC-NTS-Specifications/api/cp0";
// const destinationFilePath = "../history/copy";
// copyDir(sourceFilePath, destinationFilePath);
console.log(__dirname);
// Example usage:
// const sourceFilePath = "../../ONDC-NTS-Specifications/api/cp0/index.yaml";
// const destinationFilePath = "../../ONDC-NTS-Specifications/api/cp1/index.yaml";
// copyYamlFile(sourceFilePath, destinationFilePath);
// (async () => {
//   const p = "../../../ONDC-NTS-Specifications/examples/on-demand/index.yaml";
//   const data = await loadYamlWithRefs(path.resolve(__dirname, p));
//   console.log(JSON.stringify(data, null, 2));
//   // try {
//   //   const relativeFolderPath = "../../ONDC-NTS-Specifications/api/cp0";
//   //   const structure = await getFileStructureRelative(relativeFolderPath);
//   //   console.log("File structure:", structure);
//   // } catch (err) {
//   //   console.error("Error testing getFileStructureRelative:", err);
//   // }
// })();
