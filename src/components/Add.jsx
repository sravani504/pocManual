import React from 'react';
import Ckeditorapp from './pages/Ckeditorapp';
import { useState,useEffect } from 'react';
import { useNavigate,useParams,useLocation} from 'react-router-dom';
import { getChapters } from '../api';

const Add = () => {

    const [chapter,setChapter]=useState({}); 
    const [data, setData] = useState([]);
    const [pages, setPages] = useState([]);
    const [page,setPage]=useState({});
    const {sub}=useParams();
    const location=useLocation();
    console.log(chapter);
    
useEffect(()=>
{
  if(location && location.state){
    const {chapter}=location.state;
    setChapter(chapter);
  }
},[chapter])
  
    const navigate = useNavigate();

    const handleCallback = (childData) => {
        console.log(childData);
        setData(childData);
      }
      console.log(data);
    
      const fetchChapters = async () => {
        await getChapters().then((res) => {
          if (res) {
            setData(res.data);
          }
          else {
            console.log("No data");
          }
    
        })
      }
    
      useEffect(() => {
        fetchChapters();
      }, [])

    
    
  
  return (
    <div>
        <Ckeditorapp handleCallback={handleCallback} chapter={chapter} sub={sub}/>
    </div>
  );
}

export default Add;
