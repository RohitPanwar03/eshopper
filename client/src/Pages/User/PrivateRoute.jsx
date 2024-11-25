import { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContext";
import { Outlet } from "react-router-dom"
import axios from "axios";
import Spinner from './../../Components/Spinner';



export function PrivateRoute() {

    const [auth] = useAuth()
    const [ok, setok] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("/api/v1/auth/user-auth", {
                headers: { "Authorization": auth?.token }
            });
            if (res.data.ok) {
                setok(true)
            } else {
                setok(false)
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token])
    return ok ?
        <Outlet />
        : <Spinner />
}

export default PrivateRoute
