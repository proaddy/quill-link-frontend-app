import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDashboardContext } from './DashboardContext';
// import '../styles/MobLogin.scss'

export default function Folder({activeFolder, folder, handleFolderClick, formClick }) {

  // console.log(activeFolder);
  const deleteFolder = async () => {
    try {
      setError(false);
      setLoading(true);
      if(confirm("Do you want to delete folder?? if yes then all the data inside the folder will be inaccessible")) {
        // console.log("waiting to be deleted", folder._id);
        const allData = await axios.delete(`/api/folders/${folder._id}`);
        console.log("Folder Deleted");
        if (allData){
          try {
            const checkList = await axios.get(`/api/folders/${activeFolder._id}`);
            if(checkList.data && checkList.data.list.includes(folder._id)){
              const response = await axios.patch(`/api/folders/${activeFolder._id}/remove-from-folder`, {itemId : folder._id, itemType: "folder"});
              if (response) {console.log('folder removed from folder')};
            } else {
              const response = await axios.patch(`/api/notebooks/${activeNotebook._id}/rm-from-notebook`, {folderId: folder._id});
              if (response) {console.log('folder removed from notebook')};
            }
          } catch (error) {
            console.log("error", error.message);
            setError(true);
          }
        }
        // console.log(allData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
    setActiveNotebook({...activeNotebook});
  }

  const [folderOpen, setFolderOpen] = useState(folder.open);
  const {darkmode, setActiveNotebook, activeNotebook} = useDashboardContext();

  // subfolders and API call
  var subFolders = folder.list.filter(fol => fol.type === 'folder');

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
            setFoldersList(folderData.filter(ele => ele !== null));
            setLoading(false);
            // console.log(foldersList);
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
        className="group ml-6 flex items-center content-start space-x-2 relative cursor-pointer w-5/6"
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
        <span>{folder.name}</span>
          <div className="relative hidden gap-1 group-hover:flex h-5 items-center p-3 z-10 ml-20">
            {'->'}
            <div className="absolute top-2 left-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-1000">
                <ul className="rounded-lg bg-gray-300">
                  <li className="px-4 py-1 hover:bg-gray-600 hover:text-white rounded-t-lg" onClick={()=>formClick('folder', 'rename')}>Rename</li>
                  <li className="px-4 py-1 hover:bg-gray-600 hover:text-white rounded-b-lg" onClick={deleteFolder}>Delete</li>
                </ul>
              </div>
          </div>
        </div>
      {
        folderOpen && (
            <div className="ml-5">
                {subFolders.length > 0 &&
                  foldersList.map((folder, index)=>{
                      return (
                          <Folder key={index} folder={folder} handleFolderClick={handleFolderClick} formClick={formClick}/>
                      )
                })}
            </div>
        )
      }
    </>
  );
}
