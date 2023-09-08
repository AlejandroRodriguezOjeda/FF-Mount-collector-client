import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

function Navbar() {

  const navigate = useNavigate()

  const {isUserActive, verifyToken} = useContext(AuthContext)

  const handleLogout =() =>{
    localStorage.removeItem("authToken")
 
  verifyToken()

  navigate("/Login")
 }
  return (
    <div className='navbar'>

    <Link to="/">Home</Link> 

    {isUserActive === true 
    ? (
      <>
     <Link to="/Mounts">All mounts</Link> 
     <Link to="/my-profile">My profile</Link>
     <button onClick={handleLogout}>Logout</button>
     </>
    )
    : (
  <>
    <Link to="signup">Signup</Link> 
    <Link to="/Login">Login</Link> 
   </>
   
    )

}
    


    </div>
  )
}

export default Navbar