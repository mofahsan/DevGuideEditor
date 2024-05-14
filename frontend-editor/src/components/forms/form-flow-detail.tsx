import React from "react";
import { FormFacProps } from "./form-factory";
import GenericForm from "./generic-form";
import FormInput from "./form-input";
import { patchData } from "../../utils/requestUtils";


const FormFlowDetail = ({ data, setIsOpen }: FormFacProps) => {
  let defaultValue = {};
  if (
    data.query.updateParams &&
    data.query.updateParams?.type === "edit" &&
    data.query.updateParams?.data?.length
  ) {
    const detail =
      data.query.updateParams?.data[data.query.updateParams?.index];

    defaultValue = {
      description: detail?.description,
      mermaid: detail?.mermaid,
    };
  }

  const onSubmit = async (formData: Record<string, string>) => {
    let updatedPayload = [];
    if (
      data.query.updateParams &&
      data.query.updateParams?.type === "edit" &&
      data.query.updateParams?.data?.length
    ) {
      updatedPayload = data.query.updateParams?.data;
      updatedPayload[data.query.updateParams?.index] = formData;
    } else if (
      data.query.updateParams &&
      data.query.updateParams?.type === "new"
    ) {
      updatedPayload = data.query.updateParams?.data;
      updatedPayload.push(formData);
    }

    try {
      await patchData("components/flows/health-insurance", {
        details: updatedPayload,
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
      <GenericForm
        onSubmit={onSubmit}
        className="w-full mx-auto my-4 p-4 border rounded-lg shadow-blue-500"
        defaultValues={defaultValue}
      >
        <FormInput name={`description`} label={`Description`} strip={false} />
        <FormInput name={`mermaid`} label={`Mermaid`} strip={false} />
      </GenericForm>
    </div>
  );
};

export default FormFlowDetail;
