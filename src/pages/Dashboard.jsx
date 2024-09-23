import { useEffect, useState } from "react";

import notebook from '../data/notebook.json'
import folder_structure from '../data/folder_structure.json'
// console.log(folder_structure);
import Folder from "../components/Folder";
import FileCard from "../components/FileCard";
import { list } from "postcss";
import FormComponent from "../components/FormComponent";

export default function Dashboard() {
  const [darkmode, setDarkmode] = useState(false); // useful because when toggle it changes/updates the UI
  const [pageSelect, setPageSelect] = useState("home"); // pages can be home, favourite, notification, archive, trash

  const [filesList, setFilesList] = useState([]);
  const [folders, setFolders] = useState(folder_structure);

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

  useEffect(() => {
    // console.log(darkmode);
    var r = document.querySelector(":root");
    if (darkmode) {
      r.style.setProperty("--background", "#1a2526");
      r.style.setProperty("--text-color", "#ffffff");
      r.style.setProperty("--accent-col", "#1E5E7D");
    } else {
      r.style.setProperty("--background", "#ffffff");
      r.style.setProperty("--text-color", "#000000");
      r.style.setProperty("--accent-col", "#A3D1F1");
    }
  }, [darkmode]);
  return (
    <>
      <FormComponent activeFolderId={activeFolderId} showForm={showForm} setShowForm={setShowForm} setFilesList={setFilesList} filesList={filesList} setFolders={setFolders} folders={folders}/>
      <div className="dashboard-body flex">

        {/* Left component */}
        <div className="w-1/5 h-screen relative flex flex-col">
          <span className="text-white flex items-center font-bold text-xl">
            <img src="/logo-website.png" alt="logo" className="h-8 m-5 mr-3" />
            QuillLink
          </span>
          <ul className="flex flex-col gap-4 ml-10 mt-6">
            <li className="cursor-pointer flex font-bold items-center" onClick={()=>setPageSelect('home')}>
              <img
                className="h-6 mr-5"
                src={`/home-${pageSelect === "home" ? "grad" : "white"}.png`}
                alt="home"
              />
              <span
                className={
                  pageSelect !== "home"
                    ? "text-white"
                    : "bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent"
                }
              >
                Home
              </span>
            </li>
            {/* <li className="cursor-pointer flex font-bold items-center" onClick={()=>setPageSelect('favourite')}>
              <img
                className="h-6 mr-5"
                src={`/heart-${
                  pageSelect === "favourite" ? "grad" : "white"
                }.png`}
                alt="heart"
              />
              <span
                className={
                  pageSelect !== "favourite"
                    ? "text-white"
                    : "bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent"
                }
              >
                Favourites
              </span>
            </li> */}
            {/* <li className="cursor-pointer flex font-bold items-center" onClick={()=>setPageSelect('notification')}>
              <img
                className="h-6 mr-5"
                src={`/bell-${
                  pageSelect === "notification" ? "grad" : "white"
                }.png`}
                alt="bell"
              />
              <span
                className={
                  pageSelect !== "notification"
                    ? "text-white"
                    : "bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent"
                }
              >
                Notification
              </span>
            </li> */}
            <li className="cursor-pointer flex font-bold items-center" onClick={()=>setPageSelect('archive')}>
              <img
                className="h-6 mr-5"
                src={`/archive-${
                  pageSelect === "archive" ? "grad" : "white"
                }.png`}
                alt="archive"
              />
              <span
                className={
                  pageSelect !== "archive"
                    ? "text-white"
                    : "bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent"
                }
              >
                Archive
              </span>
            </li>
            <li className="cursor-pointer flex font-bold items-center" onClick={()=>setPageSelect('trash')}>
              <img
                className="h-6 mr-5"
                src={`/trash-${pageSelect === "trash" ? "grad" : "white"}.png`}
                alt="trash"
              />
              <span
                className={
                  pageSelect !== "trash"
                    ? "text-white"
                    : "bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent"
                }
              >
                Trash
              </span>
            </li>
            <li
              className="cursor-pointer flex font-bold items-center text-white"
              onClick={() => setDarkmode(!darkmode)}
            >
              <img
                className={`h-6 mr-5 ${darkmode && "-scale-x-100"}`}
                src={`/toggle-${darkmode ? "grad" : "white"}.png`}
                alt="toggle"
              />
              Dark Mode
            </li>
          </ul>
          <hr className="w-[80%] h-[1px] self-center border-none mt-6 bg-gray-500" />
          <ul className="flex flex-col gap-4 mt-8 ml-10 overflow-x-hidden h-[18rem]">
            <li className="cursor-pointer flex font-bold items-center">
              <img src="/notebook-grad.png" className="h-6 mr-5" />
              <span className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">
                Notebook
              </span>
            </li>
            {
              notebook.map((e, i)=>{
                return (
                  <li key={i} className="cursor-pointer flex font-bold items-center">
                    <img src="/notebook-white.png" className="h-6 mr-5" />
                    <span className="text-white">
                      {e.name}
                    </span>
                  </li>
                )
              })
            }
          </ul>
          <button className="self-center mb-5 w-3/5 h-10 text-white bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] rounded-lg font-bold">
            + New Notebook
          </button>
          <img
            src="/background.jpeg"
            alt="background"
            className="absolute top-0 left-0 w-full h-[950px] object-cover object-center -z-10"
          />
        </div>

        {/* Right component */}
        <div className="comp-background w-[80%] h-screen flex flex-col relative">
          <div id="top" className="flex items-center justify-between p-5">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Welcome User, Good Evening{" "}
              <img
                src={`evening${darkmode ? "-white" : ""}.png`}
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
                  folders.filter(e=>{return e.type === 'folder'}).map((e)=>{
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
        </div>
      </div>
    </>
  );
}
