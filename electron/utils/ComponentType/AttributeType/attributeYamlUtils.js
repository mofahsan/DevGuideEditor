"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheetsToYAML = exports.updateRows = exports.deleteRows = exports.addRows = exports.getSheets = void 0;
var js_yaml_1 = __importDefault(require("js-yaml"));
function getSheets(yamlData) {
    var sheets = {};
    var obj = js_yaml_1.default.load(yamlData);
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var element = obj[key];
            var list = listDetailedPaths(js_yaml_1.default.dump(element));
            sheets[key] = list;
        }
    }
    return sheets;
}
exports.getSheets = getSheets;
function addRows(data, sheetName, rows) {
    var _a, _b, _c, _d, _e;
    var sheet = (_a = data[sheetName]) !== null && _a !== void 0 ? _a : [];
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var row = rows_1[_i];
        var ob = {
            path: row.path,
            required: (_b = row.required) !== null && _b !== void 0 ? _b : "Optional",
            type: (_c = row.type) !== null && _c !== void 0 ? _c : "String",
            owner: (_d = row.owner) !== null && _d !== void 0 ? _d : "BAP",
            usage: (_e = row.usage) !== null && _e !== void 0 ? _e : "General",
            description: row.description,
        };
        sheet.push(ob);
    }
    return data;
}
exports.addRows = addRows;
/**
 * Removes rows from a specified sheet based on matching attributes.
 *
 * @param data The entire workbook data as an object where each key is a sheet name.
 * @param sheetName The name of the sheet to modify.
 * @param rows The rows to be removed, each containing attributes to match against.
 * @returns Updated workbook data with the rows removed from the specified sheet.
 */
function deleteRows(data, sheetName, rows) {
    // Extract the rows to remove from the input
    var rowsToRemove = rows;
    // Access the data of the specific sheet
    var originalSheetData = data[sheetName];
    // Filter out rows that match any of the paths in rowsToRemove
    var filteredSheetData = originalSheetData.filter(function (sheetRow) {
        return !rowsToRemove.some(function (rowToRemove) { return sheetRow.path === rowToRemove.path; });
    });
    // Update the original data structure with the filtered data
    data[sheetName] = filteredSheetData;
    return data;
}
exports.deleteRows = deleteRows;
function updateRows(data, sheetName, oldRows, newRows) {
    // Check if the specified sheet exists in the data.
    if (!data[sheetName]) {
        console.error("Sheet name \"".concat(sheetName, "\" does not exist."));
        return;
    }
    // Create a map of new rows keyed by 'path' for quick lookup.
    var newRowMap = new Map();
    for (var _i = 0, newRows_1 = newRows; _i < newRows_1.length; _i++) {
        var newRow = newRows_1[_i];
        newRowMap.set(newRow.path, newRow);
    }
    // Prepare a set of paths from oldRows for quick lookup.
    var oldRowPaths = new Set(oldRows.map(function (row) { return row.path; }));
    // Update rows in the specified sheet.
    var updatedRows = data[sheetName].map(function (existingRow) {
        if (oldRowPaths.has(existingRow.path)) {
            // Replace with the new row if it exists in the map; otherwise, keep the existing row.
            return newRowMap.get(existingRow.path) || existingRow;
        }
        return existingRow; // Return existing rows that are not in oldRows.
    });
    // Filter out new rows that are actually new (not just updates).
    var additionalNewRows = newRows.filter(function (row) {
        return !data[sheetName].some(function (existingRow) { return existingRow.path === row.path; });
    });
    // Concatenate the additional new rows to the updated rows array.
    data[sheetName] = updatedRows.concat(additionalNewRows);
    console.log("Rows updated successfully in sheet \"".concat(sheetName, "\"."));
}
exports.updateRows = updateRows;
function sheetsToYAML(sheets) {
    var obj = {};
    console.log(sheets);
    for (var key in sheets) {
        var element = sheets[key];
        obj[key] = convertDetailedPathsToNestedObjects(element);
    }
    console.log("test ", obj);
    return js_yaml_1.default.dump(obj);
}
exports.sheetsToYAML = sheetsToYAML;
function listDetailedPaths(yamlString) {
    // console.log(yamlString);
    try {
        // Parse the YAML string into a JavaScript object
        var obj = js_yaml_1.default.load(yamlString);
        // Initialize an empty array to store the detailed paths
        var detailedPaths = [];
        // Recursive function to explore each key and sub-key
        // Start the recursive exploration
        detailedPaths = exploreObject(obj, "", detailedPaths);
        // Return the array of detailed paths
        return detailedPaths;
    }
    catch (e) {
        console.error("Error parsing YAML or iterating keys:", e);
        return [];
    }
}
function exploreObject(subObj, currentPath, detailedPaths) {
    var _loop_1 = function (key) {
        // Check if it's an own property and not inherited
        if (subObj.hasOwnProperty(key)) {
            // Construct the new path
            var newPath = currentPath ? "".concat(currentPath, ".").concat(key) : key;
            // If the value is an object and not null or an array, check for properties
            if (typeof subObj[key] === "object" &&
                subObj[key] !== null &&
                !Array.isArray(subObj[key])) {
                // Check if the object at this path has the specific properties
                if (["required", "type", "owner", "usage", "description"].every(function (prop) {
                    return subObj[key].hasOwnProperty(prop);
                })) {
                    // Store the detailed information about the path and properties
                    detailedPaths.push({
                        path: newPath,
                        required: subObj[key].required,
                        type: subObj[key].type,
                        owner: subObj[key].owner,
                        usage: subObj[key].usage,
                        description: subObj[key].description,
                    });
                }
                // Recurse into the sub-object
                detailedPaths = exploreObject(subObj[key], newPath, detailedPaths);
            }
        }
    };
    for (var key in subObj) {
        _loop_1(key);
    }
    return detailedPaths;
}
function convertDetailedPathsToNestedObjects(detailedPaths) {
    // Function to safely access nested properties
    function setPath(obj, path, value) {
        var keys = path.split(".");
        var lastKey = keys.pop();
        var lastObj = keys.reduce(function (obj, key) { return (obj[key] = obj[key] || {}); }, obj);
        lastObj[lastKey] = value;
    }
    // Create an empty object to hold the reconstructed structure
    var reconstructedObj = {};
    // Loop through each detailed path object and reconstruct the hierarchy
    detailedPaths.forEach(function (item) {
        setPath(reconstructedObj, item.path, {
            required: item.required,
            type: item.type,
            owner: item.owner,
            usage: item.usage,
            description: item.description,
        });
    });
    // Convert the reconstructed object to YAML
    return reconstructedObj;
}
// (async () => {
//   const d = await readYamlFile(
//     path.resolve(
//       __dirname,
//       "../../../../ONDC-NTS-Specifications/api/cp0/ATTRIBUTES/CREDIT/index.yaml"
//     )
//   );
//   // console.log(d);
//   const li = listDetailedPaths(d);
//   // console.log(li);
//   // const data = convertDetailedPathsToYAML(li);
//   const data = sheetsToYAML({ credit: li });
//   console.log(data);
//   // console.log();
// })();
