import './App.css'
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"
import Home from './pages/Home';
import Cars from './pages/Cars';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavLink to="/">Home</NavLink> {" | "}
        <NavLink to="/Cars">Autók</NavLink> {" | "}
        <NavLink to="/Login">Bejelentkezés</NavLink> {" | "}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Cars' element={<Cars />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
