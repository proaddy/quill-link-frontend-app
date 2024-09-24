import { useEffect, useState } from 'react'
import { v4 as uuidv4} from 'uuid';

// console.log(new Date());

export default function FormComponent({activeFolderId, showForm, setShowForm, setFilesList, filesList, setFolders, folders}) {

    // searching folder name
    let folderOptionList = [];
    
    function traverseAndCollect(folderList) {
        folderList.forEach((folder)=>{
            if(folder.type === 'folder') {
                folderOptionList.push(folder.name);
            } if (folder.list && folder.list.length > 0) {
                traverseAndCollect(folder.list);
            }
        })
    };
    traverseAndCollect(folders);

    // initial state of file
    const [fileFormData, setFileFormData] = useState({
        id: uuidv4(),
        type: 'file',
        name: '',
        desc: '',
        favourite: false,
        archive: false,
        trash: false,
        users_list: [],
        created: new Date().toISOString().substring(0, 10),
        address: ''
    });

    // initial state of folder
    const [folderFormData, setFolderFormData] = useState({
        id: uuidv4(),
        type: 'folder',
        name: '',
        open: false,
        address: '',
        list: []
    });

    const [notebookFormData, setNotebookFormData] = useState({});

    // handle the change when filling form for file
    const handleFileChange = (e)=>{
        const {name, value, type, checked} = e.target;
        setFileFormData({
            ...fileFormData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // handle the change when filling form for folder
    const handleFolderChange = (e)=>{
        const {name, value, type, checked} = e.target;
        setFolderFormData({
            ...folderFormData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // reset the form with default values
    const resetForm = ()=>{
        setFileFormData({
            id: uuidv4(),
            type: 'file',
            name: '',
            desc: '',
            favourite: false,
            archive: false,
            trash: false,
            users_list: [],
            created: new Date().toISOString().substring(0, 10),
            address: ''
        });

        setFolderFormData({
            id: uuidv4(),
            type: 'folder',
            name: '',
            open: false,
            address: '',
            list: []
        });
    }


    // function to make a deep copy of objects
    const deepcopy = (data) => {
        return JSON.parse(JSON.stringify(data));
    }

    // recursive search function for saving changes
    function searchFolderAddFile(folderStructure, id, data) {
        console.log(folderStructure);
        folderStructure.forEach((item)=>{
            if(item.type === 'folder') {
                if(item.id === id) {
                    console.log(item.name);
                    data['address'] = `${item.address}/${item.name}`;
                    item.list.push(data);
                    setFilesList(item.list.filter((item)=>{return item.type==='file'}));
                } else if(item.list && item.list.length > 0){
                    searchFolderAddFile(item.list, id, data);
                }
            }
        });
    }

    function searchFolderAddFolder(folderStructure, id, data) {
        folderStructure.forEach((item)=>{
            if(item.type === 'folder') {
                if(item.id === id) {
                    console.log(item.name);
                    data['address'] = `${item.address}/${item.name}`;
                    item.list.push(data);
                } else if(item.list && item.list.length > 0){
                    searchFolderAddFolder(item.list, id, data);
                }
            }
        });
    }

    // when form is submitted for file
    const fileFormHandler = (e)=>{
        e.preventDefault();
        const structureToUpdate = deepcopy(folders);
        searchFolderAddFile(structureToUpdate, activeFolderId, fileFormData);
        setFolders(structureToUpdate);
        console.log(folders);
        resetForm();
        setShowForm({file: false, folder: false, notebook: false});
    }

    // when form is submitted for folder
    const folderFormHandler = (e)=>{
        e.preventDefault();
        const folderStructure = deepcopy(folders);
        searchFolderAddFolder(folderStructure, activeFolderId, folderFormData);
        setFolders(folderStructure);
        resetForm();
        setShowForm({file: false, folder: false, notebook: false});
        // console.log("folder", folderFormData);
    }
    
    // close form button
    const formCloseFn = ()=>{
        resetForm();
        setShowForm({file: false, folder: false, notebook: false});
    }

  return (
    <>
    {
        showForm['file'] &&
        <div className={`w-screen h-screen bg-[#0000007f] flex justify-center items-center absolute top-0 left-0 z-10`}>
            <img src="close.png" className="h-8 w-8 absolute right-0 top-0 m-8 cursor-pointer" onClick={formCloseFn}/>
            <form onSubmit={fileFormHandler} className="bg-white min-w-[30rem] h-[30rem] rounded-lg p-3 flex flex-col gap-1 justify-evenly">
                <label htmlFor="name">Name: </label><input value={fileFormData["name"]} onChange={handleFileChange} required name="name" id="name" type="text" className="border border-black rounded-md p-2"/><br />
                <label htmlFor="desc">Description: </label><br /><textarea value={fileFormData["desc"]} onChange={handleFileChange} name="desc" id="desc" type="text" className="border border-black rounded-md h-24 p-2"/><br />
                <label htmlFor="favourite">Favourite: <input onChange={handleFileChange} value={fileFormData["favourite"]} name="favourite" id="favourite" type="checkbox"/></label><br />
                <label>Created: </label><input required value={fileFormData["created"]} onChange={handleFileChange} type="date" name="created" id="created" /><br />
                <label htmlFor="address">Folder: </label>
                <select value={fileFormData["address"]} onChange={handleFileChange} name="address" id="address" className="h-8 p-2 rounded-md">
                    {
                        folderOptionList.map((e, i)=>{
                            return (
                                <option key={i}>{e}</option>
                            )
                        })
                    }
                </select><br />
                <button type="submit" className="border border-black rounded-lg p-2">Add File</button>
            </form>
        </div>
    }
    {
        showForm['folder'] && 
        <div className={`w-screen h-screen bg-[#0000007f] flex justify-center items-center absolute top-0 left-0 z-10`}>
            <img src="close.png" className="h-8 w-8 absolute right-0 top-0 m-8 cursor-pointer" onClick={formCloseFn}/>
            <form onSubmit={folderFormHandler} className="bg-white min-w-[30rem] h-[30rem] rounded-lg p-3 flex flex-col gap-1 justify-evenly">
                <label htmlFor="name">Name: </label><input value={folderFormData["name"]} onChange={handleFolderChange} required name="name" id="name" type="text" className="border border-black rounded-md p-2"/><br />
                <label htmlFor="address">Folder: </label>
                <select value={folderFormData["address"]} onChange={handleFolderChange} name="address" id="address" className="h-8 p-2 rounded-md">
                    {
                        folderOptionList.map((e, i)=>{
                            return (
                                <option key={i}>{e}</option>
                            )
                        })
                    }
                </select><br />
                <button type="submit" className="border border-black rounded-lg p-2">Add Folder</button>
            </form>
        </div>
    }
    {
        showForm['notebook'] &&
        <div className={`w-screen h-screen bg-[#0000007f] flex justify-center items-center absolute top-0 left-0 z-10`}>
            <img src="close.png" className="h-8 w-8 absolute right-0 top-0 m-8 cursor-pointer" onClick={formCloseFn}/>
            <form onSubmit={fileFormHandler} className="bg-white min-w-[30rem] h-[30rem] rounded-lg p-3 flex flex-col gap-1 justify-evenly">
                <label htmlFor="name">Name: </label><input value={formData["name"]} onChange={handleChange} required name="name" id="name" type="text" className="border border-black rounded-md p-2"/><br />
                <label htmlFor="desc">Description: </label><br /><textarea value={formData["desc"]} onChange={handleChange} name="desc" id="desc" type="text" className="border border-black rounded-md h-24 p-2"/><br />
                <label htmlFor="favourite">Favourite: <input onChange={handleChange} value={formData["favourite"]} name="favourite" id="favourite" type="checkbox"/></label><br />
                <label>Created: </label><input value={formData["date"]} onChange={handleChange} type="date" name="date" id="date" /><br />
                <label htmlFor="address">Folder: </label>
                <select value={formData["address"]} onChange={handleChange} name="address" id="address" className="h-8 p-2 rounded-md">
                <option value="default">Default</option>
                <option value="folder_1">folder 1</option>
                <option value="folder_2">folder 2</option>
                </select><br />
                <button type="submit" className="border border-black rounded-lg p-2">Add Notebook</button>
            </form>
        </div>
    }
    </>
)}
