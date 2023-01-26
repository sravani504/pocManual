import React, { useState} from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



// import CKEditor
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Upload Adapter
import UploadAdapter from  "../../api/UploadAdapter";
import { posts,pages, getPages } from "../../api";
// Server URL
// const URL = "http://localhost:8000/api/v1/upload/"; // for example

// Custom Upload Adapter Plugin function
function CustomUploadAdapterPlugin(editor) {
	editor.plugins.get("FileRepository").createUploadAdapter = loader => {
		// Create new object and pass server url
		return new UploadAdapter(loader, URL);
	};
}



const Pages =()=> {
	 const [state,setState]=useState({data:" "});
	const [name,setName]=useState(" ");
	const navigate=useNavigate();

		// CKEditor Config
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

		const handlesubmit=async()=>
		{
			console.log(name,state.data);

			await pages({name,data:state.data})
			.then((res)=>{
				if(res)
				{
					console.log(res);
					navigate("/");
				}
				else{
					console.log("nothing");
				}

			})
		}

		return (
          <div className="container-md">
                 <h2>Enter Page Details</h2>
				<div className="form-group">
							<label>enter page name</label>
							<input type="text" name="name" placeholder="enter name" onChange={(e)=>setName(e.target.value)} value={name} className="form-control" required/>
         
		 			</div>
						<div className="form-group">
							<label>enter page description</label>
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
				<button className='btn btn-primary  mt-2 col-12' onClick={handlesubmit} >Submit</button>
		

			</div>
				);
	
}
export default Pages;

