import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Ckeditorapp from './pages/Ckeditorapp'
import { getChapters } from '../api';
import { useNavigate } from 'react-router-dom';



const Addchapter = ({ handleChange, ...props }) => {

  // const [modal, setmodal] = useState("");
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [chapter, setChapter] = useState({});
  const [page,setPage]=useState({});
  const {id}=useParams();
  const location=useLocation();
  console.log(chapter);


  const navigate = useNavigate();



  //  const API_URL = "https://noteyard-backend.herokuapp.com"
  const UPLOAD_ENDPOINT = "api/blogs/uploadImg";

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


  // const handleCallbackPages = (childData) => {
  //   console.log(childData);
  //   setData(childData);
  // }
  console.log(data);



  // const fetchPages = async () => {
  //   await getPages().then((res) => {
  //     if (res) {

  //       setPages(res.data);

  //     }
  //     else {
  //       console.log("No data");
  //     }

  //   })
  // }

  // console.log(pages);

  // useEffect(() => {
  //   fetchPages();

  // }, [])

  const handleEdit = (data,subject) => {
    console.log({data,subject});
    setChapter(data);
    navigate(`/edit/${data._id}`,{state:{data,subject}});
    
  }
    // const handleEdit=(chapter)=>
    // {
    //    if(id===chapter._id){
    //     setChapter(chapter);
    //     navigate(`/edit/:${id}`);
    //    }
    //    else{
    //     console.log("nothing passed");
    //    }
    // }


  const handleEditPage=(page)=>
  {
     setPage(page);
  }
  const handleView = (data) => {
    if(data){
      navigate("/view", {state: {data}})
    }
  }
  return (

    <div className='container-md'>
      <div className='container'>
      </div>
      <h1 >User Manuals</h1>
      <Link to="/add/chapter">
      <button className='btn btn-primary mt-2' style={{ marginLeft: "90%" }}  >Add Chapter</button>
      </Link>

      {/* <Ckeditorapp handleCallback={handleCallback} chapter={chapter}  /> */}

      <div>
        <Accordion>
          {
            data && data.length > 0 ?
              data.map((chapter, index) => {
                return <Accordion.Item key={index} eventKey={index}>
                  <Accordion.Header>{chapter.name}
                  </Accordion.Header>

                  <Accordion.Body>
                    <button className='btn btn-primary' onClick={() => handleView(chapter)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    {/* <Link to="/chapters">
                   <button onClick={() => handleEdit(chapter)}> <FontAwesomeIcon icon={faEdit} /></button>
                    </Link> */}
                 
                    <button className='btn btn-primary' onClick={() => handleEdit(chapter,"editChapter")}> <FontAwesomeIcon icon={faEdit} /></button>
               
                    
                      <button className='btn btn-primary mt-2' style={{ marginLeft: "90%" }} onClick={()=>navigate('/add/page',{state:{id:chapter._id}})}>Add Page</button>
                    

                    <nav>
                      <ul>
                        {
                          chapter.pages && chapter.pages.length > 0 ?
                            chapter.pages.map((page, index) => {
                              return <li key={index}>
                                {page.name}
                                <button className='btn btn-primary' onClick={() => handleView(page)}>
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className='btn btn-primary' onClick={() => handleEdit(page,{subj:"editPage",cid: chapter._id})}> <FontAwesomeIcon icon={faEdit} /></button>
                              </li>
                            }
                            )
                            :
                            <h1>No data</h1>
                        }
                      </ul>
                    </nav>
                  </Accordion.Body>
                </Accordion.Item>
              }
              )
              : <p>No data</p>
          }
        </Accordion>
      </div>
    </div>
  );
}

export default Addchapter;
