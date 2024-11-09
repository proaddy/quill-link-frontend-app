import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FileCard from '../components/FileCard'
import axios from 'axios'

export default function Trash() {
  const [trashList, setTrashList] = useState([]);
  const userid = localStorage.getItem('userID');

  useEffect(() => {
    ;(async () => {
      try {
        const files = await axios.get('/api/files');
        setTrashList(files.data.filter(file => file.userID === userid && file.trash === true));
      } catch (error) {
        console.error('error', error);
      }
    })()
  },[]);

  const deleteList = async()=>{
    if(confirm('Are you sure you want to permanently delete the files??')) {
      const fil = await Promise.all(
        trashList.map(async (fileId) => {
          try {
            const response = await axios.delete(`/api/files/${fileId._id}`);
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
