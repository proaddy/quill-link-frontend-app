import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
// import { SlashCommand } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
// import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

export default function Editnote() {
    return (
      <div id="editor">
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                },
                plugins: [
                    // Bold, Essentials, Italic, Mention, Paragraph, SlashCommand, Undo
                    Bold, Essentials, Italic, Mention, Paragraph, Undo
                ],
                licenseKey: '<YOUR_LICENSE_KEY>',
                mention: {
                    // Mention configuration
                },
                // initialData: '<p>Hello from CKEditor 5 in React!</p>',
            } }
        />
      </div>
    );
}