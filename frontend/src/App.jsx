import './App.css'
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"
import { useState } from 'react';
import Home from './pages/Home';
import Cars from './pages/Cars';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = async () => {
    setIsLoggedIn(false);
    const res = await fetch('http://localhost:3000/auth/logout',{
      credentials: 'include',
      method: 'POST'
    })
    console.log(await res.json())
  }

  return (
    <BrowserRouter>
      <div className="navbar-wrapper">
        <nav>
          {isLoggedIn ? (
            <>
              <NavLink to="/Profile">Profil</NavLink>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/Cars">Autó feltöltés</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/Login">Bejelentkezés</NavLink>
              <NavLink to="/Register">Regisztráció</NavLink>
            </>
          )}
        </nav>
      </div>

      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Cars' element={<Cars />} />
          <Route path='/Login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Profile' element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;