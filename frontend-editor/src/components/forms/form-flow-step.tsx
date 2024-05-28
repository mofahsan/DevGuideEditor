import React, { useEffect, useState } from "react";
import { FormFacProps } from "./form-factory";
import GenericForm from "./generic-form";
import { patchData, getData } from "../../utils/requestUtils";
import { FormInput, FormTextInput } from "./form-input";
import { toast } from "react-toastify";

import FormSelect from "./form-select";
import FlowPreview from "./flow-preview";
import { MermaidDiagram } from "../ui/mermaid";
const FormFlowStep = ({ data, setIsOpen }: FormFacProps) => {
  let defaultValue: any = {};
  const [showJsonField, setShowJsonField] = useState(false);
  const [exampleArray, setexampleArray] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [exampleDefultValue, setExampleDefaultValue] = useState("");
  const [mermaidPreview, setMermaidPreview] = useState(false);
  useEffect(() => {
    fetchExamples();
  }, []);

  let detail;
  const handlePreviewButtonClick = () => {
    if (!selectedValue) {
      setJsonData(exampleArray[0].value);
    } else {
      const singleExample = exampleArray.find(
        (element: any) => element.$ref === selectedValue
      );
      setJsonData(singleExample?.value);
    }
    setShowJsonField(!showJsonField);
  };

  if (
    data.query.updateParams &&
    data.query.updateParams?.type === "edit" &&
    data.query.updateParams?.data?.length
  ) {
    detail = data.query.updateParams?.data[data.query.updateParams?.index];

    defaultValue = {
      summary: detail?.summary || "",
      reference: detail?.reference || "",
      api: detail?.api || "",
      description: detail?.details[0]?.description || "",
      mermaid: detail?.details[0]?.mermaid || "",
      example: JSON.stringify(detail?.example),
    };
  }

  // fetch examples
  async function fetchExamples() {
    const path = data?.path?.replace("flows", "examples").split("/");
    path.pop();
    let newPath = path.join("/");
    const examples = await getData(newPath, { type: "reference" });
    // const exampleArray = examples[detail?.api].map((element) => {
    //   // return { name: element.summary, json: element.exampleJson };
    //   return { name: element };
    // });
    let exampleField =
      data.query.updateParams?.data[data.query.updateParams?.index].example;
    setexampleArray(examples.refs);

    //Find example default value from example api and set it
    let exampleDefault = examples?.refs.find(
      (element: any) => element.$ref === exampleField.value.$ref
    );
    setExampleDefaultValue(exampleDefault?.$ref);
    setSelectedValue(exampleDefault?.$ref);
  }

  const onSubmit = async (formData: Record<string, string>) => {
    if (!formData?.summary) {
      toast.error("summary needed");
      return;
    }

    if (!formData?.reference) {
      toast.error("reference needed");
      return;
    }

    if (!formData?.api) {
      toast.error("api needed");
      return;
    }

    if (!formData?.description) {
      toast.error("description needed");
      return;
    }

    if (!formData?.mermaid) {
      toast.error("mermaid needed");
      return;
    }

    let updatedPayload = [];
    const payload: any = {
      ...formData,
      example: { value: { $ref: formData.dropDown } },
      details: [
        {
          description: formData.description,
          mermaid: formData.mermaid,
        },
      ],
    };
    // delete payload?.description;
    // delete payload?.mermaid;
    delete payload?.dropDown;

    if (
      data.query.updateParams &&
      data.query.updateParams?.type === "edit" &&
      data.query.updateParams?.data?.length
    ) {
      updatedPayload = data.query.updateParams?.data;
      updatedPayload[data.query.updateParams?.index] = payload;
    } else if (
      data.query.updateParams &&
      data.query.updateParams?.type === "new"
    ) {
      updatedPayload = data.query.updateParams?.data;
      updatedPayload.push(payload);
    }

    try {
      await patchData(data.path, {
        steps: updatedPayload,
      });
      await data.query.getData();
      setIsOpen(false);
    } catch (error) {
      console.log({ error });
      setIsOpen(false);
    }
  };
  function handleMermaidPreviewButtonClick() {
    setMermaidPreview(!mermaidPreview);
  }
  return (
    <div>
      {!showJsonField && (
        <GenericForm
          onSubmit={onSubmit}
          className="w-full mx-auto my-4 p-4 border rounded-lg shadow-blue-500"
          defaultValues={defaultValue}
        >
          <FormInput name={`summary`} label={`Summary`} strip={false} />
          <FormInput name={`reference`} label={`Reference`} strip={false} />
          <FormInput name={`api`} label={`Api`} strip={false} />
          <FormInput name={`description`} label={`Description`} strip={false} />
          <FormTextInput name={`mermaid`} label={`Mermaid`} strip={false} />
          <button
            type="button"
            onClick={handleMermaidPreviewButtonClick}
            className="bottom-8 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            {mermaidPreview ? "Close Mermaid Preview" : "Mermaid Preview"}
          </button>

          {
            //show memaid preview
            mermaidPreview ? (
              <MermaidDiagram
                chartDefinition={defaultValue.mermaid}
                keys={""}
              />
            ) : (
              <></>
            )
          }
          {/* <FormInput name={`example`} label={`Example`} strip={false} /> */}
          <FormSelect
            name={"dropDown"}
            label={"Example Dropdown"}
            options={exampleArray.map((element: any) => element.$ref)}
            errors={"Error"}
            setSelectedValue={setSelectedValue}
            defaultValue={exampleDefultValue}
          />
          <button
            type="button"
            onClick={handlePreviewButtonClick}
            className="bottom-8 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Example Preview
          </button>
        </GenericForm>
      )}
      {showJsonField && (
        <>
          <div className=" font-medium">Preview</div>

          <FlowPreview
            DefaultCode={
              typeof jsonData === "string"
                ? jsonData
                : JSON.stringify(jsonData, null, 2)
            }
          />
        </>
      )}
    </div>
  );
};

export default FormFlowStep;
