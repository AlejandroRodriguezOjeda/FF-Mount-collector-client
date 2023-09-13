import { useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Signup() {

    const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const[errorMessage , setErrorMessage] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    // ... signup logic here

    try {
        await service.post("/auth/signup",{
            username,
            email,
            password,
        
        })

        navigate("/login")
    } catch (error) {
        console.log(error);
        if(error.response && error.response.status === 400){
                setErrorMessage(error.response.data.errorMessage)
        }else{
            navigate("/error")
        }
    }
  };

  return (
    <div>

      <h1>Sign Up</h1>
    
      <form onSubmit={handleSignup}>
        
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
      
      </Form.Group>

        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

        <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
      
      </Form.Group>

        <br />

         <Button variant="primary" type="submit">
        SignUp
      </Button>


        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
      
    </div>
  );
}

export default Signup;