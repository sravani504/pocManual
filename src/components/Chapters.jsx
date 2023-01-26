import React from 'react';
import Ckeditorapp from './pages/Ckeditorapp';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChapters } from '../api';

const Chapters = () => {

    const [chapter,setChapter]=useState({}); 
    const [data, setData] = useState([]);
    const [pages, setPages] = useState([]);
    const [page,setPage]=useState({});

  
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

      const handleEdit = (chapter) => {
        setChapter(chapter);
      }
    
  
  return (
    <div>
        <Ckeditorapp handleCallback={handleCallback} chapter={chapter}/>
    </div>
  );
}

export default Chapters;
