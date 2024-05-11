import React from "react";
import AttributesTable from "./attribute-table";
import { Editable } from "./file-structure";
import {
  AttributeFolderID,
  EnumFolderID,
  TagFolderID,
  flowFolderID
  
} from "../pages/home-page";

import { EnumContent, EnumFolderContent } from "./EnumContent";
import { TagsFolderContent } from "./tag-content";
import {FlowFolderContent} from "./flow-content"

export function MainContent({
  activeEditable,
}: {
  activeEditable: Editable | undefined;
}) {
  if (!activeEditable) return <></>;
  return (
    <>
      {activeEditable?.registerID === AttributeFolderID && (
        <AttributesTable attribute={activeEditable} />
      )}
      {activeEditable?.registerID === EnumFolderID && (
        <EnumFolderContent enumFolder={activeEditable} />
      )}
      {activeEditable?.registerID === TagFolderID && (
        <TagsFolderContent tagFolder={activeEditable} />
      )}
      {/* activeEditable is nothing but the object containg information about current right side section
      that is opened  */}
      {activeEditable?.registerID === flowFolderID && (
        <FlowFolderContent flowFolder={activeEditable} />
      )}
    </>
  );
}
