import React, { useEffect, useState } from "react";
import axios from "axios";

import FileCard from "./FileCard";

export default function FileCardList({ activeFolder, searchText = "" }) {
    var subFile;

    if (activeFolder) {
      subFile = activeFolder?.list.filter(fol => fol.type === 'file');
    }
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
      ;(async () => {
          try {
              setError(false);
              setLoading(true);
              if(subFile){
                const folderData = await Promise.all(
                  subFile.map(async (fileId) => {
                        try {
                            const response = await axios.get(`/api/files/${fileId._id}`);
                            return response.data;
                        } catch (error) {
                            console.log(`Failed to fetch data for folder ID ${fileId._id}`, error);
                            setError(true);
                            return null;
                        }
                    })
                )
                setFileList(folderData);
              }
              setLoading(false);
            //   console.log(fileList);
          } catch (error) {
              console.log("error", error);
              setError(true);
          } finally {
              setLoading(false);
          }
      })();
    }, [activeFolder]);

    if (loading) {
        return (
            <div className="flex h-dvh items-center m-auto">
                <h1 className="text-3xl">Loading...</h1>
            </div>
        )
    };

    if (error) {
        return (
            <div className="flex h-dvh items-center m-auto">
                <h1 className="text-3xl">Something Went Wrong...</h1>
            </div>
        )
    };

    return (
        <div className="w-[100%]">
            {
                fileList.filter((e) => {
                    return e.name.toLowerCase().includes(searchText.toLowerCase());
                    }).map((file, i) => {
                        return (
                            <FileCard key={i} file={file}/>
                        );
                    })
            }
        </div>
    );
}
