import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";


const Login = () => {
  const { user, loading, handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(username, password);

    navigate("/")
  };

  if(loading){
   return <main>
      <h1>Loading...</h1>
    </main>
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <button
            className="button primary-button"
            type="submit"
            
          >
            Login
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <button 
          className="button google-button" 
          onClick={() => window.location.href = 'http://localhost:3000/auth/google'}
        >
          <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google logo" />
          Login with Google
        </button>

        <p>
          Don't have an account? <Link to="/register">Create One.</Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
