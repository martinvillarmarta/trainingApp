import React, { useState } from "react"
import "../styles/WorkoutForm.css"
import "../styles/General.css"

const WorkoutForm = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    if (title.trim() && date) 
    {
      onSave({ title, date });
      setTitle("");
      setDate("");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Título</label>
          <input type="text" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} required/>
        </div>
        <button type="submit" className="form-button">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
