import { close } from "fs";
import { Editable } from "./Editable";
import { EditableRegistry } from "./EditableRegistry";
import { FileTypeEditable } from "./FileTypeEditable";
import logger from "../utils/logger"

export interface UpdateObj {
  oldName: string;
  newName: string;
}

export abstract class folderTypeEditable extends Editable {
  childrenEditables: Editable[];
  allowedList: string[];
  constructor(path, name) {
    super(path, name);
    this.childrenEditables = [];
  }
  /**
   * Adds a new editable to the childrenEditables array.
   * @param {Object} newEditable - The new editable object to add.
   * @param {string} newEditable.ID - The unique identifier for the editable.
   * @param {string} newEditable.name - The name of the editable.
   */
  async add(newEditable: { ID: string; name: string }) {
    logger.info(this.childrenEditables.map((s) => s.name));
    if (this.childrenEditables.map((s) => s.name).includes(newEditable.name)) {
      throw new Error("Editable Already Exists!");
    }
    this.childrenEditables.push(
      await EditableRegistry.create(
        newEditable.ID,
        this.longPath + `/${newEditable.name}`,
        newEditable.name
      )
    );
  }
  /**
   * Adds a new editable to the childrenEditables array.
   * @param {Object} deleteTarget - The new editable object to delete.
   */
  async remove(deleteTarget: { folderName: string }) {
    logger.info("DELETING", deleteTarget);
    const target = this.childrenEditables.find(
      (s) => s.name === deleteTarget.folderName
    );
    this.childrenEditables = this.childrenEditables.filter((s) => s !== target);
    // logger.info(target);
    await target.destroy();
  }

  async update(update: UpdateObj) {
    logger.info("PATCHING", update);
    const target = this.childrenEditables.find(
      (s) => s.name === update.oldName
    );
    try {
      await target.renameFolder(update.newName);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  findParent(id, name, first): Editable | string {
    const searchChildEditable = (editable: Editable) => {
      if (editable instanceof FileTypeEditable) {
        return null;
      }
      if (!(editable instanceof folderTypeEditable)) {
        return;
      }
      for (const childEditable of editable.childrenEditables) {
        if (
          childEditable.getRegisterID() === id &&
          childEditable.name === name
        ) {
          return editable;
        }
        const target = searchChildEditable(childEditable);
        if (target) {
          return target;
        }
      }
      return null;
    };
    if (first.getRegisterID() === id && first.name === name) {
      return "-1";
    }
    const target = searchChildEditable(first);
    return target;
  }

  getTarget(id, name, first): Editable {
    const searchChildEditable = (editable: Editable) => {
      // logger.info(editable.getRegisterID(), editable.name);
      if (editable.getRegisterID() === id && editable.name === name) {
        return editable;
      }
      if (
        editable instanceof FileTypeEditable ||
        !(editable instanceof folderTypeEditable)
      ) {
        return null;
      }

      for (const childEditable of editable.childrenEditables) {
        logger.info(
          "ITERATING: ",
          childEditable.getRegisterID(),
          childEditable.name
        );
        const target = searchChildEditable(childEditable);
        if (target) {
          logger.info("FOUND!");
          return target;
        }
      }
      logger.info("ITERATION FAILED!");
      return null;
    };
    const target = searchChildEditable(first);
    if (!target) {
      logger.info("NOT FOUND!");
      throw new Error("Editable Not Found!");
    }
    return target;
  }
}
