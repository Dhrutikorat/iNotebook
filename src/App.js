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

function App() {
  document.body.classList.add('content-wrapper');
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <ToastContainer />
          <div className="container mt-4">
            <Routes>
              {/* exact : to render excat match URL endpoint */}
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route excat path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/addNote" element={<Addnote />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
