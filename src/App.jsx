import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Mounts from "./pages/Mounts";
import MountDetails from "./pages/MountDetails";
import Profile from "./pages/Profiles/MyProfile";
import AddToFavorites from "./pages/AddToFavorites";
import Favorite from "./pages/Favorite";
import IsPrivate from "./components/isPrivate";
import OtherProfiles from "./pages/Profiles/OtherProfiles";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />

   
        <Route path="Mounts" element={ <IsPrivate><Mounts /></IsPrivate>} />
        <Route path=":id" element={<IsPrivate><MountDetails /></IsPrivate>} />
        <Route path="my-profile" element={<IsPrivate><Profile /></IsPrivate>} />
        <Route path="/new-favorite/:id" element={<IsPrivate><AddToFavorites /></IsPrivate>}/>
        <Route path="/mounts/:favoriteId" element={<IsPrivate><Favorite /></IsPrivate>}/>
        <Route path="/user/:userId/details" element={<IsPrivate><OtherProfiles/></IsPrivate>} />
        
       
      </Routes>
    </>
  );
}

export default App;
