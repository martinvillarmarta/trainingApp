import "../styles/Panel.css"
import "../styles/General.css"

const Panel = ({ user }) => {
  return (
    <div className="panel">
      <h2>¡Bienvenid@!</h2>
      <p>
        <strong>Email:</strong> {user.email} <br />
        <strong>Fecha de nacimiento:</strong> {new Date(user.dateOfBirth).toLocaleDateString()} <br />
        <strong>Edad:</strong> {user.age} años
      </p>
    </div>
  );
  }
  
  export default Panel;
  