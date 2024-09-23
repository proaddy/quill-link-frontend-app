import { useState } from "react"
import notebooks from '../data/notebook.json'
import folders from '../data/folders.json'
import files from '../data/files.json'

export default function MobDashboard() {
    const [active, setActive] = useState('notebook');
    return (
        <>
        <div className="flex md:hidden">
            {/* Left component */}
            <div className="w-1/5 h-screen relative flex flex-col">
                <span className="text-white flex items-center font-bold text-xl">
                    <img src="/logo-website.png" alt="logo" className="h-8 m-5 mr-3"/>
                    QuillLink
                </span>
                <ul className="flex flex-col space-y-4 self-center mt-6">
                    <li className="cursor-pointer text-white flex font-bold items-center"><img className="invert h-6 mr-5" src="/home.png" alt="home"/><span className="bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] bg-clip-text text-transparent">Home</span></li>
                    {/* <li className="cursor-pointer text-white flex font-bold items-center"><img className="invert h-6 mr-5" src="/heart.png" alt="heart" />Favourite</li> */}
                    {/* <li className="cursor-pointer text-white flex font-bold items-center"><img className="invert h-6 mr-5" src="/bell.png" alt="bell" />Notification</li> */}
                    {/* <li className="cursor-pointer text-white flex font-bold items-center"><img className="invert h-6 mr-5" src="/archive.png" alt="archive" />Archive</li> */}
                    {/* <li className="cursor-pointer text-white flex font-bold items-center"><img className="invert h-6 mr-5" src="/trash.png" alt="trash" />Trash</li> */}
                    <li className="cursor-pointer text-white flex font-bold items-center"><img className="invert h-6 mr-5" src="/toggle-off.png" alt="toggle" />Dark Mode</li>
                </ul>
                <hr className="w-[80%] h-[1px] self-center border-none mt-6 bg-gray-500"/>
                <ul className="flex flex-col space-y-4 self-center mt-8 overflow-y-auto overflow-x-hidden h-[18rem]">
                    <li className="cursor-pointer text-white flex font-bold items-center"><img src="/notebook.png" alt="notebook" className="invert h-6 mr-5"/> Notebook</li>
                    <li className="cursor-pointer text-white flex font-bold items-center"><img src="/notebook.png" alt="notebook" className="invert h-6 mr-5"/> NotebookNotebook</li>
                    <li className="cursor-pointer text-white flex font-bold items-center"><img src="/notebook.png" alt="notebook" className="invert h-6 mr-5"/> notebook notebook</li>
                    <li className="cursor-pointer text-white flex font-bold items-center"><img src="/notebook.png" alt="notebook" className="invert h-6 mr-5"/> Notebook</li>
                </ul>
                <button className="self-center mb-5 w-3/5 h-10 text-white bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] rounded-lg">+ New Notebook</button>
                <img src="/background.jpeg" alt="background" className="absolute top-0 left-0 w-full h-[950px] object-cover object-center -z-10"/>
            </div>
            {/* Right component */}
            <div className="w-[80%] h-screen bg-[#f5f6fa] flex flex-col relative">
                <div id="top" className="flex items-center justify-between p-5">
                    <h1 className="text-3xl font-bold">Welcome User, Good Morning ☀</h1>
                    <img src="/circle-user.png" alt="user" className="h-10"/>
                </div>
                <input className="border border-[#626262] bg-[#f5f4fa] w-[95%] h-10 rounded-lg self-center p-3" type="text" placeholder="🔍 Enter search keyword, search notes, keywords, etc." />
                <hr className="w-[96%] self-center h-[1px] border-[#a1a1a1] mt-4"/>
                {/* notes */}
                <div className="flex p-6 space-x-8 h-full">
                    {/* left */}
                    <div className="w-1/3 h-full rounded-2xl border border-[#626262]">
                        <h2 className="flex justify-between px-6 py-2 font-bold">Folders <button>+</button></h2>
                        <hr className="w-[90%] h-[5px] ml-[5%] border-[#c1c1c1]"/>
                        {/* row */}
                        <div className="flex flex-col space-y-1 h-[480px] overflow-auto">
                            <div className="ml-[8%] flex items-center space-x-2">
                                <img src="/less-than.png" alt="arrow" className="h-[6px]"/>
                                <img src="/folder.png" alt="folder" className="h-4"/>
                                <span>Science</span>
                            </div>
                            <div className="ml-[16%] flex items-center space-x-2">
                                <img src="/less-than.png" alt="arrow" className="h-[6px]"/>
                                <img src="/folder.png" alt="folder" className="h-4"/>
                                <span>Science</span>
                            </div>
                            <div className="ml-[8%] flex items-center space-x-2">
                                <img src="/less-than.png" alt="arrow" className="h-[6px]"/>
                                <img src="/folder.png" alt="folder" className="h-4"/>
                                <span>Science</span>
                            </div>
                        </div>
                    </div>
                    {/* right */}
                    <div className="w-3/4 h-full rounded-2xl border border-[#626262]">
                        <h2 className="flex justify-between px-6 py-2 font-bold">Folders <button>+</button></h2>
                        <hr className="w-[96%] h-[5px] ml-[2%] border-[#c1c1c1]"/>
                        {/* notes */}
                        <div className="flex ml-[3%] flex-wrap h-[460px] mt-3 overflow-auto">
                            <div className="bg-[#ffffff] flex flex-col py-2 px-3 border border-[#00] mr-5 mb-5 rounded-xl">
                                <p className="text-xl font-bold flex items-center justify-between -mb-1">intro to AI <img src="/pencil.png" alt="pencil" className="h-4"/></p>
                                <p className="text-[8px]">10 jun 24 . 1 day ago</p>
                                <hr className="border-[#c9c9c9] h-[1px] w-[90%] self-center my-2"/>
                                <p className="text-xs h-20">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi suscipit, provident non facere ad excepturi sunt? Pariatur provident non facere</p>
                                <div className="flex justify-between mt-3">
                                    <div className="flex space-x-3">
                                        <img src="/heart.png" alt="heart" className="h-4"/>
                                        <img src="/user-add.png" alt="heart" className="h-4"/>
                                    </div>
                                    <div className="flex space-x-3">
                                        <img src="/archive.png" alt="heart" className="h-4"/>
                                        <img src="/trash.png" alt="heart" className="h-4"/>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#ffffff] flex flex-col py-2 px-3 border border-[#00] mr-5 mb-5 rounded-xl">
                                <p className="text-xl font-bold flex items-center justify-between -mb-1">intro to AI <img src="/pencil.png" alt="pencil" className="h-4"/></p>
                                <p className="text-[8px]">10 jun 24 . 1 day ago</p>
                                <hr className="border-[#c9c9c9] h-[1px] w-[90%] self-center my-2"/>
                                <p className="text-xs h-20">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi suscipit, provident non facere ad excepturi sunt? Pariatur provident non facere</p>
                                <div className="flex justify-between mt-3">
                                    <div className="flex space-x-3">
                                        <img src="/heart.png" alt="heart" className="h-4"/>
                                        <img src="/user-add.png" alt="heart" className="h-4"/>
                                    </div>
                                    <div className="flex space-x-3">
                                        <img src="/archive.png" alt="heart" className="h-4"/>
                                        <img src="/trash.png" alt="heart" className="h-4"/>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#ffffff] flex flex-col py-2 px-3 border border-[#00] mr-5 mb-5 rounded-xl">
                                <p className="text-xl font-bold flex items-center justify-between -mb-1">intro to AI <img src="/pencil.png" alt="pencil" className="h-4"/></p>
                                <p className="text-[8px]">10 jun 24 . 1 day ago</p>
                                <hr className="border-[#c9c9c9] h-[1px] w-[90%] self-center my-2"/>
                                <p className="text-xs h-20">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi suscipit, provident non facere ad excepturi sunt? Pariatur provident non facere</p>
                                <div className="flex justify-between mt-3">
                                    <div className="flex space-x-3">
                                        <img src="/heart.png" alt="heart" className="h-4"/>
                                        <img src="/user-add.png" alt="heart" className="h-4"/>
                                    </div>
                                    <div className="flex space-x-3">
                                        <img src="/archive.png" alt="heart" className="h-4"/>
                                        <img src="/trash.png" alt="heart" className="h-4"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="sm:hidden">
            <div className="flex flex-col">
                <img src="/logo-website.png" alt="logo" className="invert absolute h-80 top-[30%] left-[15%] opacity-15 select-none"/>
                <div className="flex justify-between items-center p-2 font-bold">
                    <h1>Welcome User, Good Morning ☀</h1>
                    <img src="circle-user.png" alt="user" className="h-6"/>
                </div>
                <input type="text" placeholder="🔍 Search notes, keywords, etc." className="border border-black rounded-lg w-[94%] p-1 self-center"/>
                <hr className="border-[#b9b9b9] h-[1px] w-full self-center mt-2 "/>
                <div id="pages">
                    <ul id="mobilePagesList" className="flex space-x-5 justify-center overflow-y-auto mt-2">
                        <li className="border border-black rounded-3xl py-1 px-2"><button>Home</button></li>
                        <li className="border border-black rounded-3xl py-1 px-2"><button>Favourite</button></li>
                        <li className="border border-black rounded-3xl py-1 px-2"><button>Notification</button></li>
                        <li className="border border-black rounded-3xl py-1 px-2"><button>Archive</button></li>
                        <li className="border border-black rounded-3xl py-1 px-2"><button>Trash</button></li>
                    </ul>
                </div>
                <div id="mobileOutputContent" className="h-[480px] my-2 w-full grow overflow-y-auto">
                    { active === 'notebook' &&
                        notebooks.map((e, i)=>{
                            return (
                                <div key={i} id="notebook" className="flex justify-between items-center pr-3">
                                    <div className="flex items-center p-2 text-xl">
                                        <img src="/notebook.png" alt="notebook" className="h-5 mr-2"/>
                                        {e.name.length > 20 ? e.name.slice(0, 25) + '..' : e.name}
                                    </div>
                                    <div className="text-[#b9b9b9] text-xs">
                                        2 folders
                                    </div>
                                </div>
                            )
                        })
                    } {
                        active === 'folder' && 
                            folders.map((e, i)=>{
                                return (
                                    <div key={i} id="folder" className="flex justify-between items-center pr-3">
                                        <div className="flex items-center p-2 text-xl">
                                            <img src="/folder.png" alt="notebook" className="h-5 mr-2"/>
                                            {e.name.length > 20 ? e.name.slice(0, 25) + '..' : e.name}
                                        </div>
                                        <div className="text-[#b9b9b9] text-xs">
                                        2 files
                                    </div>
                                    </div>
                                )
                            })
                    } {
                        active === 'file' && 
                            files.map((e, i)=>{
                                return (
                                    <div key={i} id="file" className="flex justify-between items-center pr-3">
                                        <div className="flex items-center w-full justify-between p-2 text-xl">
                                            {e.name.length > 20 ? e.name.slice(0, 18) + '..' : e.name}
                                            <div className="flex items-center">
                                                <img src="/heart.png" alt="heart" className="h-5 mr-2"/>
                                                <img src="/pencil.png" alt="edit" className="h-5"/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
                {/* add button */}
                <div className="cursor-pointer absolute w-12 h-12 bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] right-5 bottom-24 text-center py-2 rounded-3xl text-white font-bold text-2xl">+</div>
                {/* navigations */}
                <div id="buttons" className="fixed w-full bottom-0 flex h-16 justify-between">
                    <button onClick={()=>{setActive('notebook');console.log('notebook')}} className={`border border-black bg-white min-w-[25%] ${active === 'notebook'?'grow':'grow-0'}`}>Notebooks</button>
                    <button onClick={()=>{setActive('folder');console.log('folder')}} className={`border border-black bg-white min-w-[25%] ${active === 'folder'?'grow':'grow-0'}`}>Folders</button>
                    <button onClick={()=>{setActive('file');console.log('file')}} className={`border border-black bg-white min-w-[25%] ${active === 'file'?'grow':'grow-0'}`}>Files</button>
                </div>
            </div>
        </div>
        </>
    )
}