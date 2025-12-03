import './App.css'
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"
import Home from './pages/Home';
import Cars from './pages/Cars';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavLink to="/">Home</NavLink> {" | "}
        <NavLink to="/Cars">Autók</NavLink> {" | "}
        <NavLink to="/Profile">Profil</NavLink> {" | "}
        <NavLink to="/Login">Bejelentkezés</NavLink> {" | "}
        <NavLink to="/Register">Regisztráció</NavLink>
        

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Cars' element={<Cars />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;