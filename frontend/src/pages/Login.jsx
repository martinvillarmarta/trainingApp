import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import "../styles/Login.css"
import axios from "axios"

const Login = () => 
{
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => 
  {
    setLoading(true);
    setErrorMessage("");

    try 
    {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home"); 
    } 
    catch (error) 
    {
      const message = "Error en el inicio de sesión";
      setErrorMessage(message);
      console.error(message, error)
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
