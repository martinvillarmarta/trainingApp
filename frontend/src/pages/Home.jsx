import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loading"
import Panel from "../components/Panel"
import "../styles/Home.css"
import "../styles/General.css"

function Home() {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    validateSession();
  }, [navigate]);

  if (!user) {
    return <Loading />
  }

  return (
    <div className="home">
      <Panel user={user} />
    </div>
  );
}

export default Home;
