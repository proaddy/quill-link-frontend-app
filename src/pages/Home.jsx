import { useDashboardContext } from '../components/DashboardContext';
import { useState, useEffect} from 'react';

// components
import Folder from "../components/Folder";
import FileCardList from "../components/FileCardList";
import FormComponent from "../components/FormComponent";
import Header from '../components/Header';

import axios from 'axios';
// require('dotenv').config();
// const backend = process.env.REACT_APP_BACKEND;
const backend = import.meta.env.BACKEND;

export default function Home() {
    const { activeNotebook } = useDashboardContext();
    
    const allFolders = activeNotebook.list;

    const [activeFolder, setactiveFolder] = useState('');
    // let subFiles = [];

    // function to update list of files
    const handleFolderClick = (folder)=>{
        // subFiles = folder.list.filter(fol => fol.type === 'file');
        setactiveFolder(folder);
    }
    
    // console.log(subFiles);
    const [showForm, setShowForm] = useState(false);
    const [type, setType] = useState(false);
    const [action, setAction] = useState(false);

    const formClick = (what, why) => {
        setShowForm(true);
        setType(what);
        setAction(why);
    }
 
    const [searchText, setSearchText] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [foldersList, setFoldersList] = useState([]);

    useEffect(() => {
        ;(async () => {
            try {
                setError(false);
                setLoading(true);
                // if(!allFolders) {return;};
                const folderData = await Promise.all(
                    allFolders.map(async (folderID) => {
                        try {
                            const response = await axios.get(`${backend}/api/folders/${folderID}`);
                            return response.data;
                        } catch (error) {
                            console.log(`Failed to fetch data for folder ID ${folderID}`, error);
                            return null;
                        }
                    })
                )
                // console.log(folderData);
                setFoldersList(folderData.filter(folder => folder !== null));
                setLoading(false);
            } catch (error) {
                console.log("error", error.message);
                setError(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        })();
        // console.log(foldersList);
    }, [activeNotebook]);

    if(loading) {
        return (
            <div className="flex h-svh items-center m-auto">
                <h1 className="text-5xl">Loading...</h1>
            </div>
        )
    }

    if(error) {
        if (!allFolders) {
            return (
                <div className="flex h-svh items-center m-auto">
                    <h1 className="text-5xl">Select notebook...</h1>
                </div>    
            )
        } else {
            return (
                <div className="flex h-svh items-center m-auto">
                    <h1 className="text-5xl">Something Went Wrong...</h1>
                </div>
            )
        }
    } 
    
  return (
    <>
        <FormComponent activeFolder={activeFolder} showForm={showForm} setShowForm={setShowForm} type={type} action={action}/>
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
                    Folders <button onClick={()=>formClick('folder', 'create')}>+</button>
                </h2>
                <hr className="w-[90%] h-[5px] ml-[5%] border-[#c1c1c1]" />
                {/* row */}
                <div className="flex flex-col space-y-1 h-[480px] overflow-auto">
                    {
                        foldersList.map((folder, index) => {
                            return (
                                <Folder activeFolder={activeFolder} key={index} folder={folder} handleFolderClick={handleFolderClick} formClick={formClick}/>
                            )
                        })
                    }
                </div>
            </div>

            {/* right */}
            <div className="w-3/4 h-full rounded-2xl border border-[#626262]">
                <h2 className="flex justify-between px-6 py-2 font-bold">
                    Files <button onClick={()=>formClick('file', 'create')}>+</button>
                </h2>
                <hr className="w-[96%] h-[5px] ml-[2%] border-[#c1c1c1]" />
                {/* notes */}
                <div className="flex ml-[3%] flex-wrap h-[460px] mt-3 overflow-auto">
                    <FileCardList activeFolder={activeFolder} searchText={searchText}/>
                </div>
            </div>
        </div>
    </>
  )
}
