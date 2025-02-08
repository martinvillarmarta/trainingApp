import { FiMail, FiLock } from "react-icons/fi"
import "../styles/General.css"
import "../styles/Input.css"

const Input = ({ label, type, value, onChange, error }) => {
  const Icon = type === "email" ? FiMail : FiLock;

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <Icon className="input-icon" />
        <input className="input-field" type={type} value={value} onChange={onChange} placeholder={label} />
      </div>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

export default Input;
