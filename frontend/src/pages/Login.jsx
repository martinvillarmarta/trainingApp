import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import "../styles/Login.css"
import axios from "axios"

const Login = () => 
{
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => 
  {
  }, [errorMessage, loading]);

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
      const message = error.response?.data || "Error en el inicio de sesión";
      setErrorMessage(message);
    } 
    finally
    {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <LoginForm onLogin={handleLogin} errorMessage={errorMessage} loading={loading} />
    </div>
  );
};

export default Login;
