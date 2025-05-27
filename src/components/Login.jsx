import { useEffect, useRef, useState, useContext } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";


const LOGIN_URL = "/login"

const Login = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from.pathname || "/home"

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                { username, password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
            const token = response?.data?.token;
            const roles = response?.data?.role
            const id = response?.data?.id
            console.log(username)
            setAuth({id,username, password, roles, token})
            setUser('')
            setPassword('')
            navigate(from, {replace: true})
            
        } catch (error) {
            if(!error?.response){
                setErrMsg("no Server Response")
            }
            else if(error.response?.status === 400){
                setErrMsg("missing username or password")
            }
            else if (error.response?.status === 401){
                setErrMsg("Unauthorized")
            }
            else{
                setErrMsg("login failed")
            }
            errRef.current.focus();
        }


    }


    return (


        <div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
            >{errMsg}</p>
            <h1>Zaloguj się</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email:</label>
                <input type="text" id="username" ref={userRef} autoComplete="off"
                onChange={(e) => setUser(e.target.value)} value={username} required
                />
                <label htmlFor="password">Hasło:</label>
                <input type="password" id="password"
                onChange={(e) => setPassword(e.target.value)} value={password} required
                />
                <button>Zaloguj</button>
            </form>
        </div>
    )
}

export default Login