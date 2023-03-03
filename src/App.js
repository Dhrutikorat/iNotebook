import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Addnote from './components/Addnote';
import { useState } from 'react';
import Alert from './components/Alert';
import Test from './components/Test';
import Viewnote from './components/Viewnote';

function App() {

  const colorNames = {
    "blue": "#b8d8d8",
    "green": "#d5e5a3",
    "yellow": "#ffe28c",
    "brown": "#d6c1ab",
    "purple": "#baa9ba",
    "orange": "#ff8f5e"
  };


  document.body.classList.add('content-wrapper');
  const [alert, setAlert] = useState(null);

  const showAleart = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar colorNames={colorNames}/>
          <Alert alert={alert} />
          <ToastContainer />
          <div className="container" style={{marginTop: '50px'}}>
            <Routes>
              {/* exact : to render excat match URL endpoint */}
              <Route exact path="/login" element={<Login showAleart={showAleart} />} />
              <Route exact path="/signup" element={<Signup showAleart={showAleart} />} />
              <Route excat path="/" element={<Home showAleart={showAleart} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/addNote" element={<Addnote showAleart={showAleart}  colorNames={colorNames}/>} />
              <Route exact path="/view/:title" element={<Viewnote showAleart={showAleart}  colorNames={colorNames}/>} />
              <Route exact path="/test" element={<Test />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
