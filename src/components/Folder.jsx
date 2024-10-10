import React from "react";
import { useState } from "react";

export default function Folder({ darkmode, folder, handleFolderClick }) {
  const [folderOpen, setFolderOpen] = useState(folder.open);

  const toggleOpen = () => {setFolderOpen(!folderOpen)};

  return (
    <>
      <div
        className="ml-6 flex items-center space-x-2 relative cursor-pointer"
        onClick={()=>{handleFolderClick(folder); toggleOpen();}}
      >
        <img
          src={`/folder-arr${darkmode ? "-white" : ""}.png`}
          alt="arrow"
          className={`h-3 ${folderOpen ? "-rotate-90" : ""}`}
        />
        <img
          src={`/folder${darkmode ? "-white" : ""}.png`}
          alt="folder"
          className="h-4"
        />
        <span>{folder.name}</span>
      </div>
      {
        folderOpen && (
            <div className="ml-5">
                {folder.list.length > 0 &&
                  folder.list.filter(e=>{return e.type === 'folder'}).map((folder)=>{
                      return (
                          <Folder key={folder.id} folder={folder} darkmode={darkmode} handleFolderClick={handleFolderClick}/>
                      )
                })}
            </div>
        )
      }
    </>
  );
}
