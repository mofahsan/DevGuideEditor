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
exports.buildWrapper = void 0;
var fs = require("fs");
var js_yaml_1 = __importDefault(require("js-yaml"));
var path = require("path");
var fileUtils_1 = require("../fileUtils");
var $RefParser = require("json-schema-ref-parser");
var execSync = require("child_process").execSync;
var Ajv = require("ajv");
var ajv = new Ajv({
    allErrors: true,
    strict: "log",
});
var addFormats = require("ajv-formats");
ajv.addFormat("phone", "");
addFormats(ajv);
require("ajv-errors")(ajv);
var args = process.argv.slice(2);
// var example_set = args[0]
// var flow_set = args[1]
var base_yaml = fileUtils_1.isBinary ? path.join(path.dirname(process.execPath), "./FORKED_REPO/api/components/beckn_yaml.yaml") : "./src/utils/build/beckn_yaml.yaml"; //beckn yaml
var example_yaml = fileUtils_1.isBinary ? path.join(path.dirname(process.execPath), "./FORKED_REPO/api/components/index.yaml") : "../FORKED_REPO/api/components/index.yaml"; //args[1]; //  main file of the yamls
var outputPath = fileUtils_1.isBinary ? path.join(path.dirname(process.execPath), "./FORKED_REPO/api/build/build.yaml") : "./src/build/build.yaml";
var uiPath = fileUtils_1.isBinary ? path.join(path.dirname(process.execPath), "./FORKED_REPO/ui/build.js") : "./src/build/build.js";
// const outputPath = `./build.yaml`;
// const unresolvedFilePath = `https://raw.githubusercontent.com/beckn/protocol-specifications/master/api/transaction/components/index.yaml`
var tempPath = "./temp.yaml";
// add featureui docs
var buildAttribiutes = require("./build-attributes").buildAttribiutes;
var buildErrorCodes = require("./build-error-code").buildErrorCodes;
var buildTlc = require("./build-tlc").buildTlc;
var SKIP_VALIDATION = {
    flows: "skip1",
    examples: "skip2",
    enums: "skip3",
    tags: "skip4",
};
var BUILD = {
    attributes: "attributes",
    error: "errorCode",
    tlc: "tlc",
};
function baseYMLFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var schema, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, $RefParser.dereference(file)];
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
function validateSchema(schema, data) {
    return __awaiter(this, void 0, void 0, function () {
        var validate, valid;
        return __generator(this, function (_a) {
            validate = ajv.compile(schema);
            valid = validate(data === null || data === void 0 ? void 0 : data.value);
            if (!valid) {
                console.log(validate.errors);
                return [2 /*return*/, true];
            }
            return [2 /*return*/, false];
        });
    });
}
function validateFlows(flows, schemaMap) {
    return __awaiter(this, void 0, void 0, function () {
        var hasTrueResult, _i, flows_1, flowItem, steps, _a, steps_1, step, _b, _c, api, result;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    hasTrueResult = false;
                    _i = 0, flows_1 = flows;
                    _d.label = 1;
                case 1:
                    if (!(_i < flows_1.length)) return [3 /*break*/, 8];
                    flowItem = flows_1[_i];
                    steps = flowItem.steps;
                    if (!(steps && (steps === null || steps === void 0 ? void 0 : steps.length))) return [3 /*break*/, 7];
                    _a = 0, steps_1 = steps;
                    _d.label = 2;
                case 2:
                    if (!(_a < steps_1.length)) return [3 /*break*/, 7];
                    step = steps_1[_a];
                    _b = 0, _c = Object.keys(schemaMap);
                    _d.label = 3;
                case 3:
                    if (!(_b < _c.length)) return [3 /*break*/, 6];
                    api = _c[_b];
                    if (!(step.api === api && step.api !== "form")) return [3 /*break*/, 5];
                    return [4 /*yield*/, validateSchema(schemaMap[api], step.example)];
                case 4:
                    result = _d.sent();
                    if (result) {
                        console.log("Error[flows]:", "".concat((flowItem === null || flowItem === void 0 ? void 0 : flowItem.summary) + "/" + api));
                        return [2 /*return*/, (hasTrueResult = true)];
                    }
                    _d.label = 5;
                case 5:
                    _b++;
                    return [3 /*break*/, 3];
                case 6:
                    _a++;
                    return [3 /*break*/, 2];
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function validateExamples(exampleSets, schemaMap) {
    return __awaiter(this, void 0, void 0, function () {
        var hasTrueResult, _i, _a, example, _b, _c, api, exampleList, _d, _e, payload, result;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    hasTrueResult = false;
                    _i = 0, _a = Object.keys(exampleSets);
                    _g.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    example = _a[_i];
                    _b = 0, _c = Object.keys(schemaMap);
                    _g.label = 2;
                case 2:
                    if (!(_b < _c.length)) return [3 /*break*/, 7];
                    api = _c[_b];
                    exampleList = (_f = exampleSets[example].example_set[api]) === null || _f === void 0 ? void 0 : _f.examples;
                    if (exampleSets[example].example_set[api] && !exampleList) {
                        throw Error("Example not found for ".concat(api));
                    }
                    console.log(exampleList, "exampleList");
                    if (!(exampleList !== undefined)) return [3 /*break*/, 6];
                    _d = 0, _e = Object.keys(exampleList);
                    _g.label = 3;
                case 3:
                    if (!(_d < _e.length)) return [3 /*break*/, 6];
                    payload = _e[_d];
                    return [4 /*yield*/, validateSchema(schemaMap[api], exampleList[payload])];
                case 4:
                    result = _g.sent();
                    if (result) {
                        console.log("error[Example] :", "".concat(example + "/" + api));
                        return [2 /*return*/, (hasTrueResult = true)];
                    }
                    _g.label = 5;
                case 5:
                    _d++;
                    return [3 /*break*/, 3];
                case 6:
                    _b++;
                    return [3 /*break*/, 2];
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function matchKeyType(currentAttrib, currentExamplePos, currentSchemaPos, logObject) {
    return __awaiter(this, void 0, void 0, function () {
        var exampleArray, schemaType, allOfType, itemType, i, checkEnum, type;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            exampleArray = currentExamplePos[currentAttrib];
            schemaType = (_a = currentSchemaPos[currentAttrib]) === null || _a === void 0 ? void 0 : _a.type;
            allOfType = (_d = (_c = (_b = currentSchemaPos[currentAttrib]) === null || _b === void 0 ? void 0 : _b.allOf) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.type;
            itemType = (_h = (_g = (_f = (_e = currentSchemaPos[currentAttrib]) === null || _e === void 0 ? void 0 : _e.items) === null || _f === void 0 ? void 0 : _f.allOf) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.type;
            for (i = 0; i < (exampleArray === null || exampleArray === void 0 ? void 0 : exampleArray.length); i++) {
                checkEnum = exampleArray[i];
                type = schemaType;
                //if type is array
                if (schemaType === "array") {
                    type = itemType;
                }
                else if ((_j = currentSchemaPos[currentAttrib]) === null || _j === void 0 ? void 0 : _j.allOf) {
                    type = allOfType;
                }
                if (typeof (checkEnum === null || checkEnum === void 0 ? void 0 : checkEnum.code) != type) {
                    throw Error("Enum type not matched: ".concat(currentAttrib, " in ").concat(logObject));
                }
            }
            return [2 /*return*/];
        });
    });
}
function checkObjectKeys(currentExamplePos, currentSchemaPos, logObject) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, currentAttrib, currentExample, currentSchema, schema;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _i = 0, _a = Object.keys(currentExamplePos);
                    _e.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 10];
                    currentAttrib = _a[_i];
                    currentExample = currentExamplePos[currentAttrib];
                    currentSchema = currentSchemaPos[currentAttrib];
                    if (!currentSchema) return [3 /*break*/, 6];
                    if (!Array.isArray(currentExample)) return [3 /*break*/, 3];
                    return [4 /*yield*/, matchKeyType(currentAttrib, currentExamplePos, currentSchemaPos, logObject)];
                case 2:
                    _e.sent();
                    return [3 /*break*/, 5];
                case 3:
                    schema = void 0;
                    if (currentSchema.type === "object") {
                        schema = currentSchema.properties;
                    }
                    else if (currentSchema.type === "array") {
                        schema =
                            ((_b = currentSchema.items) === null || _b === void 0 ? void 0 : _b.properties) || ((_c = currentSchema.items) === null || _c === void 0 ? void 0 : _c.allOf);
                    }
                    else {
                        schema = currentSchema.allOf;
                    }
                    return [4 /*yield*/, checkObjectKeys(currentExample, schema, logObject)];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5: return [3 /*break*/, 9];
                case 6:
                    if (!Array.isArray(currentSchemaPos)) return [3 /*break*/, 8];
                    return [4 /*yield*/, checkObjectKeys(currentExamplePos, ((_d = currentSchemaPos[0]) === null || _d === void 0 ? void 0 : _d.properties) || currentSchemaPos[0], logObject)];
                case 7:
                    _e.sent();
                    return [3 /*break*/, 9];
                case 8: throw new Error("Key not found: ".concat(currentAttrib, " in ").concat(logObject));
                case 9:
                    _i++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function validateEnumsTags(exampleEnums, schemaMap) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, example, currentExample, currentSchema, _b, _c, currentExamples, currentSchemaPos, currentExamplePos, logObject;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _i = 0, _a = Object.keys(exampleEnums);
                    _f.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    example = _a[_i];
                    currentExample = exampleEnums[example];
                    currentSchema = schemaMap[example];
                    _b = 0, _c = Object.keys(currentExample);
                    _f.label = 2;
                case 2:
                    if (!(_b < _c.length)) return [3 /*break*/, 5];
                    currentExamples = _c[_b];
                    currentSchemaPos = ((_d = currentSchema === null || currentSchema === void 0 ? void 0 : currentSchema.properties[currentExamples]) === null || _d === void 0 ? void 0 : _d.properties) ||
                        ((_e = currentSchema === null || currentSchema === void 0 ? void 0 : currentSchema.properties[currentExamples]) === null || _e === void 0 ? void 0 : _e.allOf);
                    currentExamplePos = currentExample[currentExamples];
                    logObject = "".concat(example, "/").concat(currentExamples);
                    return [4 /*yield*/, checkObjectKeys(currentExamplePos, currentSchemaPos, logObject)];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4:
                    _b++;
                    return [3 /*break*/, 2];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function traverseTags(currentTagValue, schemaForTraversal, logObject) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, currentTagKey, currentTag, schemaType, schema;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _i = 0, _a = Object.keys(currentTagValue);
                    _f.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    currentTagKey = _a[_i];
                    currentTag = currentTagValue[currentTagKey];
                    schemaType = schemaForTraversal[currentTagKey];
                    if (!schemaType) return [3 /*break*/, 5];
                    if (!Array.isArray(currentTag)) return [3 /*break*/, 2];
                    return [3 /*break*/, 4];
                case 2:
                    schema = schemaType.type === "object"
                        ? schemaType === null || schemaType === void 0 ? void 0 : schemaType.properties
                        : ((_b = schemaType.items) === null || _b === void 0 ? void 0 : _b.properties) ||
                            ((_d = (_c = schemaType.items) === null || _c === void 0 ? void 0 : _c.allOf[0]) === null || _d === void 0 ? void 0 : _d.properties) ||
                            ((_e = schemaType.allOf[0]) === null || _e === void 0 ? void 0 : _e.properties);
                    return [4 /*yield*/, traverseTags(currentTag, schema, logObject)];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5: throw Error("[Tags], Key not found: ".concat(currentTagKey, " in ").concat(logObject));
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function validateTags(tags, schema, isAttribute) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, tag, currentTag, currentSchema, _b, _c, tagItem, currentTagValue, schemaForTraversal, logObject;
        var _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    _i = 0, _a = Object.keys(tags);
                    _k.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    tag = _a[_i];
                    currentTag = tags[tag];
                    currentSchema = (_d = schema[tag]) === null || _d === void 0 ? void 0 : _d.properties;
                    _b = 0, _c = Object.keys(currentTag);
                    _k.label = 2;
                case 2:
                    if (!(_b < _c.length)) return [3 /*break*/, 7];
                    tagItem = _c[_b];
                    currentTagValue = currentTag[tagItem];
                    schemaForTraversal = void 0;
                    if (((_e = currentSchema[tagItem]) === null || _e === void 0 ? void 0 : _e.type) === "object") {
                        schemaForTraversal = (_f = currentSchema[tagItem]) === null || _f === void 0 ? void 0 : _f.properties;
                    } //for validating attribute contexts
                    else if (((_g = currentSchema[tagItem]) === null || _g === void 0 ? void 0 : _g.allOf[0]) && isAttribute) {
                        schemaForTraversal = (_j = (_h = currentSchema[tagItem]) === null || _h === void 0 ? void 0 : _h.allOf[0]) === null || _j === void 0 ? void 0 : _j.properties;
                    }
                    logObject = "".concat(isAttribute, "/").concat(tag, "/").concat(tagItem, "/");
                    if (!isAttribute) return [3 /*break*/, 4];
                    return [4 /*yield*/, traverseAttributes(currentTagValue, schemaForTraversal, logObject)];
                case 3:
                    _k.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, traverseTags(currentTagValue, schemaForTraversal, logObject)];
                case 5:
                    _k.sent();
                    _k.label = 6;
                case 6:
                    _b++;
                    return [3 /*break*/, 2];
                case 7:
                    _i++;
                    return [3 /*break*/, 1];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function traverseAttributes(currentAttributeValue, schemaForTraversal, logObject) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, currentAttributeKey, currentAttr, schemaType, schema;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _i = 0, _a = Object.keys(currentAttributeValue);
                    _f.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    currentAttributeKey = _a[_i];
                    currentAttr = currentAttributeValue[currentAttributeKey];
                    schemaType = schemaForTraversal[currentAttributeKey];
                    //&& 'type' in currentAttr && 'owner' in currentAttr && 'usage' in currentAttr && 'description' in currentAttr
                    if ("required" in currentAttr) {
                        return [3 /*break*/, 6];
                    }
                    if (!schemaType) return [3 /*break*/, 5];
                    if (!Array.isArray(currentAttr)) return [3 /*break*/, 2];
                    return [3 /*break*/, 4];
                case 2:
                    schema = schemaType.type === "object"
                        ? schemaType === null || schemaType === void 0 ? void 0 : schemaType.properties
                        : ((_b = schemaType.items) === null || _b === void 0 ? void 0 : _b.properties) ||
                            ((_d = (_c = schemaType.items) === null || _c === void 0 ? void 0 : _c.allOf[0]) === null || _d === void 0 ? void 0 : _d.properties) ||
                            ((_e = schemaType.allOf[0]) === null || _e === void 0 ? void 0 : _e.properties);
                    return [4 /*yield*/, traverseAttributes(currentAttr, schema, logObject)];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5: throw Error("[Attribute], Key not found: ".concat(currentAttributeKey, " in ").concat(logObject));
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function validateAttributes(attribute, schemaMap) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, example;
        return __generator(this, function (_b) {
            for (_i = 0, _a = Object.keys(attribute); _i < _a.length; _i++) {
                example = _a[_i];
                validateTags(attribute[example].attribute_set, schemaMap, example);
            }
            return [2 /*return*/];
        });
    });
}
function getSwaggerYaml(example_set, outputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var schema, baseYAML, _a, flows, exampleSets, enums, tags, attributes, paths, hasTrueResult, schemaMap, path_1, pathSchema, examples, spec_file, spec, error_2;
        var _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, baseYMLFile(example_yaml)];
                case 1:
                    schema = _g.sent();
                    return [4 /*yield*/, baseYMLFile(base_yaml)];
                case 2:
                    baseYAML = _g.sent();
                    _a = schema || [], flows = _a.flows, exampleSets = _a.examples, enums = _a.enum, tags = _a.tags, attributes = _a.attributes;
                    paths = baseYAML.paths;
                    hasTrueResult = false;
                    schemaMap = {};
                    if (!process.argv.includes(BUILD.attributes)) return [3 /*break*/, 4];
                    return [4 /*yield*/, buildAttribiutes()];
                case 3:
                    _g.sent();
                    _g.label = 4;
                case 4:
                    if (!process.argv.includes(BUILD.error)) return [3 /*break*/, 6];
                    return [4 /*yield*/, buildErrorCodes()];
                case 5:
                    _g.sent();
                    _g.label = 6;
                case 6:
                    if (!process.argv.includes(BUILD.tlc)) return [3 /*break*/, 8];
                    return [4 /*yield*/, buildTlc()];
                case 7:
                    _g.sent();
                    _g.label = 8;
                case 8:
                    for (path_1 in paths) {
                        pathSchema = (_f = (_e = (_d = (_c = (_b = paths[path_1]) === null || _b === void 0 ? void 0 : _b.post) === null || _c === void 0 ? void 0 : _c.requestBody) === null || _d === void 0 ? void 0 : _d.content) === null || _e === void 0 ? void 0 : _e["application/json"]) === null || _f === void 0 ? void 0 : _f.schema;
                        schemaMap[path_1.substring(1)] = pathSchema;
                    }
                    console.log("SKIPING FLOWS VALIDATION!");
                    // if (!process.argv.includes(SKIP_VALIDATION.flows)) {
                    //   hasTrueResult = await validateFlows(flows, schemaMap);
                    // }
                    // if (!process.argv.includes(SKIP_VALIDATION.examples) && !hasTrueResult) {
                    //   console.log(exampleSets);
                    //   hasTrueResult = await validateExamples(exampleSets, schemaMap);
                    // }
                    // // move to separate files
                    // if (!process.argv.includes(SKIP_VALIDATION.enums) && !hasTrueResult) {
                    //   hasTrueResult = await validateEnumsTags(enums, schemaMap);
                    // }
                    // if (!process.argv.includes(SKIP_VALIDATION.tags) && !hasTrueResult) {
                    //   //@ts-ignore
                    //   hasTrueResult = await validateTags(tags, schemaMap);
                    // }
                    // if (!process.argv.includes(SKIP_VALIDATION.attributes) && !hasTrueResult) {
                    //   hasTrueResult = await validateAttributes(attributes, schemaMap);
                    // }
                    if (hasTrueResult)
                        return [2 /*return*/];
                    if (!hasTrueResult) {
                        examples = schema["examples"];
                        examples = examples[example_set];
                        buildSwagger(base_yaml, tempPath);
                        spec_file = fs.readFileSync(tempPath);
                        spec = js_yaml_1.default.load(spec_file);
                        addEnumTag(spec, schema);
                        GenerateYaml(spec, examples, outputPath);
                        cleanup();
                    }
                    return [3 /*break*/, 10];
                case 9:
                    error_2 = _g.sent();
                    console.log("Error generating build file", error_2);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function cleanup() {
    try {
        fs.unlinkSync(tempPath);
        console.log("Temporary file deleted");
    }
    catch (error) {
        console.error("Error deleting temporary file:", error);
    }
}
function writeSchemaMap(folder, schemaMap) {
    for (var _i = 0, _a = Object.keys(schemaMap); _i < _a.length; _i++) {
        var api = _a[_i];
        var schema_yaml = folder + "/" + api + ".yaml";
        var schmea = js_yaml_1.default.dump(schemaMap[api]);
        fs.writeFileSync(schema_yaml, schmea, "utf8");
    }
}
function buildSwagger(inPath, outPath) {
    try {
        var command = "swagger-cli bundle ".concat(inPath, " --outfile ").concat(outPath, " -t yaml");
        execSync(command, { stdio: "inherit" });
    }
    catch (error) {
        console.error("An error occurred while generating the Swagger bundle:", error);
        process.exit(1);
    }
}
function addEnumTag(base, layer) {
    base["x-enum"] = layer["enum"];
    base["x-tags"] = layer["tags"];
    base["x-flows"] = layer["flows"];
    base["x-examples"] = layer["examples"];
    base["x-attributes"] = layer["attributes"];
    base["x-errorcodes"] = layer["error_codes"];
    base["x-tlc"] = layer["tlc"];
    base["x-featureui"] = layer["feature-ui"];
    base["x-sandboxui"] = layer["sandbox-ui"];
}
function GenerateYaml(base, layer, output_yaml) {
    var output = js_yaml_1.default.dump(base);
    fs.writeFileSync(output_yaml, output, "utf8");
    console.log(output_yaml, "build output");
    var baseData = base["x-examples"];
    for (var _i = 0, _a = Object.keys(baseData); _i < _a.length; _i++) {
        var examplesKey = _a[_i];
        var exampleSet = (baseData[examplesKey] || {}).example_set;
        // delete exampleSet.form;
    }
    var jsonDump = "let build_spec = " + JSON.stringify(base);
    fs.writeFileSync(uiPath, jsonDump, "utf8");
}
function checkMDFiles() {
    var filePath = "./docs";
    if (!fs.existsSync(path.join(filePath)))
        fs.mkdirSync(filePath); //create docs folder if not exists
    var files = fs.readdirSync(filePath);
    var markdownFiles = files.filter(function (file) { return file.endsWith(".md"); });
    return markdownFiles;
}
function readfileWithYaml() {
    var yamlFilePath = path.join("./docs/", "", "index.yaml");
    var yamlData = js_yaml_1.default.load(fs.readFileSync(yamlFilePath, "utf8"));
    return yamlData.filenames;
}
function compareFiles() {
    var mdFiles = checkMDFiles();
    var yamlFiles = readfileWithYaml();
    // Check if the arrays are equal
    var isEqual = JSON.stringify(mdFiles) === JSON.stringify(yamlFiles);
    if (isEqual) {
    }
    else {
        throw new Error("Files at docs/index.yaml doesn't exist");
    }
}
function writeFilenamesToYaml(filenames) {
    // Create an array of YAML links
    var yamlLinks = filenames.map(function (filename) { return "".concat(filename); });
    var yamlData = { filenames: yamlLinks };
    var yamlFilePath = path.join("./docs/", "index.yaml");
    // Convert the data to YAML format and write it to the file
    var yamlString = js_yaml_1.default.dump(yamlData);
    fs.writeFileSync(yamlFilePath, yamlString, "utf8");
}
function buildWrapper(folderName) {
    return __awaiter(this, void 0, void 0, function () {
        var markdownFiles, example_yaml, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    markdownFiles = checkMDFiles();
                    writeFilenamesToYaml(markdownFiles);
                    compareFiles();
                    if (folderName) {
                        example_yaml = fileUtils_1.isBinary ? path.join(path.dirname(process.execPath), "./FORKED_REPO/api/".concat(folderName, "/index.yaml")) : "../FORKED_REPO/api/".concat(folderName, "/index.yaml");
                    }
                    return [4 /*yield*/, getSwaggerYaml("example_set", outputPath)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.buildWrapper = buildWrapper;
