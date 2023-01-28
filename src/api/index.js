
import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'})
        
 export const posts = (authData) => API.post('/posts/add', authData);
 export const getChapters = ()=> API.get('/posts/getchapters');
//  export const pages =(pageData) => API.post('/pages/addpage',pageData);
//  export const getPages=()=>API.get('/pages/getpages');
 export const editChapters=(id,updatedData)=>API.patch(`/posts/add/update/${id}`,updatedData)
 export const editPages=(id,updatedData)=>API.patch(`/posts/editPage/${id}`,updatedData)
 export const addPage=(id,pageData)=>API.patch(`/posts/addpage/${id}`,pageData)
