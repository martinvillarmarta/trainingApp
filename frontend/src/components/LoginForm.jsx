import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "./Input"
import Loading from "./Loading"
import "../styles/General.css"
import "../styles/Login.css"
import axios from 'axios'

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!value ? "El correo electrónico es obligatorio." : !validateEmail(value) ? "Formato de correo no válido." : "");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!value ? "La contraseña es obligatoria." : "");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try 
    {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home"); 
    } 
    catch (error) 
    {
      if (error.response.status === 401)
      {
        setError("Credenciales incorrectas");
      }
      else
      {
        setError(error.response.error);
      }
    } 
    finally 
    {
      setLoading(false);
    }
 };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <Input label="Correo Electrónico" type="email" value={email} onChange={handleEmailChange} error={emailError}/>
        <Input label="Contraseña" type="password" value={password} onChange={handlePasswordChange} error={passwordError}/>
        <button className="login-button" onClick={handleLogin} disabled={loading || emailError || passwordError || !email || !password}>
        {loading ? <Loading /> : "Iniciar sesión"}
        </button>
      </div>
    </div>
  );
};  

export default LoginForm;
