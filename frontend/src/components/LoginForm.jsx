import React, { useState } from "react"
import "../styles/Login.css"
import "../styles/General.css"
import Input from "./Input"

const LoginForm = ({ onLogin, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => 
  {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!value ? "El correo electrónico es obligatorio." : !validateEmail(value) ? "Formato de correo no válido." : "");
  };

  const handlePasswordChange = (e) => 
  {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!value ? "La contraseña es obligatoria." : "");
  };

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    if (!emailError && !passwordError && email && password) {
      onLogin({ email, password });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {errorMessage && <p className="login-error">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <Input label="Correo Electrónico" type="email" value={email} onChange={handleEmailChange} error={emailError} />
          <Input label="Contraseña" type="password" value={password} onChange={handlePasswordChange} error={passwordError} />
          <button type="submit" className="login-button" disabled={emailError || passwordError || !email || !password}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
