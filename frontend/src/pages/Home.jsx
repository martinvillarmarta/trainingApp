import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"
import Panel from "../components/Panel"
import Table from "../components/Table"
import "../styles/Home.css"
import "../styles/General.css"

function Home() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  const validateSession = async () => {
    try 
    {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!user || !token) {
            navigate("/");
            return;
        }
    
        const response = await axios.get("http://localhost:5000/api/login", 
             { headers: { Authorization: `Bearer ${token}` }});
    
        if (!response.data.valid)
        {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/");
            return;
        }
        setUser(JSON.parse(user));
    } 
    catch 
    {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const loadExternalWorkouts = async () => {
    try 
    {
        const today = new Date();
        const formattedEndDate = today.toISOString().split("T")[0]; 
        today.setDate(today.getDate() - 2);
        const formattedStartDate = today.toISOString().split("T")[0];

        const storedUser = localStorage.getItem("user");
        const User = JSON.parse(storedUser);
        const userId = User.id;
        const url = new URL(`http://localhost:5000/api/user/${userId}/workouts`);
        const response = await axios.get(url.toString(), 
          { params: { startDate: formattedStartDate, endDate: formattedEndDate }});
        
        if (!response.data || response.data.length === 0) 
        {
            setWorkouts([]);
            return;
        }
        setWorkouts(response.data);         
    }
    catch (error)
    {
      console.log("Error al obtener los entrenamientos" + error) 
    }
  }


  useEffect(() => {
    validateSession();
    loadExternalWorkouts();
  }, [navigate]);

  if (!user) {
    return <Loading />
  }

  return (
    <div className="home">
      <Panel user = {user} />
      <Table data = {workouts} />
    </div>
  );
}

export default Home;
