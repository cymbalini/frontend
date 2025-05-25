import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/nothome")}>protected home</button>
            <button onClick={() => navigate("/workeronly")}>protected home</button>
        </div>
    );
};

export default Home;
