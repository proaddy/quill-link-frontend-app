import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DashboardContext from "../components/DashboardContext";

import notebook from "../data/notebook.json";

export default function Dashboard() {
    // useful because when toggle it changes/updates the UI
    const [darkmode, setDarkmode] = useState(false);

    // pages can be home, favourite, notification, archive, trash
    const [pageSelect, setPageSelect] = useState("home");

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

    let dataToShare = {darkmode};

    // const navigate = useNavigate();

    // function handleRedirect() {
    //   navigate(/trash);
    // }

    return (
        <DashboardContext.Provider value={dataToShare}>
            <div className="dashboard-body flex">
                {/* Left component */}
                <div className="w-1/5 h-screen relative flex flex-col">
                    <span className="text-white flex items-center font-bold text-xl">
                        <img
                            src="/logo-website.png"
                            alt="logo"
                            className="h-8 m-5 mr-3"
                        />
                        QuillLink
                    </span>
                    <ul className="flex flex-col gap-4 ml-10 mt-6">
                        <li
                            className="cursor-pointer flex font-bold items-center"
                            onClick={() => setPageSelect("home")}
                        >
                            <img
                                className="h-6 mr-5"
                                src={`/home-${
                                    pageSelect === "home" ? "grad" : "white"
                                }.png`}
                                alt="home"
                            />
                            <span
                                className={
                                    pageSelect !== "home"
                                        ? "text-white"
                                        : "bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent"
                                }
                            >
                                <Link to="/">Home</Link>
                            </span>
                        </li>
                        <li
                            className="cursor-pointer flex font-bold items-center"
                            onClick={() => setPageSelect("archive")}
                        >
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
                                <Link to="/archive">Archive</Link>
                            </span>
                        </li>
                        <li
                            className="cursor-pointer flex font-bold items-center"
                            onClick={() => setPageSelect("trash")}
                        >
                            <img
                                className="h-6 mr-5"
                                src={`/trash-${
                                    pageSelect === "trash" ? "grad" : "white"
                                }.png`}
                                alt="trash"
                            />
                            <span
                                className={
                                    pageSelect !== "trash"
                                        ? "text-white"
                                        : "bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent"
                                }
                            >
                                <Link to="/trash">Trash</Link>
                            </span>
                        </li>
                        <li
                            className="cursor-pointer flex font-bold items-center text-white"
                            onClick={() => setDarkmode(!darkmode)}
                        >
                            <img
                                className={`h-6 mr-5 ${
                                    darkmode && "-scale-x-100"
                                }`}
                                src={`/toggle-${
                                    darkmode ? "grad" : "white"
                                }.png`}
                                alt="toggle"
                            />
                            Dark Mode
                        </li>
                    </ul>
                    <hr className="w-[80%] h-[1px] self-center border-none mt-6 bg-gray-500" />
                    <ul className="flex flex-col gap-4 mt-8 ml-10 overflow-x-hidden h-[18rem]">
                        <li className="cursor-pointer flex font-bold items-center">
                            <img
                                src="/notebook-grad.png"
                                className="h-6 mr-5"
                            />
                            <span className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">
                                Notebook
                            </span>
                        </li>
                        {notebook.map((e, i) => {
                            return (
                                <li
                                    key={i}
                                    className="cursor-pointer flex font-bold items-center"
                                >
                                    <img
                                        src="/notebook-white.png"
                                        className="h-6 mr-5"
                                    />
                                    <span className="text-white">{e.name}</span>
                                </li>
                            );
                        })}
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
                    <Outlet />
                </div>
            </div>
        </DashboardContext.Provider>
    );
}
