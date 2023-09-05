import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Mounts from './pages/Mounts'
import MountDetails from './pages/MountDetails'
import Profile from './pages/Profiles/MyProfile'

function App() {
  

  return (
    <>
<Navbar />

      <Routes>

          <Route path="/" element={<Home />}/>
          <Route path='signup' element={<Signup />}/>
          <Route path='login' element={<Login />}/>
          <Route path='Mounts' element={<Mounts />}/>
          <Route path=':id' element={<MountDetails />}/>
          <Route path='my-profile' element={<Profile />}/>
          




      </Routes>
    </>
  )
}

export default App
