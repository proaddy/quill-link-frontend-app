import axios from 'axios';
import FileCard from '../components/FileCard';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useDashboardContext } from '../components/DashboardContext';
// require('dotenv').config();
// const backend = process.env.REACT_APP_BACKEND;
const backend = import.meta.env.BACKEND;

export default function Archive() {
  const {activeNotebook, setActiveNotebook} = useDashboardContext();

  const [archiveList, setArchiveList] = useState([]);
  const userid = localStorage.getItem('userID');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    ;(async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const files = await axios.get(`${backend}/api/files`);
        setArchiveList(files.data.filter(file => file.userID === userid && file.archive === true));
        setIsLoading(false);
      } catch (error) {
        console.error('error', error);
        setIsError(true);
        setIsLoading(false);
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
          <div className='py-6 pl-6'>
            {
              archiveList.map((e, i) => {
                return (
                  <FileCard key={i} file={e}/>
                )
              })
            }
          </div>
      </>
  )
}