import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FileCard from '../components/FileCard'
import { useDashboardContext } from '../components/DashboardContext'

export default function Trash() {

    const {darkmode, folderStructure, setFolderStructure} = useDashboardContext();

    const [trashList, setTrashList] = useState([]);

    function updatelist(folderlist) {
      if(folderlist){
        folderlist.forEach(element => {
          if(element.type === 'file' && element.trash === true) {
            setTrashList([...trashList, element]);
          } else {
            updatelist(element.list);
          }
        })
      }
    }

    useEffect(() => {
        updatelist(folderStructure)
    },[]);

    const deleteList = () => {
      let decision = confirm("Are you sure you want to permanently delete your notes ????\nOnce deleted the notes cannot be retrived.")
      // console.log(decision);
      if(decision){
        setTrashList([]);
      }
    }

    return (
        <>
            <Header/>
            <hr className="w-[96%] self-center h-[1px] border-[#a1a1a1]" />
            <div className="w-full h-full flex">
                <div className="flex ml-[3%] w-full flex-wrap h-[620px] mt-3 overflow-auto">
                    <FileCard fileList={trashList} darkmode={darkmode}/>
                </div>
                <button className="self-center mb-5 w-1/3 h-10 text-white bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] rounded-lg font-bold"
                onClick={deleteList}
                >Delete Permanently</button>
            </div>
        </>
    )
}
