import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const NotHome = () => {
    const navigate = useNavigate();
    const {auth} = useAuth()
const fetchUsers = async () => {
        try {
            const response = await axios.get('./allusers', {
                headers: {
                    'Authorization': `Bearer ${auth.token}` // 'Authorization', not 'Authentication'
                },
                withCredentials: true
            });
            console.log(response.data); // Do something with the data
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    fetchUsers()
    return(
        <div>
            <h1>menager only</h1>
            <button onClick={() => navigate("/home")}>home</button>
        </div>
    )
}

export default NotHome