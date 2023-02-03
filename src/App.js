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

function App() {
  document.body.classList.add('content-wrapper');
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container mt-4">
            <Routes>
              {/* exact : to render excat match URL endpoint */}
              <Route excat path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
