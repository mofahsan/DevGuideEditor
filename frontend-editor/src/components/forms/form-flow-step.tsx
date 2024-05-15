import React from "react";
import { FormFacProps } from "./form-factory";
import GenericForm from "./generic-form";
import { patchData } from "../../utils/requestUtils";
import {FormInput, FormTextInput} from "./form-input";
import { toast } from "react-toastify";

const FormFlowStep = ({ data, setIsOpen }: FormFacProps) => {
  let defaultValue = {};
  if (
    data.query.updateParams &&
    data.query.updateParams?.type === "edit" &&
    data.query.updateParams?.data?.length
  ) {
    const detail =
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

  const onSubmit = async (formData: Record<string, string>) => {

    if(!formData?.summary){
      toast.error('summary needed')
      return;
    }

    if(!formData?.reference){
      toast.error('reference needed')
      return;
    }

    if(!formData?.api){
      toast.error('api needed')
      return;
    }

    if(!formData?.description){
      toast.error('description needed')
      return;
    }

    if(!formData?.mermaid){
      toast.error('mermaid needed')
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
      </GenericForm>
    </div>
  );
};

export default FormFlowStep;