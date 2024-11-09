import axios from "axios";
import { useState } from "react";
import { useDashboardContext } from "./DashboardContext";

export default function FormComponent({activeFolder, type, action, showForm, setShowForm}) {
    const { activeNotebook } = useDashboardContext();
    let userId = localStorage.getItem("userID");

    const [name, setName] = useState('');
    const [ifNotebookFolder, setIfNotebookFolder] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    function capitalize(str) {
        return String(str).charAt(0).toUpperCase() + String(str).slice(1)
    }

    const parentType = {
        'notebook': 'user',
        'folder': 'folder',
        'file' : 'folder'
    }

    const userid = localStorage.getItem("userID");

    const bodyGenerator = (type, response) => {
        if (type === 'file') {
            return {"fileId": response.data[type]._id, "fileType": response.data[type].type, "userID" : userid}
        } else if (type === 'folder') {
            return {"fileId": response.data[type]._id, "fileType": response.data[type].type}
        } else if (type === 'notebook') {
            return {"notebookId": response.data[type]._id}
        }
    }

    const submitFolder = async (e) => {
        e.preventDefault();
        // var response;
        if (action === 'create') {
            try {
                setName('');
                setIsError(false);
                setIsLoading(true);
                const response = await axios.post(`/api/${type}s`, {"name": name});
                // console.log('response', response);
                console.log(`${type} created!!!`);

                // adding into parent
                try {
                    // if adding folder in notebook
                    if (ifNotebookFolder) {
                        const saved = await axios.patch(`/api/notebooks/${activeNotebook._id}/add-into-notebook`, {"folderId": response.data[type]._id});
                        console.log("Added into notebook", saved);
                    } else {
                        // adding in general
                        const saved = await axios.patch(`/api/${parentType[type]}s/${type === 'notebook' ? userId : activeFolder._id}/add-into-${parentType[type]}`, bodyGenerator(type, response))
                        console.log(`Added in ${parentType[type]}`, saved);
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.error("error", error.message);
                    setIsError(true)
                    setIsLoading(false);
                };

            } catch (error) {
                console.log("error", error.message);
                return;
            }
        } else if ( action === 'rename') {
            ;(async () => {
                try {
                    setName('');
                    setIsError(false);
                    setIsLoading(true);
                    // console.log(type, typeof(type));
                    if (type === 'file') {
                        const response = await axios.put(`/api/${type}s/${activeFolder._id}`, {"name":name});
                        console.log("file", response);
                    } else if ( type === 'folder' ) {
                        const response = await axios.put(`/api/${type}s/${activeFolder._id}`, {"name":name});
                        console.log("folder", response);
                    } else if ( type === 'notebook' ) {
                        const response = await axios.put(`/api/${type}s/${activeNotebook._id}`, {"name":name});
                        console.log("notebook", response);
                    }
                    console.log(`${type} renamed`);
                    setIsLoading(false);
                } catch (error) {
                    console.log("error", error.message);
                    setIsError(true);
                    setIsLoading(false);
                    return;
                }
            })();
        }
    }

    const formHandle = () => {
        setShowForm(!showForm);
        setName('');
    }

    return (
        <>
            {
                showForm && (
                    <div className='w-screen h-screen bg-[#0000007f] flex justify-center items-center absolute top-0 left-0 z-10'>
                    <form onSubmit={(e)=>submitFolder(e)} className="relative bg-white w-80 h-64 rounded-lg p-5 flex flex-col justify-evenly">
                        <img src="close.png" className="absolute h-6 w-6 right-2 top-2 cursor-pointer invert self-start" onClick={formHandle}/>
                        <label htmlFor="name">Name: </label><input onChange={(e)=>setName(e.target.value)} value={name} placeholder={`Enter ${type} name`} name="name" id="name" type="text" className="border border-black rounded-md p-2"/><br />
                        { type === 'folder' && (
                                <div className="flex items-center">
                                <label htmlFor="n-fol">Notebook Folder: </label><input onChange={(e)=>setIfNotebookFolder(e.target.checked)} name="n-fol" id="n-fol" type="checkbox" className="ml-8"/>
                                </div>
                            )}
                        {
                            isLoading ? (<div className="h-10 w-3/5 self-center">Loading...</div>) : isError ? (<div className="h-10 w-3/5 self-center">Something Went Wrong...</div>) : (
                                <button type="submit" 
                                        className="self-center mb-5 w-3/5 h-10 text-white bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] rounded-lg font-bold"
                                >{capitalize(action)} {capitalize(type)}</button>
                            )
                        }
                       
                    </form>
                </div>
                )
            }
        </>
)}
