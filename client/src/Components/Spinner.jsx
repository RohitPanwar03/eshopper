import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom"


const Spinner = () => {

    const [count, setcount] = useState(3);
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {

        const interval = setInterval(() => {
            setcount((value) => --value);
        }, 1000);
        if (count === 0) {

            navigate(`/login`, {
                state: location.pathname,
            });
        }
        return () => clearInterval(interval);
    }, [count, navigate, location.pathname])

    return (
        <>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <h1 className="Text-center">Redirecting to Login Page in {count} second </h1>

            </div>
        </>
    )
}

export default Spinner
