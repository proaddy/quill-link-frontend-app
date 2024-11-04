import { useDashboardContext } from '../components/DashboardContext';

import Folder from "../components/Folder";
import FileCard from "../components/FileCard";
import FormComponent from "../components/FormComponent";

import { useState, useEffect } from 'react';

import Header from '../components/Header';

import axios from 'axios';

export default function Home() {
    const { activeNotebook } = useDashboardContext();
    
    const allFolders = activeNotebook.list;

    const [activeFolder, setactiveFolder] = useState('');
    let subFiles = [];

    // function to update list of files
    const handleFolderClick = (folder)=>{
        subFiles = folder.list.filter(fol => fol.type === 'file');
        // console.log(subFiles);
        setactiveFolder(folder);
    }
    
    const [searchText, setSearchText] = useState('');

    // show file, folder, notebook form
    const [showForm, setShowForm] = useState({
        file: false,
        folder: false,
        notebook: false
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [foldersList, setFoldersList] = useState([]);

    useEffect(() => {
        ;(async () => {
            try {
                setError(false);
                setLoading(true);
                const folderData = await Promise.all(
                    allFolders.map(async (folderID) => {
                        try {
                            const response = await axios.get(`/api/folders/${folderID}`);
                            return response.data;
                        } catch (error) {
                            console.log(`Failed to fetch data for folder ID ${folderID}`, error);
                            return null;
                        }
                    })
                )
                setFoldersList(folderData);
                setLoading(false);
            } catch (error) {
                console.log("error", error);
                setError(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        })();
    }, [activeNotebook]);

    if(loading) {
        return (
            <div className="flex h-svh items-center m-auto">
                <h1 className="text-5xl">Loading...</h1>
            </div>
        )
    }

    if(error) {
        return (
            <div className="flex h-svh items-center m-auto">
                <h1 className="text-5xl">Something Went Wrong...</h1>
            </div>
        )
    }

  return (
    <>
        {/* <FormComponent activeFolderId={activeFolderId} showForm={showForm} setShowForm={setShowForm} setFilesList={setFilesList} setFolders={setFolderStructure} folders={folderStructure}/> */}
        <Header/>
        <input
            className="border border-[#626262] bg-[#ff] w-[95%] h-10 rounded-lg self-center p-3"
            type="text"
            placeholder="🔍 Enter search keyword, search notes, keywords, etc."
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
        />
        <hr className="w-[96%] self-center h-[1px] border-[#a1a1a1] mt-4" />

        {/* notes */}
        <div className="flex p-6 space-x-8 h-full">
            {/* left */}
            <div className="w-1/2 h-full rounded-2xl border border-[#626262]">
                <h2 className="flex justify-between px-6 py-2 font-bold">
                    Folders <button onClick={()=>setShowForm({file: false, folder: true, notebook: false})}>+</button>
                </h2>
                <hr className="w-[90%] h-[5px] ml-[5%] border-[#c1c1c1]" />
                {/* row */}
                <div className="flex flex-col space-y-1 h-[480px] overflow-auto">
                    {
                        foldersList.map((folder, index) => {
                            return (
                                <Folder key={index} folder={folder} handleFolderClick={handleFolderClick}/>
                            )
                        })
                    }
                </div>
            </div>

            {/* right */}
            <div className="w-3/4 h-full rounded-2xl border border-[#626262]">
                <h2 className="flex justify-between px-6 py-2 font-bold">
                    Files <button onClick={()=>setShowForm({file: true, folder: false, notebook: false})}>+</button>
                </h2>
                <hr className="w-[96%] h-[5px] ml-[2%] border-[#c1c1c1]" />
                {/* notes */}
                <div className="flex ml-[3%] flex-wrap h-[460px] mt-3 overflow-auto">
                    <FileCard activeFolder={activeFolder} searchText={searchText}/>
                </div>
            </div>
        </div>
    </>
  )
}
