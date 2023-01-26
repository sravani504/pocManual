import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Addchapter from './components/Addchapter';
import Pages from './components/pages/Pages';
import EditPage from './components/pages/EditPage';
import EditChapter from './components/pages/Ckeditorapp';
import ReadChapter from './components/pages/ReadChapter';
import Ckeditorapp from './components/pages/Ckeditorapp';
import Add from './components/Add';



function App() {
  return (
    <div className="App">
        
      <Router>
      <Routes>
     <Route path="/" element={< Addchapter/>} />  
     {/* <Route path="/add" element={<Pages/>}/>   */}
     <Route path="/edit/:id" element={<EditPage/>}/> 
     <Route path="/add/:sub" element={<Add/>}/>
     {/* <Route path="/editchapter" element={<EditChapter/>}/>  */}
     {/* <Route path="/readChapter" element={<ReadChapter/>}/>  */}
      </Routes>
      </Router> 
    
      
    </div>

  
  
  );
}

export default App;
