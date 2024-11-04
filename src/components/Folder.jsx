import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDashboardContext } from './DashboardContext';

export default function Folder({ folder, handleFolderClick }) {
  const [folderOpen, setFolderOpen] = useState(folder.open);

  const {darkmode} = useDashboardContext();

  // console.log(folder);

  // subfolders and API call
  var subFolders = folder.list.filter(fol => fol.type === 'folder');
  // console.log(subFolders);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [foldersList, setFoldersList] = useState([]);
  
  const fetchSubFolders = () => {
    // open toggle
    setFolderOpen(!folderOpen);

    ;(async () => {
        try {
            setError(false);
            setLoading(true);
            const folderData = await Promise.all(
                subFolders.map(async (folderID) => {
                    try {
                        const response = await axios.get(`/api/folders/${folderID._id}`);
                        return response.data;
                    } catch (error) {
                        console.log(`Failed to fetch data for folder ID ${folderID._id}`, error);
                        setError(true);
                        return null;
                    }
                })
            )
            setFoldersList(folderData);
            setLoading(false);
            console.log(foldersList);
        } catch (error) {
            console.log("error", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    })();
  };
  

    if(loading) {
        return (
            <div className="flex h-dvh items-center m-auto">
                <h1 className="text-3xl">Loading...</h1>
            </div>
        )
    }

    if(error) {
        return (
            <div className="flex h-dvh items-center m-auto">
                <h1 className="text-3xl">Something Went Wrong...</h1>
            </div>
        )
    }

  return (
    <>
      <div
        className="ml-6 flex items-center space-x-2 relative cursor-pointer"
        onClick={()=>{
          handleFolderClick(folder); 
          fetchSubFolders();
        }}
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
        <span>{folder.name}</span> {/* fol 1.1 */}
      </div>
      {
        folderOpen && (
            <div className="ml-5">
                {subFolders.length > 0 &&
                  foldersList.map((folder, index)=>{
                      return (
                          <Folder key={index} folder={folder} darkmode={darkmode} handleFolderClick={handleFolderClick}/>
                      )
                })}
            </div>
        )
      }
    </>
  );
}
