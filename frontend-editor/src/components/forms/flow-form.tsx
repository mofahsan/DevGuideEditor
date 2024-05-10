

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
    const onSubmit = async (formData: Record<string, string>) => {
      const body: Record<string, any> = {};
      console.log(formData)
      body[formData.api] = [];
      console.log(body);
      await postData(data.path, body);
      await data.query.getData();
      console.log(data);
      setIsOpen(false);
    };
  console.log("x")
    return (
      <GenericForm
        onSubmit={onSubmit}
        className="w-full mx-auto my-4 p-4 border rounded-lg shadow-blue-500"
      >
        <FormInput name="api" label="summary" />
      </GenericForm>
    );
  }