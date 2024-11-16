import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FileCard from '../components/FileCard'
import axios from 'axios'
import { useDashboardContext } from '../components/DashboardContext'
// require('dotenv').config();
// const backend = process.env.BACKEND;
const backend = import.meta.env.VITE_BACKEND;

export default function Trash() {
  const {activeNotebook, setActiveNotebook} = useDashboardContext();

  const [trashList, setTrashList] = useState([]);
  const userid = localStorage.getItem('userID');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const deleteList = async()=>{
    if(confirm('Are you sure you want to permanently delete the files??')) {
      const fil = await Promise.all(
        trashList.map(async (fileId) => {
          try {
            const response = await axios.delete(`${backend}/api/files/${fileId._id}`);
            return response;
          } catch (error) {
            console.log(`Failed to fetch data for folder ID ${fileId._id}`, error);
            return null;
          }
        })
      )
      console.log(fil);
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setIsError(false);
        setIsLoading(true);

        const files = await axios.get(`${backend}/api/files`);
        // console.log(userid, files.data);
        // files.data.forEach(e=> e.userID === userid && console.log(e._id, e.trash));
        setTrashList(files.data.filter(file => {return file.userID === userid && file.trash === true}));
        setIsLoading(false);
      } catch (error) {
        console.error('error', error);
        setIsError(true);
        setIsLoading(true);
      }
    })();
    setActiveNotebook({...activeNotebook});
  },[]);

  if (isLoading) {
    return (
      <div className="flex h-svh items-center m-auto">
          <h1 className="text-5xl">Loading...</h1>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-svh items-center m-auto">
          <h1 className="text-5xl">Something Went Wrong...</h1>
      </div>
    )
  }

  return (
    <>
      <Header/>
      <hr className="w-[96%] self-center h-[1px] border-[#a1a1a1]" />
      <div className="w-full h-full flex">
        <div className="flex flex-col ml-[3%] w-full flex-wrap h-[620px] mt-3 overflow-auto">
          {
            trashList.map((e, i) => {
              return (
                <FileCard key={i} file={e}/>
              )
            })
          }
        </div>
        <button 
          className="self-center mb-5 w-1/3 h-10 text-white bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] rounded-lg font-bold"
          onClick={deleteList}
        >Delete Permanently</button>
      </div>
    </>
  )
}
