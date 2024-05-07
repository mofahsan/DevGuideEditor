import { FileTypeEditable } from "../../FileTypeEditable";
import { readYamlFile } from "../../fileUtils";
import { convertToYamlWithRefs } from "../../Yaml Converter/yamlRefConvert";
import { overrideYaml } from "../../yamlUtils";
import {
  mergeFlowObjectRecords,
  RecordOfFlowArrays,
  FlowObject,
  flowFromApi,
  flowToNested,
} from "./flowUtils";

type FlowDel = Record<string, FlowObject[] | string>;

export class FlowFileType extends FileTypeEditable {
  static REGISTER_ID = "FLOW_FILE";
  getRegisterID(): string {
    return FlowFileType.REGISTER_ID;
  }
  constructor(path: string, name: string) {
    super(path, name);
  }

  async getData(): Promise<Record<string, FlowObject[]>> {
    return flowFromApi(await readYamlFile(this.yamlPathLong));
  }

  async add(dataToAdd: Record<string, FlowObject[]>) {
    this.setMissingReferences(dataToAdd);
    const data = await this.getData();
    const newData = mergeFlowObjectRecords(data, dataToAdd);
    const yml = flowToNested(newData);
    await overrideYaml(this.yamlPathLong, convertToYamlWithRefs(yml));
  }

  async remove(dataToDel: FlowDel) {
    const data = await this.getData();
    for (const key in dataToDel) {
      const val = dataToDel[key];
      if (data.hasOwnProperty(key)) {
        if (typeof val === "string") {
          delete data[key];
        } else if (Array.isArray(val)) {
          data[key] = data[key].filter((d) => {
            return !val.some((del) => del.path === d.path);
          });
        }
      }
    }
    const yml = flowToNested(data);
    await overrideYaml(this.yamlPathLong, convertToYamlWithRefs(yml));
  }

  async update(
    dataToUpdate: RecordOfFlowArrays | { oldName: string; newName: string }
  ) {
    const data = await this.getData();
    if (
      dataToUpdate.hasOwnProperty("oldName") &&
      dataToUpdate.hasOwnProperty("newName") &&
      !Array.isArray(dataToUpdate.newName) &&
      !Array.isArray(dataToUpdate.oldName)
    ) {
      data[dataToUpdate.newName] = data[dataToUpdate.oldName];
      delete data[dataToUpdate.oldName];
    } else {
      for (const key in dataToUpdate) {
        if (data.hasOwnProperty(key)) {
          data[key] = data[key].map((d) => {
            const updated = dataToUpdate[key].find((u) => u.path === d.path);
            return updated ? updated : d;
          });
        }
      }
    }
    const yml = flowToNested(data);
    await overrideYaml(this.yamlPathLong, convertToYamlWithRefs(yml));
  }

  private setMissingReferences(dataToAdd: Record<string, FlowObject[]>) {
    for (const key in dataToAdd) {
      for (const data of dataToAdd[key]) {
        data.Flow.forEach((e) => {
          if (!e.reference) {
            e.reference = "<PR/Issue/Discussion Links md format text";
          }
          e.list.forEach((l) => {
            if (!l.reference) {
              l.reference = "<PR/Issue/Discussion Links md format text";
            }
          });
        });
      }
    }
  }
}
