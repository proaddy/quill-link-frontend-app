import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Underline , Mention, Paragraph, Undo, Alignment } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// require('dotenv').config();
// const backend = process.env.BACKEND;
const backend = import.meta.env.VITE_BACKEND;

export default function Editnote() {

    const location = useLocation();
    const navigate = useNavigate();
    const {id} = location.state || '';

    const [text, setText] = useState('');
    const [name, setName] = useState('');

    const handleClick = () => {
        (async () => {
            try {
                const response = await axios.put(`${backend}/api/files/${id}`, {"desc": text, "name":name});
                if(response) {
                    console.log("File Updated Successfully");
                }
            } catch (error) {
                console.log("error", error.message);
            }
        })();
        navigate('/');
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    // const [data, setData] = useState('');

    useEffect(()=>{
       ;(async () => {
            try {
                setIsError(false);
                setIsLoading(true);
                const response = await axios.get(`${backend}/api/files/${id}`);
                if (!response) {
                    console.error("No such file found");
                    setIsError(true);
                    setIsLoading(false);
                    return;
                }
                // console.log(response);
                setName(response.data.name);
                setText(response.data.desc);
                setIsLoading(false);
            } catch (error) {
                console.error("error", error.message);
                setIsError(true);
                setIsLoading(false);
            }
        })();
        
    }, []);

    if(isLoading) {
        return (
            <div className="flex h-svh items-center m-auto">
                <h1 className="text-5xl">Loading...</h1>
            </div>
        )
    }

    if(isError) {
        return (
            <div className="flex h-svh items-center m-auto">
                <h1 className="text-5xl">Something Went Wrong...</h1>
            </div>
        )
    }

    return (
      <div className='flex flex-col'>
        <input type="text" className='p-3 text-xl font-bold' placeholder='File Name...' value={name} onChange={(e)=>setName(e.target.value)}/>
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'alignment'],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo, Underline, Alignment
                ]
            } }
            data = {text}
            onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
            }}
        />
        <button className='mr-10 mt-2 self-center w-1/4 h-10 text-white bg-gradient-to-r from-[#A3D1F1] to-[#1E5E7D] rounded-lg font-bold' onClick={handleClick}>Save</button>
      </div>
    );
}