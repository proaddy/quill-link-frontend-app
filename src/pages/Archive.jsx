import { useDashboardContext } from '../components/DashboardContext'
import FileCard from '../components/FileCard';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

export default function Archive() {
  const {darkmode, folderStructure, setFolderStructure} = useDashboardContext();

  const [archiveList, setArchiveList] = useState([]);

  function updatelist(folderlist) {
    if(folderlist){
      folderlist.forEach(element => {
        if(element.type === 'file' && element.trash === true) {
          setArchiveList([...archiveList, element]);
        } else {
          updatelist(element.list);
        }
      })
    }
  }

  useEffect(() => {
      updatelist(folderStructure)
  },[]);

  return (
      <>
          <Header/>
          <hr className="w-[96%] self-center h-[1px] border-[#a1a1a1]" />
          <div className="w-3/4 h-full">
              <div className="flex ml-[3%] flex-wrap h-[460px] mt-3 overflow-auto">
                  <FileCard fileList={archiveList} darkmode={darkmode}/>
              </div>
          </div>
      </>
  )
}