import { useNavigate } from "react-router-dom";

const WorkerOnly = () => {
    const navigate = useNavigate();
    return(
        <div>
            <h1>workeronly</h1>
            <button onClick={() => navigate("/home")}>protected home</button>
        </div>
    )
}

export default WorkerOnly