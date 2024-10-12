import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
// import { SlashCommand } from 'ckeditor5-premium-features';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDashboardContext } from '../components/DashboardContext';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

export default function Editnote() {

    const location = useLocation();
    const {id} = location.state || '';

    const { folderStructure, setFolderStructure } = useDashboardContext();

    function searchFolder(folderlist, id) {
        folderlist.forEach(element => {
            if(element.type === 'file') {
                if(element.id === id) {
                    setText(element.desc)
                }
            }
            else if(element.type === 'folder') {
                searchFolder(element.list, id)
            }
        });
    }

    function savechanges(folderlist, id, text) {
        // console.log(folderlist, id, text);
        return folderlist.map(element => {
            if(element.type === 'file' && element.id === id) {
                console.log(element);
                return {...element, desc: text};
            } else if(element.type === 'folder') {
                return {...element, list: savechanges(element.list, id, text)};
            } else {
                return element;
            }
        })
    }

    const [text, setText] = useState();

    const navigate = useNavigate();

    const handleClick = () => {
        const newfolderStructure = savechanges(folderStructure, id, text);
        setFolderStructure(newfolderStructure)
        // console.log(newfolderStructure);
        navigate('/')
    }

    useEffect(()=>{
        searchFolder(folderStructure, id)
    }, []);

    return (
      <div className='flex flex-col'>
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'bold', 'italic'],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo
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