import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";

import { useDashboardContext } from "./DashboardContext";

export default function FileCard({ activeFolder, searchText = "" }) {

    var subFile;

    if (activeFolder) {
      subFile = activeFolder?.list.filter(fol => fol.type === 'file');
    }
    // console.log(subFile);
    
    const {darkmode} = useDashboardContext();

    function daysAgo(date) {
        let testdate1 = new Date(date);
        let testdate2 = new Date();

        const diffms = Math.abs(testdate2 - testdate1);
        const diffdays = Math.floor(diffms / (1000 * 60 * 60 * 24));

        if (diffdays) {
            return `${diffdays} days ago`;
        } else {
            return "Made today";
        }
    }

    const navigate = useNavigate();

    function navigateEdit(id) {
        navigate("/editnote", { state: { id: id } });
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
              console.log(fileList);
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
            {fileList
                .filter((e) => {
                    return e.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase());
                })
                .map((e, i) => {
                    return (
                        <div
                            key={i}
                            className="files flex flex-col py-2 px-3 border border-[#00] mr-5 mb-5 rounded-xl"
                        >
                            <p className="text-xl font-bold flex items-center justify-between -mb-1">
                                {e.name}
                                <img
                                    src={`/pencil${
                                        darkmode ? "-white" : ""
                                    }.png`}
                                    alt="pencil"
                                    className="h-4 cursor-pointer"
                                    onClick={() => navigateEdit(e.id)}
                                />
                            </p>
                            <p className="text-[8px]">
                                {e.createdAt} . {daysAgo(e.createdAt)}
                            </p>
                            <hr className="border-[#c9c9c9] h-[1px] w-[90%] self-center my-2" />
                            <p className="text-xs h-20">
                                {parse(e.desc.substring(0, 400))}
                            </p>
                            <div className="flex justify-between mt-3">
                                <div className="flex space-x-3">
                                    <img
                                        src={
                                            e.favourite
                                                ? "/heart-red.png"
                                                : `/heart${
                                                      darkmode ? "-white" : ""
                                                  }.png`
                                        }
                                        alt="heart"
                                        className="h-4 cursor-pointer"
                                        onClick={""}
                                    />
                                    <img
                                        src={`/user-add${
                                            darkmode ? "-white" : ""
                                        }.png`}
                                        alt="user-add"
                                        className="h-4 cursor-pointer"
                                    />
                                </div>
                                <div className="flex space-x-3">
                                    <img
                                        src={`/archive${
                                            darkmode ? "-white" : ""
                                        }.png`}
                                        alt="archive"
                                        className="h-4 cursor-pointer"
                                    />
                                    <img
                                        src={`/trash${
                                            darkmode ? "-white" : ""
                                        }.png`}
                                        alt="trash"
                                        className="h-4 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
