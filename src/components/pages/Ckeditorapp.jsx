import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Upload Adapter
import UploadAdapter from  "../../api/UploadAdapter";
import { posts,getChapters,editChapters,editPages,addPage} from "../../api";
import { Link } from "react-router-dom";
// Server URL
// const URL = "http://localhost:8000/api/v1/upload/"; // for example

// Custom Upload Adapter Plugin function
function CustomUploadAdapterPlugin(editor) {
	editor.plugins.get("FileRepository").createUploadAdapter = loader => {
		// Create new object and pass server url
		return new UploadAdapter(loader, URL);
	};
}

const Ckeditorapp =({handleCallback,chapter,page,sub})=> {
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
    console.log(chapter);
		const fetchChapters =async()=>
		{
			await getChapters().then((res)=>{
				if(res)
				{
					handleCallback(res.data);
				}
				else{
					handleCallback("No data")
				}

			})
		}

		const handleSubmit=async()=>
		{
			console.log(chapter);
		if(sub==="page")
		{
		await addPage(chapter._id,{name,data:state.data})
		      .then((res)=>
			  {
				if(res){
					fetchChapters();
					navigate('/');
				}else
				{
					console.log("nothing");
				
				}

			  })
			// await editChapters(chapter._id,{name,data:state.data})
			// .then((res)=>{
			// 	if(res)
			// 	{
			// 		console.log(res);
			// 		fetchChapters();
					
					
			// 	}
			// 	else{
			// 		console.log("nothing");
			// 	}
			// }
			// )
			console.log("adding page");

		}else{
			await posts({name,data:state.data})
			.then((res)=>
			{
				if(res)
				{
					console.log(res);
					fetchChapters();
					navigate("/");
				}
				else{
					console.log("nothing");
				}
			})
		}
			

		}

// useEffect(()=>{
// 	console.log(typeof(chapter));
//    if(Object.keys(chapter || {}).length >0 ){
// 	setName(chapter?.name);
//     setState({...state, data:chapter?.description});
//    }
  
// },[chapter]);



		return (
          <div className="container-md">
					
				<div className="form-group">
							<label>enter {sub} name</label>
							<input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="enter name" className="form-control" required/>
         
		 			</div>
						<div className="form-group">
							<label>enter {sub} description</label>
					
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
				<button className='btn btn-primary  mt-2 col-12' onClick={handleSubmit}>Submit</button>
		

			</div>
				);
	
}
export default Ckeditorapp;
