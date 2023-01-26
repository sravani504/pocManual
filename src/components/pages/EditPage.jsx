import React from 'react';
import { useState } from 'react';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from '../../api/UploadAdapter';
import { useLocation } from 'react-router-dom'


const EditPage = () => {
const [state,setState]=useState("");
const [name,setName]=useState("");
const location = useLocation();
 const data = location.state;
 console.log(data);
 
    const config = {
        language: "en", // fa - for persian language ( rtl )
        extraPlugins: [CustomUploadAdapterPlugin],
    
    };

    const imageConfig = {
        toolbar: [
             'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
            'toggleImageCaption', 'imageTextAlternative'
        ]
    };

    function CustomUploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
            // Create new object and pass server url
            return new UploadAdapter(loader, URL);
        };
    }
  return (
    <div className="container-md">
    <h2>Edit Page Details</h2>
   <div className="form-group">
               <label>enter page name</label>
               <input type="text" name="name" placeholder="edit page name" onChange={(e)=>setName(e.target.value)} value={name} className="form-control" required/>

        </div>
           <div className="form-group">
               <label>edit page description</label>
           {/* <input type="text" name="name" placeholder="entername" className="form-control" required/> */}


            </div>

    <CKEditor
       config={config}
       editor={ClassicEditor}
       data={state.data}
       onChange={(event, editor) => {
           const data = editor.getData();
           setState({ data });
           // console.log(data);
       }}
       upload={imageConfig}
   />
   <button className='btn btn-primary  mt-2 col-12' >Submit</button>


</div>
  );
}

export default EditPage;
