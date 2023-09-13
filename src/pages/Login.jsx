import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function Login() {

  const {verifyToken} = useContext(AuthContext)

    const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const[errorMessage , setErrorMessage] = useState("")



  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here


    try {
        
        const response = await service.post("/auth/login",{
            email,
            password,
            username,
          
        })
        console.log(response);
      
        localStorage.setItem("authToken", response.data.authToken)
      
      
      await verifyToken()
      
      
        navigate("/Mounts")


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

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
      
      </Form.Group>
        <br />

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
      
      </Form.Group>

        <br />

  
        <Button variant="primary" type="submit">
     Login
      </Button>

        {errorMessage ? <p>{errorMessage}</p> : null}

      </form>
      
    </div>
  );
}

export default Login;