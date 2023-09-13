import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap';

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
  <Nav fill variant="tabs"  >
    <Nav.Item>
      <Nav.Link as={Link} to="/"style={{ color: 'red' }}>Home</Nav.Link>
    </Nav.Item>

    {isUserActive === true ? (
      <>
        <Nav.Item>
          <Nav.Link as={Link} to="/Mounts"style={{ color: 'red' }}>All mounts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/my-profile"style={{ color: 'red' }}>My profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Button variant="link" onClick={handleLogout}style={{ color: 'red' }}>Logout</Button>
        </Nav.Item>
      </>
    ) : (
      <>
        <Nav.Item>
          <Nav.Link as={Link} to="/signup"style={{ color: 'red' }}>Signup</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/Login"style={{ color: 'red' }}>Login</Nav.Link>
        </Nav.Item>
      </>
    )}
  </Nav>
);
}

export default Navbar