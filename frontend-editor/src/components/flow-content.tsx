import { useRef, useState } from "react";
import { Editable } from "./file-structure";
import { getData } from "../utils/requestUtils";
import React from "react";
import { FlowFileID, flowFolderID } from "../pages/home-page";
import Dropdown from "./horizontal-tab";
import { Disclosure } from "@headlessui/react";
import useEditorToolTip from "../hooks/useEditorToolTip";
import Tippy from "@tippyjs/react";
import { CgMenuMotion } from "react-icons/cg";
import { IoIosArrowDropdown, IoIosArrowDropright } from "react-icons/io";
import { GoRelFilePath } from "react-icons/go";
import { DropTransition } from "./helper-components";
import HorizontalTabBar from "./horizontal-tab";
import {MermaidDiagram} from "../components/ui/mermaid"


//ignore
interface Tag {
  code: string;
  description: string;
  required: string;
  list: {
    code: string;
    description: string;
  }[];
}

// ignore
interface TagData {
  path: string;
  tag: 
  Tag[];
}
//ignore
type TagResponse = Record<string, TagData[]>;

// main component
export function FlowFolderContent({ flowFolder }: { flowFolder: Editable }) {

  const [folderData, setFolderData] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>();
  const [editType, setEditType] = useState<any>(["select an option","flow","steps"]);
  const [selectedEditType, setSelectedEditType] = useState<any>(["flow","steps"]);

// console.log(selectedFolder)
  const reRender = useRef(false);
  async function getflowFolder() {
    try{
    // return
    const data = await getData(flowFolder.path);
    // console.log("myworld")
    setFolderData(data);
    reRender.current = !reRender.current;
    // console.log(data);
    }
    catch(err){
      console.log(err)
    }
  }
  flowFolder.query.getData = getflowFolder;

  React.useEffect(() => {
    getflowFolder();
  }, []);

  const FolderEditable: Editable = {
    name: selectedFolder ?? "",
    path: flowFolder.path + "/" + selectedFolder,
    deletePath: flowFolder.path + "/" + selectedFolder,
    registerID: flowFolder.registerID,
    query: {
      getData: getflowFolder,
      Parent: flowFolder.query.Parent,
      updateParams: { oldName: selectedFolder },
      copyData: async () => {
        const data = await getData(flowFolder.path + "/" + selectedFolder);
        return JSON.stringify(data, null, 2);
      },
    },
  };
  const TagEditable: Editable = {
    name: selectedFolder ?? "",
    path: flowFolder.path + "/" + selectedFolder,
    deletePath: flowFolder.path + "/" + selectedFolder,
    registerID: flowFolder.registerID,
    query: {
      Parent: flowFolder,
      getData: async () => {
        console.log("hello");
      },
    },
  };

  return (
    <>
      <div className="mt-3 ml-3 max-w-full">

      <div className="flex w-full">
        <div className="flex-1">
          <HorizontalTabBar
            items={folderData}
            selectedItem={selectedFolder ?? ""}
            setSelectedItem={setSelectedFolder}
            onOpen={getflowFolder}
            editable={FolderEditable}
          />
        </div>
        <div className="flex-1">
          {/* <HorizontalTabBar
            items={editType}
            selectedItem={editType ?? ""}
            setSelectedItem={setEditType}
            onOpen={getflowFolder}
            editable={FolderEditable}
          /> */}
        </div>
      </div>

        {selectedFolder && selectedFolder !== "" && (
          <TagContent tags={TagEditable} reRender={reRender.current} />
        )}
      </div>
    </>
  );
}

// grandchild component
export function DetailsContent({
  detailData,
  reRender,
  apiName
}: any) {
  const apiToolTip = useEditorToolTip();
  React.useEffect(() => {
    // getTag();
  }, [reRender]);

  return (
    <>
          {apiName == "details" &&
                  detailData.map((element,index)=>
                    <Disclosure>
                      <Disclosure.Button className="flex ml-6 mt-1 w-full px-4 py-2 text-base font-medium text-left text-black bg-gray-200 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 shadow-md hover:shadow-lg">
                      <Tippy {...apiToolTip.tippyProps}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <CgMenuMotion size={20} className="mr-2" />
                  <span>{element.description}</span>
                </div>
                {open ? (
                  <IoIosArrowDropdown size={25} />
                ) : (
                  <IoIosArrowDropright size={25} />
                )}
              </div>
            </Tippy>
                      </Disclosure.Button>
                      <DropTransition>
                        <Disclosure.Panel>
                        <p><MermaidDiagram keys={index} chartDefinition={element.mermaid} /></p>
                        </Disclosure.Panel>
                      </DropTransition>
                      </Disclosure>                 
                       )
                }
    </>
  );
}

export function GenericContent({
  data,
  reRender,
  apiName,
  editable
}: any) {
  const apiToolTip = useEditorToolTip();

  React.useEffect(() => {
    // getTag();
  }, [reRender]);

  return (
    
    <div className="flex ml-6 mt-1 w-full px-4 py-2 text-base font-medium text-left text-black bg-gray-200 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 shadow-md hover:shadow-lg">
      <p> {data}</p>
    </div>
  );
}



// grandchild component
export function StepsContent({
  detailData,
  reRender,
  apiName
}: any) {
  const apiToolTip = useEditorToolTip();

  const details = detailData.details
  delete detailData.details

  console.log(detailData[0]['details'][0]['description'],"detail data")
    

  // const [tagData, setTagData] = useState<TagResponse>();

  // async function getTag() {
  //   const data = await getData(tags.path);
  //   setTagData(data);
  //   reRender = !reRender;
  // }
  // tags.query.getData = getTag;

  React.useEffect(() => {
    // getTag();
  }, [reRender]);

  return (
    <>
          {apiName == "steps" &&
                  detailData.map((element,index)=>
                    <Disclosure>
                      <Disclosure.Button className="flex ml-6 mt-1 w-full px-4 py-2 text-base font-medium text-left text-black bg-gray-200 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 shadow-md hover:shadow-lg">
                      <Tippy {...apiToolTip.tippyProps}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <CgMenuMotion size={20} className="mr-2" />
                  <span>{element.summary}</span>
                  <span className="flex items-end">{element.api}</span>

                </div>
                {open ? (
                  <IoIosArrowDropdown size={25} />
                ) : (
                  <IoIosArrowDropright size={25} />
                )}
              </div>
            </Tippy>
                      </Disclosure.Button>
                      <DropTransition>
                        <Disclosure.Panel>
                          <div className="ml-6 p-2 shadow-inner">
                            <table className="w-full border-collapse table-auto">
                            <tbody>
                              {
                             Object.keys(element).map(function(key,index) {
                             
                             return  key != "details" ?(
                                    <tr>
                              <td className="px-4 py-2 text-left border-b border-gray-200 align-top break-words text-base">
                                {key}
                              </td>
                              <td className="px-4 py-2 text-left border-b border-gray-200 align-top break-words text-base">
                                {JSON.stringify(element[key])}
                              </td>
                            </tr>
                              )
                            : key == 'details'?(
                              <>
                              <tr>
                              <td className="px-4 py-2 text-left border-b border-gray-200 align-top break-words text-base">
                                {key}
                              </td>
                              <td className="px-4 py-2 text-left border-b border-gray-200 align-top break-words text-base">
                             {/* { element[key][0] && <MermaidDiagram chartDefinition={element[key][0]['mermaid']} keys={element[key][0]['mermaid']} /> } */}
                                {element[key][0] && JSON.stringify(element[key][0]['description'])}
                              </td>
                              </tr>
                              <tr>
                              <td className="px-4 py-2 text-left border-b border-gray-200 align-top break-words text-base">
                                {"diagram"}
                              </td>
                              <td className="px-4 py-2 text-left border-b border-gray-200 align-top break-words text-base">
                             { element[key][0] && <MermaidDiagram chartDefinition={element[key][0]['mermaid']} keys={index.toString()} /> }
                                {/* {element[key][0] && JSON.stringify(element[key][0]['description'])} */}
                              </td>
                              </tr>
                            
                           
                            </>
                              // <StepsContent apiName = {apiName} detailData= {element[key]} />
                            ):<></>
                          })
                              }
                              {/* {
                                <StepsContent apiName = {apiName} detailData= {details} />

                              } */}
                       
                              {/* <tr>
                                <td className="px-4 py-2 text-left border-b border-gray-200 align-top break-words text-base">
                                  Summary
                                </td>
                                <td className="px-4 py-2 text-left border-b border-gray-200 align-top break-words text-base">
                                  {element.summary}
                                </td>
                              </tr> */}
                            </tbody>
                            </table>
                        <p><MermaidDiagram keys={index} chartDefinition={element.mermaid} /></p>
                          </div>

                        </Disclosure.Panel>
                      </DropTransition>
                      </Disclosure>                 
                       )
                }



            {/* {tagData &&
              Object.keys(tagData).map((apiName, index) => (
                <TagDisclose
                  key={index}
                  apiName={apiName}
                  data={tagData[apiName]}
                  tagEditable={tags}
                />
              ))} */}
  
    </>
  );
}
// showing summary/details/reference/steps etc
export function TagContent({
  tags,
  reRender,
}: {
  tags: Editable;
  reRender: Boolean;
}) {
  const [tagData, setTagData] = useState<TagResponse>();

  async function getTag() {
    const data = await getData(tags.path);
    setTagData(data);
    reRender = !reRender;
  }
  tags.query.getData = getTag;
  React.useEffect(() => {
    getTag();
  }, [reRender]);

  return (
    <>
      <div className="mt-2 max-w-full">
        <div className="flex w-full">
          <div className="flex-1">
            {tagData &&
              Object.keys(tagData).map((apiName, index) => (
                <TagDisclose
                  key={index}
                  apiName={apiName}
                  data={tagData[apiName]}
                  tagEditable={tags}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

// child component
function TagDisclose({
  apiName,
  data,
  tagEditable,
}: {
  apiName: string;
  data: any
  //  TagData[];
  tagEditable: Editable;
}) {
  const apiToolTip = useEditorToolTip([true,false,false]);

  const apiEditable = { ...tagEditable };
  apiEditable.name = apiName;
  apiEditable.registerID = FlowFileID
  apiEditable.query = {
    getData: tagEditable.query.getData,
    Parent: tagEditable,
    addParams: { type: "flow" },
    deleteParams: {},
    copyData: async () => {
      const copyData: Record<string, TagData[]> = {};
      copyData[apiName] = data;
      return JSON.stringify(copyData, null, 2);
    },
  };
  if (apiEditable.query.deleteParams) {
    apiEditable.query.deleteParams[apiName] = JSON.stringify([]);
  }
  if(apiEditable.query.updateParams){
    apiEditable.query.updateParams = data[apiName]
    console.log("update params triggered")
  }
  apiToolTip.data.current = apiEditable;
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className="flex items-center justify-between mt-3 w-full px-4 py-2 text-base font-medium text-left text-black bg-gray-300 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 shadow-md hover:shadow-lg
          transition duration-300 ease-in-out"
            onContextMenu={apiToolTip.onContextMenu}
          >
            <Tippy {...apiToolTip.tippyProps}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <CgMenuMotion size={20} className="mr-2" />
                  <span>{apiName}</span>
                </div>
                {open ? (
                  <IoIosArrowDropdown size={25} />
                ) : (
                  <IoIosArrowDropright size={25} />
                )}
              </div>
            </Tippy>
          </Disclosure.Button>
          <DropTransition>
            <Disclosure.Panel>

              { apiName == "summary" && <GenericContent data = {data} editable = {tagEditable} />}

              <DetailsContent detailData = {data} reRender = {false} apiName = {apiName} />
{/* 
                {apiName == "details" &&
                  data.map((element,index)=>
                    <Disclosure>
                      <Disclosure.Button>
                      <p>{element.description}</p>
                      <p><MermaidDiagram keys={index} chartDefinition={element.mermaid} /></p>
                      </Disclosure.Button>
                      </Disclosure>                 
                       )
                } */}

              {/* {JSON.stringify(data)}
              </div>} */}
              { apiName == "references" && <GenericContent data = {data} />}
              
              { apiName == "steps" && 
              <StepsContent apiName = {apiName} detailData= {data} />
              
              // <div style={{backgroundColor:"pink"}}>
              // {JSON.stringify(data)}
              // </div>
              }
              {/* <div >
                
              
              </div> */}
            
        
            </Disclosure.Panel>
          </DropTransition>
        </>
      )}
    </Disclosure>
  );
}




