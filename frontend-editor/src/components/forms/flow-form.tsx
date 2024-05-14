import React, { useContext, useEffect, useState } from "react";
import { Editable } from "../file-structure";
import AutoCompleteInput, { AutoCompleteOption } from "./auto-complete-input";
import FormInput from "./form-input";
import GenericForm from "./generic-form";
import { getData, patchData, postData } from "../../utils/requestUtils";
import { DataContext } from "../../context/dataContext";
import { FormFacProps } from "./form-factory";
import { FieldValues } from "react-hook-form";
import FormSelect from "./form-select";
import { EnumFileId } from "../../pages/home-page";

export function SummaryForm({
  data,
  setIsOpen,
  editState,
}: {
  data: Editable;
  setIsOpen: any;
  editState: boolean;
}) {
  let detailValues = {};

  if (data.query.updateParams && data.query.updateParams?.data) {
    detailValues = { [data.name]: data.query.updateParams?.data };
  }

  const onSubmit = async (formData: Record<string, string>) => {
    const body: Record<string, any> = {};
    await patchData(data.path, formData);
    await data.query.getData();
    console.log(data);
    setIsOpen(false);
  };

  return (
    <GenericForm
      onSubmit={onSubmit}
      className="w-full mx-auto my-4 p-4 border rounded-lg shadow-blue-500"
      defaultValues={detailValues}
    >
      <FormInput name={data.name} label={data.name} />
    </GenericForm>
  );
}
