import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate} from "react-router-dom";

import DashboardContext from "../components/DashboardContext";
import FormComponent from "../components/FormComponent";

import axios from "axios";
require('dotenv').config();
const backend = process.env.BACKEND;

export default function Dashboard() {
    const navigate = useNavigate();
    // useful because when toggle it changes/updates the UI
    const [darkmode, setDarkmode] = useState(false);

    // pages can be home, favourite, notification, archive, trash
    const [pageSelect, setPageSelect] = useState("home");

    const [showForm, setShowForm] = useState(false);
    const [type, setType] = useState(false);
    const [action, setAction] = useState(false);

    const formClick = (what, why) => {
        setShowForm(true);
        setType(what);
        setAction(why);
    };

    const userid = localStorage.getItem('userID');
    if (!userid) {
        console.log('user not logged in');
        navigate('/login', {state: {action: "notloggedin"}});
    }

    const deleteNotebook = async (id) => {
        try {
            setError(false);
            setLoading(true);
            if(confirm("Do you want to delete notebook?? if yes then all the data inside the notebook will be inaccessible")) {
                console.log(id);
              const allData = await axios.delete(`${backend}/api/notebooks/${id}`);
              console.log(allData);
              setNotebook(notebook);
            }
            setLoading(false);
          } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
          }
    }; 

    // toggle darkmode
    useEffect(() => {
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
    
    const [notebook, setNotebook] = useState([]);
    const [activeNotebook, setActiveNotebook] = useState({});

    // console.log(activeNotebook);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        ;(async () => {
            try {
                setError(false);
                setLoading(true);
                const userId = await axios.get(`${backend}/api/users/${userid}`);
                // console.log(userId.data.list);
                const notebookList = userId.data.list;
                const allNotebooks = await Promise.all(
                    notebookList.map(async (noteId) => {
                        try {
                            const response = await axios.get(`${backend}/api/notebooks/${noteId}`);
                            // console.log(response);
                            return response.data;
                        } catch (error) {
                            console.log(`Failed to fetch data for notebook ID ${noteId}`, error);
                            setError(true);
                            return null;
                        }
                    })
                );
                setNotebook(allNotebooks.filter(ele => ele != null));
                // console.log(notebook);
                // console.log(allNotebooks.filter(ele => ele != null));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        })();
        // console.log(notebook);
    }, [activeNotebook]);

    // context sharing
    let dataToShare = {darkmode, activeNotebook, setActiveNotebook};

    return (
        <DashboardContext.Provider value={dataToShare}>
            <FormComponent showForm={showForm} setShowForm={setShowForm} type={type} action={action}/>
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
                        {/* darkmode toggle */}
                        <li
                            className={`cursor-pointer flex font-bold items-center`}
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
                            <span className={
                                darkmode ? "bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent"
                                : "text-white" 
                            }>
                                Dark Mode
                            </span>
                        </li>
                    </ul>
                    <hr className="w-[80%] h-[1px] self-center border-none mt-6 bg-gray-500" />
                    {/* Notebooks */}
                    <ul className="flex flex-col gap-4 mt-8 ml-10 overflow-x-hidden h-[24rem]">
                        {/* {console.log(notebook)} */}
                        {notebook.map((e, i) => {
                            return (
                                <li
                                    key={i}
                                    className="group cursor-pointer flex font-bold items-center"
                                    onClick={()=>setActiveNotebook({"_id":e._id, list: e.list})}
                                >
                                    <img
                                        src={
                                            e._id === activeNotebook["_id"] ?
                                            "/notebook-grad.png" :
                                            "/notebook-white.png"}
                                        className="h-6 mr-1.5"
                                    />
                                    <span className={
                                        e._id === activeNotebook["_id"] ?
                                        "bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent":
                                        "text-white"}>{e.name}</span>
                                    <div className="text-white pl-2 relative hidden group-hover:block">
                                        {'->'}
                                        <div className="absolute top-2 left-8 z-500">
                                            <ul className="rounded-lg bg-gray-900">
                                            <li className="px-4 py-1 hover:bg-gray-200 hover:text-black rounded-t-lg" onClick={()=>formClick('notebook', 'rename')}>Rename</li>
                                            <li className="px-4 py-1 hover:bg-gray-200 hover:text-black rounded-b-lg" onClick={()=>deleteNotebook(e._id)}>Delete</li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <button 
                        className="self-center mb-5 w-3/5 h-10 text-white bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] rounded-lg font-bold"
                        onClick={()=>formClick('notebook', 'create')}
                    >
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
