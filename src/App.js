import './App.css';
import { Routes, Route as Router, BrowserRouter } from "react-router-dom";
import { Home } from './components/Page/Home';
import { Login } from './components/Page/Login';
import { Menu } from './components/Page/Menu';
import { NotFound } from './components/Page/NotFound';

function App () {
  return (
    <BrowserRouter>
        <Routes>
          <Router exact path="/" element={<Home />}  />
          <Router exact path="/login" element={<Login/>} />
          <Router exact path="/menu" element={<Menu/>} />
          <Router path="*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
