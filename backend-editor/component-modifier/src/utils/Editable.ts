import { deleteFolderSync, createIndexYaml, renameFolder } from "./fileUtils";

export abstract class Editable {
  static REGISTER_ID = "EDITABLE";
  longPath: string; //  
  name: string; // folder name
  folderPath: string;  // folder path
  yamlPathLong: string; // index.yaml  path

  constructor(path, name) {
    this.longPath = path;
    this.name = name;
  }
  async destroy() {
    console.log("Destroying", this.getRegisterID(), this.folderPath);
    await deleteFolderSync(this.folderPath);
  }
  async initIndexYaml(path, removeContent = true) {
    [this.yamlPathLong, this.folderPath] = await createIndexYaml(
      path,
      removeContent
    );
    console.log("YAML Path:", this.yamlPathLong);
  }
  async renameFolder(newName) {
    [this.yamlPathLong, this.folderPath] = await renameFolder(
      this.folderPath,
      newName
    );
    this.name = newName;
  }

  abstract add(something): Promise<any>;
  abstract remove(something): Promise<any>;
  abstract update(something): Promise<any>;
  abstract getData(query: any): Promise<any>;

  async saveData(savePath) {
    throw new Error("Method 'saveData()' must be implemented.");
  }
  abstract getRegisterID(): string;
  async loadData() {
    throw new Error("Method 'loadData()' must be implemented.");
  }
}

exports.Editable = Editable;
