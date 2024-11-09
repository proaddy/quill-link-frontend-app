import { useState } from 'react';
import parse from "html-react-parser";
import { useDashboardContext } from "./DashboardContext";
import { useNavigate } from "react-router-dom";

export default function FileCard({file}) {
    const {darkmode} = useDashboardContext();

    const [favourite, setFavourite] = useState(file.favourite);
    const [clickTime, setClickTime] = useState(null);
    const [renameEnable, setRenameEnable] = useState(false);

    const navigate = useNavigate();
    console.log(file.createdAt);

    function navigateEdit(id) {
        navigate("/editnote", { state: { id: id } });
    }
    
    const doubleClick = (e) => {
        const currentTime = Date.now();
        if (clickTime && currentTime - clickTime < 300) {
            console.log('double click');
            setClickTime(null);
            setRenameEnable(true);
        } else {
            // console.log('single cilck');
            setClickTime(currentTime);
        }
    }

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

    function favouriteToggle() {
        setFavourite(!favourite);
    }


    return (
        <div className="files flex flex-col py-2 px-3 border border-[#00] mr-5 mb-5 rounded-xl select-none">
            <p className="text-xl font-bold flex items-center justify-between -mb-1"
                onClick={(tag)=>doubleClick(tag)}>
                {file.name}
                <img
                    src={`/pencil${
                        darkmode ? "-white" : ""
                    }.png`}
                    alt="pencil"
                    className="h-4 cursor-pointer"
                    onClick={() => navigateEdit(file._id)}
                />
            </p>
            <p className="text-[11px]">
                {file.updatedAt.substring(0, 10)} . {daysAgo(file.updatedAt)}
            </p>
            <hr className="border-[#a5a5a5] border h-[1px] w-[90%] self-center my-2" />
            <p className="text-xs h-20 overflow-hidden">
                {parse(file.desc.substring(0, 400))}
            </p>
            <div className="flex justify-between mt-3">
                <div className="flex space-x-3">
                    <img
                        src={
                            favourite
                                ? "/heart-red.png"
                                : `/heart${
                                        darkmode ? "-white" : ""
                                    }.png`
                        }
                        alt="heart"
                        className="h-4 cursor-pointer"
                        onClick={favouriteToggle}
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
    )
}
