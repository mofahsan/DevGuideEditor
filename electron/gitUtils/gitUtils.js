"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractBranchName = exports.printAllRemotes = exports.resetCurrentBranch = exports.getStatus = exports.raisePr = exports.stashFetchCommitAndPushChanges = exports.getBranches = exports.changeBranch = exports.cloneRepo = exports.forkRepository = void 0;
var rest_1 = require("@octokit/rest");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var simple_git_1 = __importStar(require("simple-git"));
var fileUtils_1 = require("../utils/fileUtils");
var fileUtils_2 = require("../utils/fileUtils");
var electron_root_path_1 = require("electron-root-path");
var forkRepository = function (token, repoUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, owner, repo, octokit, retryOperation, userRepos, forkedRepo, response, branches, forkedOwner, forkedRepoName, _i, branches_1, branch, branchName, branchData, error_1, forkedRepoUrl, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = repoUrl.replace("https://github.com/", "").split("/"), owner = _a[0], repo = _a[1];
                octokit = new rest_1.Octokit({
                    auth: token,
                });
                retryOperation = function (operation_1) {
                    var args_1 = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args_1[_i - 1] = arguments[_i];
                    }
                    return __awaiter(void 0, __spreadArray([operation_1], args_1, true), void 0, function (operation, retries, delay) {
                        var i, error_3;
                        if (retries === void 0) { retries = 3; }
                        if (delay === void 0) { delay = 1000; }
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    i = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(i < retries)) return [3 /*break*/, 9];
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 8]);
                                    return [4 /*yield*/, operation()];
                                case 3: return [2 /*return*/, _a.sent()];
                                case 4:
                                    error_3 = _a.sent();
                                    if (!(i < retries - 1)) return [3 /*break*/, 6];
                                    console.log("Retrying... (".concat(i + 1, "/").concat(retries, ")"));
                                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, delay); })];
                                case 5:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 6: throw error_3;
                                case 7: return [3 /*break*/, 8];
                                case 8:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 9: return [2 /*return*/];
                            }
                        });
                    });
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 12, , 13]);
                return [4 /*yield*/, retryOperation(function () {
                        return octokit.repos.listForAuthenticatedUser();
                    })];
            case 2:
                userRepos = (_b.sent()).data;
                forkedRepo = userRepos.find(function (r) { return r.name === repo; });
                // console.log(userRepos);
                console.log(forkedRepo);
                if (forkedRepo) {
                    console.log("Repository is already forked:", forkedRepo.html_url);
                    return [2 /*return*/, forkedRepo.html_url];
                }
                return [4 /*yield*/, retryOperation(function () {
                        return octokit.repos.createFork({
                            owner: owner,
                            repo: repo,
                        });
                    })];
            case 3:
                response = _b.sent();
                console.log("Repository forked successfully:", response.data);
                return [4 /*yield*/, retryOperation(function () {
                        return octokit.repos.listBranches({
                            owner: owner,
                            repo: repo,
                        });
                    })];
            case 4:
                branches = (_b.sent()).data;
                forkedOwner = response.data.owner.login;
                forkedRepoName = response.data.name;
                _i = 0, branches_1 = branches;
                _b.label = 5;
            case 5:
                if (!(_i < branches_1.length)) return [3 /*break*/, 11];
                branch = branches_1[_i];
                branchName = branch.name;
                console.log("Processing branch: ".concat(branchName));
                _b.label = 6;
            case 6:
                _b.trys.push([6, 9, , 10]);
                return [4 /*yield*/, octokit.repos.getBranch({
                        owner: owner,
                        repo: repo,
                        branch: branchName,
                    })];
            case 7:
                branchData = (_b.sent()).data;
                // Create the branch in the forked repository
                return [4 /*yield*/, octokit.git.createRef({
                        owner: forkedOwner,
                        repo: forkedRepoName,
                        ref: "refs/heads/".concat(branchName),
                        sha: branchData.commit.sha,
                    })];
            case 8:
                // Create the branch in the forked repository
                _b.sent();
                console.log("Branch ".concat(branchName, " processed successfully."));
                return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                console.error("Failed to process branch ".concat(branchName, ": ").concat(error_1.message));
                console.log("Skipping branch ".concat(branchName, "."));
                return [3 /*break*/, 10];
            case 10:
                _i++;
                return [3 /*break*/, 5];
            case 11:
                console.log("All branches have been processed.");
                forkedRepoUrl = "https://github.com/".concat(forkedOwner, "/").concat(repo, ".git");
                return [2 /*return*/, forkedRepoUrl];
            case 12:
                error_2 = _b.sent();
                throw new Error("Error forking repository: ".concat(error_2.message));
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.forkRepository = forkRepository;
/**
 * Clones a GitHub repository using the provided URL and Personal Access Token (PAT).
 * @param {string} token - Your GitHub Personal Access Token.
 * @param {string} repoUrl - The URL of the repository to clone.
 * @param {string} localPath - The local path where the repository should be cloned.
 * @returns {Promise<void>}
 */
var cloneRepo = function (token, userName, repoUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var git, _a, owner, repo, authenticatedUrl, forkedCompPath, localPath, existingRepo, repoName, clonedRepo, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                git = (0, simple_git_1.default)();
                _a = repoUrl.replace("https://github.com/", "").split("/"), owner = _a[0], repo = _a[1];
                authenticatedUrl = "https://".concat(token, "@github.com/").concat(userName, "/").concat(repo, ".git");
                forkedCompPath = fileUtils_2.isBinary
                    ? path_1.default.join(electron_root_path_1.rootPath, "../", "FORKED_REPO")
                    : "../../../../backend-editor/FORKED_REPO";
                localPath = path_1.default.resolve(__dirname, forkedCompPath);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                if (!fs_1.default.existsSync(localPath)) return [3 /*break*/, 5];
                existingRepo = (0, simple_git_1.default)(localPath);
                return [4 /*yield*/, getRepoName(existingRepo)];
            case 2:
                repoName = _b.sent();
                if (!(repoName === repo)) return [3 /*break*/, 3];
                console.log("Repository already cloned");
                return [2 /*return*/];
            case 3: return [4 /*yield*/, (0, fileUtils_1.deleteFolderSync)(localPath)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5: return [4 /*yield*/, git.clone(authenticatedUrl, localPath)];
            case 6:
                _b.sent();
                clonedRepo = (0, simple_git_1.default)(localPath);
                // Configure the Git user
                return [4 /*yield*/, clonedRepo.addConfig("user.name", userName)];
            case 7:
                // Configure the Git user
                _b.sent();
                return [4 /*yield*/, clonedRepo.addConfig("user.email", "dummy-email@example.com")];
            case 8:
                _b.sent(); // Using a dummy email
                // Add the original repository as upstream remote
                return [4 /*yield*/, clonedRepo.addRemote("upstream", repoUrl)];
            case 9:
                // Add the original repository as upstream remote
                _b.sent();
                console.log("Repository cloned");
                return [3 /*break*/, 11];
            case 10:
                error_4 = _b.sent();
                console.error("Error cloning repository:", error_4.message);
                throw error_4;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.cloneRepo = cloneRepo;
/**
 * Changes the branch of a cloned GitHub repository.
 * @param {string} repoPath - The local path of the cloned repository.
 * @param {string} branchName - The branch name to switch to.
 * @returns {Promise<void>}
 */
var changeBranch = function (repoPath, branchName) { return __awaiter(void 0, void 0, void 0, function () {
    var git, currentBranchSummary, currentBranch, stashMessage, branchSummary, stashList, branchStashIndex, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                git = (0, simple_git_1.default)(repoPath);
                return [4 /*yield*/, git.branch()];
            case 1:
                currentBranchSummary = _a.sent();
                currentBranch = "remotes/" + currentBranchSummary.current;
                currentBranch = extractBranchName(currentBranch);
                console.log("Current branch is ".concat(currentBranch));
                // console.log(git.stashList)
                if (currentBranch === branchName) {
                    console.log("Already on branch ".concat(branchName));
                    return [2 /*return*/];
                }
                stashMessage = "stash@".concat(currentBranch);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 11, , 12]);
                // Stash any current changes with a specific message
                return [4 /*yield*/, git.stash(["push", "-u", "-m", stashMessage])];
            case 3:
                // Stash any current changes with a specific message
                _a.sent();
                console.log("Stashed changes for branch ".concat(currentBranch));
                return [4 /*yield*/, git.branch()];
            case 4:
                branchSummary = _a.sent();
                if (!!branchSummary.all.includes(branchName)) return [3 /*break*/, 6];
                // Fetch the branch from the remote if it does not exist locally
                return [4 /*yield*/, git.fetch("origin", branchName)];
            case 5:
                // Fetch the branch from the remote if it does not exist locally
                _a.sent();
                _a.label = 6;
            case 6:
                // Checkout the branch
                console.log("Checking out branch", branchName);
                return [4 /*yield*/, git.checkout(branchName)];
            case 7:
                _a.sent();
                // await git.checkoutBranch(branchName, "origin");
                console.log("Switched to branch ".concat(branchName));
                return [4 /*yield*/, git.stashList()];
            case 8:
                stashList = _a.sent();
                branchStashIndex = stashList.all.findIndex(function (stash) {
                    return stash.message.includes("stash@".concat(extractBranchName(branchName)));
                });
                if (!(branchStashIndex !== -1)) return [3 /*break*/, 10];
                return [4 /*yield*/, git.stash(["pop", "stash@{".concat(branchStashIndex, "}")])];
            case 9:
                _a.sent();
                console.log("Applied stash for branch ".concat(branchName));
                _a.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_5 = _a.sent();
                console.error("Error switching branches:", error_5.message);
                throw error_5;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.changeBranch = changeBranch;
var getBranches = function (repoPath) { return __awaiter(void 0, void 0, void 0, function () {
    var git, branches, allBranches;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                git = (0, simple_git_1.default)(repoPath);
                return [4 /*yield*/, git.branch()];
            case 1:
                branches = _a.sent();
                console.log(branches);
                allBranches = branches.all;
                allBranches = allBranches.filter(function (b) { return b.includes("remotes/origin"); });
                return [2 /*return*/, { allBranches: allBranches, currentBranch: branches.current }];
        }
    });
}); };
exports.getBranches = getBranches;
/**
 * Stashes changes, fetches updates, applies stash, commits with provided message, and pushes to the remote repository.
 * @param {string} repoPath - The local path of the repository.
 * @param {string} commitMessage - The commit message.
 * @returns {Promise<void>}
 */
var stashFetchCommitAndPushChanges = function (repoPath, commitMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var git, branch, withoutOrigin, res, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                git = (0, simple_git_1.default)(repoPath);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, git.branch()];
            case 2:
                branch = (_a.sent()).current;
                withoutOrigin = extractBranchName(branch);
                return [4 /*yield*/, git.add("./*")];
            case 3:
                _a.sent();
                console.log("Changes added successfully");
                return [4 /*yield*/, git.commit(commitMessage)];
            case 4:
                _a.sent();
                console.log("Changes committed successfully");
                console.log("HEAD:" + withoutOrigin);
                return [4 /*yield*/, git.push("origin", "HEAD:" + withoutOrigin)];
            case 5:
                res = _a.sent();
                console.log(res);
                console.log("Changes pushed successfully to branch:", withoutOrigin);
                // git.checkoutBranch(withoutOrigin, "origin/" + withoutOrigin);
                // await git.checkout("remotes")
                console.log("checkout", "remotes/" + branch);
                return [4 /*yield*/, git.checkout("master")];
            case 6:
                _a.sent();
                return [4 /*yield*/, git.checkout("remotes/" + branch)];
            case 7:
                _a.sent();
                return [3 /*break*/, 9];
            case 8:
                error_6 = _a.sent();
                console.error("Error during commit and push process:", error_6.message);
                throw error_6;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.stashFetchCommitAndPushChanges = stashFetchCommitAndPushChanges;
var raisePr = function (token, repoUrl, repoPath, prTitle, prBody, extractedBranchName) { return __awaiter(void 0, void 0, void 0, function () {
    var octokit, _a, owner, repo, forkedOwner, pullRequest, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                octokit = new rest_1.Octokit({
                    auth: token,
                });
                _a = repoUrl.replace("https://github.com/", "").split("/"), owner = _a[0], repo = _a[1];
                // const branchName = extractBranchName((await git.branch()).current);
                console.log("Branch Name", extractedBranchName);
                return [4 /*yield*/, octokit.users.getAuthenticated()];
            case 1:
                forkedOwner = (_b.sent()).data.login;
                console.log("fileds", {
                    owner: owner,
                    repo: repo,
                    title: prTitle,
                    body: prBody,
                    head: "".concat(forkedOwner, ":").concat(extractedBranchName),
                    base: extractedBranchName,
                });
                return [4 /*yield*/, octokit.pulls.create({
                        owner: owner,
                        repo: repo,
                        title: prTitle,
                        body: prBody,
                        head: "".concat(forkedOwner, ":").concat(extractedBranchName),
                        base: extractedBranchName,
                    })];
            case 2:
                pullRequest = (_b.sent()).data;
                return [2 /*return*/, pullRequest.html_url];
            case 3:
                e_1 = _b.sent();
                console.log("Error creating PR");
                console.log(e_1.message);
                throw new Error("Error creating PR: ".concat(e_1.message));
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.raisePr = raisePr;
function getStatus(repoPath) {
    return __awaiter(this, void 0, void 0, function () {
        var git;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    git = (0, simple_git_1.default)(repoPath);
                    return [4 /*yield*/, git.status()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getStatus = getStatus;
var getRepoName = function (git) { return __awaiter(void 0, void 0, void 0, function () {
    var remote, repoName;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, git.listRemote(["--get-url"])];
            case 1:
                remote = _b.sent();
                repoName = (_a = remote.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".git")[0];
                return [2 /*return*/, repoName];
        }
    });
}); };
/**
 * Resets the current branch by fetching, clearing local changes, and pulling the latest changes.
 * @param {string} repoPath - The local path of the cloned repository.
 * @returns {Promise<void>}
 */
var resetCurrentBranch = function (repoPath) { return __awaiter(void 0, void 0, void 0, function () {
    var git, _a, _b, currentBranchSummary, currentBranch, stashMessage_1, withoutOrigin, stashList, branchStashIndex, error_7;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                git = (0, simple_git_1.default)(repoPath);
                _b = (_a = console).log;
                return [4 /*yield*/, (0, exports.printAllRemotes)(git)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                _c.label = 2;
            case 2:
                _c.trys.push([2, 11, , 12]);
                return [4 /*yield*/, git.branch()];
            case 3:
                currentBranchSummary = _c.sent();
                currentBranch = currentBranchSummary.current;
                stashMessage_1 = "stash@".concat(currentBranch);
                console.log("Current branch is ".concat(currentBranch));
                // Fetch all branches to ensure local and remote branches are up to date
                return [4 /*yield*/, git.fetch(["upstream"])];
            case 4:
                // Fetch all branches to ensure local and remote branches are up to date
                _c.sent();
                console.log("Fetched all branches from remote");
                // Stash any current changes, including untracked files, with a specific message
                return [4 /*yield*/, git.stash(["push", "-u", "-m", stashMessage_1])];
            case 5:
                // Stash any current changes, including untracked files, with a specific message
                _c.sent();
                console.log("Stashed changes for branch ".concat(currentBranch));
                withoutOrigin = currentBranch;
                if (currentBranch.includes("origin")) {
                    withoutOrigin = currentBranch.split("/")[1];
                }
                console.log("withoutOrigin", withoutOrigin);
                return [4 /*yield*/, git.reset(simple_git_1.ResetMode.HARD)];
            case 6:
                _c.sent();
                return [4 /*yield*/, git.pull("origin", withoutOrigin)];
            case 7:
                _c.sent();
                console.log("Pulled latest changes from upstream for branch ".concat(currentBranch));
                return [4 /*yield*/, git.stashList()];
            case 8:
                stashList = _c.sent();
                branchStashIndex = stashList.all.findIndex(function (stash) {
                    return stash.message.includes(stashMessage_1);
                });
                if (!(branchStashIndex !== -1)) return [3 /*break*/, 10];
                return [4 /*yield*/, git.stash(["drop", "stash@{".concat(branchStashIndex, "}")])];
            case 9:
                _c.sent();
                console.log("Deleted stash for branch ".concat(currentBranch));
                _c.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_7 = _c.sent();
                console.error("Error resetting branch:", error_7.message);
                throw error_7;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.resetCurrentBranch = resetCurrentBranch;
var printAllRemotes = function (git) { return __awaiter(void 0, void 0, void 0, function () {
    var remotes, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, git.getRemotes(true)];
            case 1:
                remotes = _a.sent();
                if (remotes.length === 0) {
                    console.log("No remote repositories found.");
                    return [2 /*return*/];
                }
                console.log("Remote repositories:");
                remotes.forEach(function (remote) {
                    console.log("Name: ".concat(remote.name));
                    console.log("Fetch URL: ".concat(remote.refs.fetch));
                    console.log("Push URL: ".concat(remote.refs.push));
                    console.log("---");
                });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error("Error fetching remote repositories:", error_8.message);
                throw error_8;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.printAllRemotes = printAllRemotes;
/**
 * Extracts the branch name by removing the remote prefix (e.g., 'origin/')
 * and any other similar prefixes.
 *
 * @param fullBranchName - The full branch name, potentially with a remote prefix.
 * @returns The branch name without the remote prefix.
 */
function extractBranchName(fullBranchName) {
    // Split the branch name by '/'
    var parts = fullBranchName.split("/");
    // Return the last part of the split array, which is the actual branch name
    return parts[parts.length - 1];
}
exports.extractBranchName = extractBranchName;
// (async () => {
//   const token = "";
//   const url = "https://github.com/ONDC-Official/ONDC-FIS-Specifications";
//   const userName = "rudranshOndc";
//   const repoPath = path.resolve(
//     __dirname,
//     "../../../../backend-editor/FORKED_REPO"
//   );
//   // await getBranches(repoPath);
//   //   await forkRepository(token, url);
//   //   await cloneRepo(token, userName, url);
//   //   await changeBranch(
//   //     path.resolve(__dirname, "../../../../backend-editor/FORKED_REPO"),
//   //     "release-FIS12-2.0.0"
//   //   );
//   // console.log(await getStatus(repoPath));
//   // changeBranch(repoPath, "master");
//   // await stashFetchCommitAndPushChanges(repoPath, "testing commit");
//   // await new Promise((resolve) => setTimeout(resolve, 2000));
//   // console.log(await getBranches(repoPath));
//   // await raisePr(token, url, repoPath, "Test PR", "This is a test PR");
//   // await resetCurrentBranch(repoPath);
// })();
