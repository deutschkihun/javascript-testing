import './App.css';
import { Routes, Route as Router, BrowserRouter } from "react-router-dom";
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';

function App () {
  return (
    <BrowserRouter>
        <Routes>
          <Router exact path="/" element={<Home />}  />
          <Router exact path="/login" element={<Login/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
