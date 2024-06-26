import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { readYamlFile } from "./fileUtils";

export async function updateYamlRefComponents(filePath, section, del = false) {
  if (section === "enum" || section === "tags") {
    await updateYamlRef(
      filePath,
      section,
      { $ref: `./${section}/default/index.yaml` },
      del
    );
    return;
  }
  await updateYamlRef(
    filePath,
    section,
    { $ref: `./${section}/index.yaml` },
    del
  );
}
export async function updateYamlRefAttr(filePath, section, del = false) {
  await updateYamlRef(
    filePath,
    section,
    {
      attribute_set: { $ref: `./${section}/index.yaml` },
    },
    del
  );
}

export async function updateYamlRefFlow(filePath, section, del = false) {
  await updateYamlRef(
    filePath,
    section,
    { $ref: `./${section}/index.yaml` },
    del,
    "array"
  );
}

export async function updateYamlRefEnum(filePath, section, del = false) {
  await updateYamlRef(
    filePath,
    section,
    {
      enum_set: { $ref: `./${section}/index.yaml` },
    },
    del
  );
}

export async function updateYamlRefTags(filePath, section, del = false) {
  await updateYamlRef(
    filePath,
    section,
    {
      tags: { $ref: `./${section}/index.yaml` },
    },
    del
  );
}

interface ExampleRef {
  section: string;
  summary: string;
  description: string;
  filePath: string;
}
export async function updateYamlRefExamples(
  exampleRef: ExampleRef,
  del = false
) {
  await updateYamlRef(
    exampleRef.filePath,
    exampleRef.section,
    {
      summary: exampleRef.summary,
      description: exampleRef.description,
      example_set: { $ref: `./${exampleRef.section}/index.yaml` },
    },
    del
  );
}

export async function updateYamlRefExampleDomain(
  filePath: string,
  section: string,
  summary: string,
  description: string,
  exampleName: string,
  del = false
) {
  let refToAdd = [
    {
      summary: summary,
      description: description,
      value: { $ref: `./${section}/${exampleName}.yaml` },
    },
  ];
  if (fs.existsSync(filePath)) {
    let data = yaml.load(await readYamlFile(filePath));
    data = data || {};
    if (data[section]) {
      const existing: {
        summary: string;
        description: string;
        value: { $ref: string };
      }[] = data[section].examples;

      if (existing) {
        const filtered = existing.filter((s) =>
          refToAdd.every((r) => r.value.$ref !== s.value.$ref)
        );
        refToAdd = [...filtered, ...refToAdd];
      }
    }
  }

  await updateYamlRef(
    filePath,
    section,
    {
      examples: refToAdd,
    },
    del
  );
}

async function updateYamlRef(
  filePath,
  section,
  updateLike,
  del = false,
  type?: string
) {
  try {
    const stats = await fs.promises.stat(filePath);
    if (!stats.isFile()) {
      throw new Error(`The specified path (${filePath}) is not a file.`);
    }
    const fileContents = await fs.promises.readFile(filePath, "utf8");

    let data: any = yaml.load(fileContents) ?? {};
    if (type == "array") {
      if (del) {
        data = updateLike;
      } else {
        data = !data.length ? [] : data;
        data.push(updateLike);
      }
    } else {
      if (del) {
        delete data[section];
      } else {
        data[section] = updateLike;
      }
    }

    const newYaml = yaml.dump(data);
    await fs.promises.writeFile(filePath, newYaml, "utf8");
    console.log(`${section} has been updated with new $ref successfully.`);
  } catch (error) {
    console.error("Error updating the YAML file:", error);
  }
}

export async function overrideYaml(filePath, yamlData) {
  try {
    const stats = await fs.promises.stat(filePath);
    if (!stats.isFile()) {
      throw new Error(`The specified path (${filePath}) is not a file.`);
    }
    // const newYaml = yaml.dump(data);
    await fs.promises.writeFile(filePath, yamlData, "utf8");
    console.log(`${filePath} has been updated successfully.`);
  } catch (error) {
    console.error("Error updating the YAML file:", error);
  }
}

// (async () => {
//   updateYamlRefComponents(
//     path.join(__dirname, "../../ONDC-NTS-Specifications/api/cp0/index.yaml"),
//     "new_section",
//     true
//   );
//   // updateYamlRefAttr('./index.yaml', 'new_section');
// })();
