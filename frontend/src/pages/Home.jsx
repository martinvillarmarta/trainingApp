import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"
import Panel from "../components/Panel"
import Table from "../components/Table"
import WorkoutForm from "../components/WorkoutForm"
import "../styles/Home.css"
import "../styles/General.css"
import "../styles/WorkoutForm.css"

function Home() 
{
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const validateSession = useCallback(async () => 
  {
    if (!storedUser || !token) 
    {
      navigate("/");
      return;
    }

    try 
    {
      const response = await axios.get("http://localhost:5000/api/login", 
        { headers: { Authorization: `Bearer ${token}` }});

      if (!response.data.valid) 
      {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
      } 
      else 
      {
        setUser(JSON.parse(storedUser));
      }
    } 
    catch (error) 
    {
      console.error("Sesión caducada");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate, storedUser, token]);


  const loadExternalWorkouts = useCallback(async () => 
  {
    if (!storedUser) 
      return;
    
    const parsedUser = JSON.parse(storedUser);

    try 
    {
      const today = new Date();
      const formattedEndDate = today.toISOString().split("T")[0];
      today.setDate(today.getDate() - 2);
      const formattedStartDate = today.toISOString().split("T")[0];

      const response = await axios.get(`http://localhost:5000/api/user/${parsedUser.id}/workouts`, 
        { params: { startDate: formattedStartDate, endDate: formattedEndDate },
          headers: { Authorization: `Bearer ${token}` }});

      setWorkouts(response.data || []);
    } 
    catch (error) 
    {
      console.error("Error al obtener los entrenamientos: ", error);
      setWorkouts([]);
    }
  }, [storedUser, token]);

  const handleOnClick = () =>
  {
    validateSession();
    setShowForm(!showForm)
  }

  const handleSaveWorkout = async (newWorkout) => 
  {
    if (!storedUser) 
      return;
    
    const parsedUser = JSON.parse(storedUser);

    try 
    {
      validateSession();
      await axios.post(
        `http://localhost:5000/api/user/${parsedUser.id}/workouts`, newWorkout,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("Entrenamiento guardado correctamente");
      setShowForm(false);
      loadExternalWorkouts();

      setTimeout(() => setSuccessMessage(""), 3000);
    } 
    catch (error) 
    {
      console.error("Error guardando el entrenamiento: ", error);
    }
  };

  useEffect(() => 
  {
    validateSession();
    loadExternalWorkouts();
  }, [validateSession, loadExternalWorkouts]);

  if (!user) 
  {
    return <Loading />;
  }
   
  return (
    <div className="home">
      <Panel user={user} />
      <div className="workout-form-container">
        <button className="toggle-form-button" onClick={handleOnClick}>
          {showForm ? "Ocultar Formulario" : "Añadir Entrenamiento"}
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {showForm && <WorkoutForm onSave={handleSaveWorkout} />}
      </div>
      <Table data={workouts} />
    </div>
  );
}

export default Home;