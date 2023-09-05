import { useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router";

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
            password
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
        
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Signup</button>


        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
      
    </div>
  );
}

export default Signup;