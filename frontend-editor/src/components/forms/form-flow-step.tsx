import React, { useEffect, useState } from "react";
import { FormFacProps } from "./form-factory";
import GenericForm from "./generic-form";
<<<<<<< HEAD
import { getData, patchData } from "../../utils/requestUtils";
=======
import { patchData,getData } from "../../utils/requestUtils";
>>>>>>> 539aa269a2ec89542a27abfd18570a25157c9a0f

import { FormInput, FormTextInput } from "./form-input";
import { toast } from "react-toastify";

import FormSelect from "./form-select";
import FlowPreview from "./flow-preview";
const FormFlowStep = async ({ data, setIsOpen }: FormFacProps) => {
  let defaultValue = {};
  const [showJsonField, setShowJsonField] = useState(false);
  const [exampleArray, setexampleArray] = useState([false]);


  useEffect(()=>{
    fetchExamples()
  },[])
  let detail
  const handleButtonClick = () => {
    setShowJsonField(!showJsonField);
  };
  if (
    data.query.updateParams &&
    data.query.updateParams?.type === "edit" &&
    data.query.updateParams?.data?.length
  ) {
     detail =
      data.query.updateParams?.data[data.query.updateParams?.index];

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
  async function fetchExamples(){
    const path = data?.path?.replace("flows","examples")
    const examples = await getData(path)
    console.log(examples)

    const exampleArray = examples[detail?.api].map((element)=> {
      return {
        name:element.summary,
          json: element.exampleJson,
          ref : element['$ref']
      }
      // return element.summary
      
    }

  )
    setexampleArray(exampleArray)

  }

  const selectData = data.query.updateParams?.data[data.query.updateParams?.index].example.value.$ref;
  
  let selectOptions = selectData.replace("../../", "/");
  const newPath = data.path.split('/');
  const newPathOptions = newPath[0] + selectOptions;
  let path = newPathOptions.split('/');
  path.pop();
  path.pop();
  const str = path.join("/")
  const res = await getData(str)

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
      details: {
        description: formData.description,
        mermaid: formData.mermaid,
      },
    };

    delete payload?.description;
    delete payload?.mermaid;

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
          <FormInput name={`example`} label={`Example`} strip={false} />
          <FormSelect
            register={"Select"}
            name={"Example Drop-down"}
            label={"Example Dropdown"}
<<<<<<< HEAD
            options={res}
            api={`api`}
=======
            options={exampleArray}
>>>>>>> 539aa269a2ec89542a27abfd18570a25157c9a0f
            errors={"Error"}
          />
        </GenericForm>
      )}
      <div className=" relative">
        {!showJsonField && (
          <button
            onClick={handleButtonClick}
            className=" absolute right-3 bottom-8 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Preview
          </button>
        )}
      </div>
      {showJsonField && (
        <>
          <div className=" font-medium">Preview</div>
          <FlowPreview />
        </>
      )}
    </div>
  );
};

export default FormFlowStep;
