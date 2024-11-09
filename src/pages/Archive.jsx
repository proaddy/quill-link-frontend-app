import axios from 'axios';
import FileCard from '../components/FileCard';
import Header from '../components/Header';
import { useEffect, useState } from 'react';

export default function Archive() {
  const [archiveList, setArchiveList] = useState([]);
  const userid = localStorage.getItem('userID');

  useEffect(() => {
    ;(async () => {
      try {
        const files = await axios.get('/api/files');
        setArchiveList(files.data.filter(file => file.userID === userid && file.archive === true));
      } catch (error) {
        console.error('error', error);
      }
    })()
  },[]);

  return (
      <>
          <Header/>
          <hr className="w-[96%] self-center h-[1px] border-[#a1a1a1]" />
            {
              archiveList.map((e, i) => {
                return (
                  <FileCard key={i} file={e}/>
                )
              })
            }
      </>
  )
}