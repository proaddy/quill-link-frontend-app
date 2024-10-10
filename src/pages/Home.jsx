import { useDashboardContext } from '../components/DashboardContext';

import Folder from "../components/Folder";
import FileCard from "../components/FileCard";
import FormComponent from "../components/FormComponent";

import { useState} from 'react';

export default function Home() {
    const { darkmode, folderStructure, setFolderStructure } = useDashboardContext();

    const [filesList, setFilesList] = useState([]);

    const [activeFolderId, setActiveFolderId] = useState('');

    // function to update list of files
    const handleFolderClick = (folder)=>{
        const files = folder.list.filter((item)=> item.type === 'file');
        setActiveFolderId(folder.id);
        setFilesList(files)
    }
    
    const [searchText, setSearchText] = useState('');

    // show file, folder, notebook form
    const [showForm, setShowForm] = useState({
        file: false,
        folder: false,
        notebook: false
    });

    const timeOfTheDay = () => {
        const now = new Date();
        const hour = now.getHours();
        if(hour > 4 && hour < 12) {
        return 'morning';
        } else if (hour >= 12 && hour < 18) {
        return 'noon';
        } else if (hour >= 18 && hour < 23) {
        return 'evening';
        } else if (hour >= 23 || hour <= 4) {
        return 'night';
        }
    }

  console.log(timeOfTheDay());

  return (
    <>
        <FormComponent activeFolderId={activeFolderId} showForm={showForm} setShowForm={setShowForm} setFilesList={setFilesList} setFolders={setFolderStructure} folders={folderStructure}/>
        <div id="top" className="flex items-center justify-between p-5">
            <h1 className="text-3xl font-bold flex items-center gap-3">
                Welcome User, Good {timeOfTheDay()}
                <img
                    src={`${timeOfTheDay()}${darkmode ? "-white" : ""}.png`}
                    className="h-10"
                />
            </h1>
            <img
                src={`/circle-user${darkmode ? "-white" : ""}.png`}
                alt="user"
                className="h-10"
            />
          </div>
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
                    folderStructure.filter(e=>{return e.type === 'folder'}).map((e)=>{
                        return (
                        <Folder key={e.id} folder={e} darkmode={darkmode} handleFolderClick={handleFolderClick}/>
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
                    <FileCard fileList={filesList} darkmode={darkmode} searchText={searchText}/>
                </div>
            </div>
        </div>
    </>
  )
}
