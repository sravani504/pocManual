import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Addchapter from './components/Addchapter';
import EditPage from './components/pages/Edit';
import EditChapter from './components/pages/Ckeditorapp';
import Ckeditorapp from './components/pages/Ckeditorapp';
import Add from './components/Add';
import View from './components/pages/View';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Addchapter />} />  
          <Route path="/edit/:id" element={<EditPage />}/> 
          <Route path="/add/:sub" element={<Add />}/>
          <Route path='/view' element={<View />} />
          {/* <Route path="/editchapter" element={<EditChapter/>}/>  */}
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
