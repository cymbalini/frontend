import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth"

const RequireAuth = ( { allowedRoles}) =>{
    const {auth} = useAuth();
    const location = useLocation();
    return(
            allowedRoles?.includes(auth?.roles)
            ? <Outlet />
            : auth?.username
            ? <Navigate to="/home" state={{from: location}} replace />
            : <Navigate to="/login" state={{from: location}} replace />
    );
}

export default RequireAuth