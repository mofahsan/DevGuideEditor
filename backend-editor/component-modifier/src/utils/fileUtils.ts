import fs from "fs";
import fse = require("fs-extra");
const fs_p = require("fs").promises;
import path from "path";
import {rootPath} from "electron-root-path"
import logger from "../utils/logger"

import $RefParser from "@apidevtools/json-schema-ref-parser";

export const isBinary = rootPath.split(".").pop() === "app";

export const binaryPathResolver = (binaryPath,normalPath)=>{
  const computedPath =  isBinary? path.join(rootPath,"../", binaryPath) : normalPath
  return computedPath
}

export async function loadYamlWithRefs(filePath) {
  try {
    const schema = await $RefParser.dereference(filePath);
    return schema;
  } catch (error) {
    logger.error("Error parsing schema:", error);
  }
}

export async function createIndexYaml(
  relativeFolderPath,
  removeContent = true
) {
  try {
  const folderPath = isBinary? relativeFolderPath : path.join(__dirname, relativeFolderPath);
  logger.info("Resolved folder path:", folderPath);
  const indexYamlPath = path.join(folderPath, "index.yaml");
  const structure = "";

  if (fs.existsSync(indexYamlPath) && removeContent) {
    logger.info("index.yaml already exists, deleting it...");
    fs.unlinkSync(indexYamlPath);
  } else if (fs.existsSync(indexYamlPath)) {
    logger.info("index.yaml already exists, not deleting it...");
    return [indexYamlPath, folderPath];
  }
    if (!fs.existsSync(folderPath)) {
      logger.info("Folder does not exist, creating it...");
      await fs_p.mkdir(folderPath, { recursive: true, mode: 0o700 });
    }
    await fs_p.writeFile(indexYamlPath, structure, "utf8");
    logger.info("index.yaml created successfully!");
    return [indexYamlPath, folderPath];
  } catch (err) {
    logger.error("Error creating index.yaml:", err);
  }
}
export async function renameFolder(folderPath: string, newName: string) {
  const parentDir = path.dirname(folderPath);
  const newFolderPath = path.join(parentDir, newName);
  logger.info("Old folder path:", folderPath);
  logger.info("New folder path:", newFolderPath);
  try {
    await fs.promises.access(newFolderPath);
    throw new Error("Folder with the new name already exists!");
  } catch (e) {
    if (e.code === "ENOENT") {
      // Folder does not exist, proceed with renaming
      await fs.promises.rename(folderPath, newFolderPath);
      logger.info(`Folder renamed successfully to ${newName}`);
      return [newFolderPath + "/index.yaml", newFolderPath];
    } else {
      throw e;
    }
  }
}
export async function deleteFile(filePath) {
  try {
    await fs_p.unlink(filePath);
    logger.info("File deleted successfully!");
  } catch (err) {
    logger.error("Error deleting file:", err);
  }
}
// Function to delete a folder synchronously at a given path
export async function deleteFolderSync(folderPath) {
  try {
    await fs.promises.rm(folderPath, { recursive: true, force: true });
    logger.info("Folder successfully deleted");
  } catch (error) {
    logger.error("Error deleting the folder:", error);
  }
}
export async function overwriteFolder(source: string, target: string) {
  try {
    await fse.ensureDir(target);
    await fse.emptyDir(target);
    await copyDir(source, target);
    logger.info("Folder overwritten successfully");
  } catch (error) {
    logger.error("Error overwriting the folder:", error);
  }
}

export async function readYamlFile(filePath: string) {
  try {
    const fileData = await fs_p.readFile(filePath, "utf8");
    return fileData;
  } catch (err) {
    logger.error("Error reading YAML file:", err);
    throw err; // Rethrow the error for caller to handle if needed
  }
}
export async function copyDir(
  src,
  dest,
  ignoreFiles = [
    "node_modules",
    ".git",
    "package.json",
    "package-lock.json",
    "README.md",
  ]
) {
  src = path.resolve(__dirname, src);
  dest = path.resolve(__dirname, dest);
  await fs_p.mkdir(dest, { recursive: true });
  const files = await fs_p.readdir(src);
  for (const file of files) {
    if (ignoreFiles.includes(file)) {
      logger.info(`Ignoring file: ${file}`);
      continue;
    }
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = await fs_p.stat(srcPath);
    if (stat.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs_p.copyFile(srcPath, destPath);
    }
  }
}

export async function ValidateJsonSchema(jsonSchema: Record<string, any>) {
  try {
    const schema = await JSON.parse(JSON.stringify(jsonSchema));
    return true;
  } catch (error) {
    logger.error("Error parsing schema:", error);
    return false;
  }
}

// // Example usage:
// const sourceFilePath = "../../ONDC-NTS-Specifications/api/cp0";
// const destinationFilePath = "../history/copy";
// copyDir(sourceFilePath, destinationFilePath);
// logger.info(__dirname);

// Example usage:
// const sourceFilePath = "../../ONDC-NTS-Specifications/api/cp0/index.yaml";
// const destinationFilePath = "../../ONDC-NTS-Specifications/api/cp1/index.yaml";
// copyYamlFile(sourceFilePath, destinationFilePath);

// (async () => {
//   const p = "../../../ONDC-NTS-Specifications/examples/on-demand/index.yaml";
//   const data = await loadYamlWithRefs(path.resolve(__dirname, p));
//   logger.info(JSON.stringify(data, null, 2));
//   // try {
//   //   const relativeFolderPath = "../../ONDC-NTS-Specifications/api/cp0";
//   //   const structure = await getFileStructureRelative(relativeFolderPath);
//   //   logger.info("File structure:", structure);
//   // } catch (err) {
//   //   logger.error("Error testing getFileStructureRelative:", err);
//   // }
// })();
