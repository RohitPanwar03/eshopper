import React, { useState } from 'react'
import Layout from './../../Components/Layout';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-hot-toast"
import { useAuth } from '../../Context/authContext';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    // HANDLE SUBMIT

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/auth/login", { email, password })

            if (res && res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || "/")
                toast.success(res.data.message)
            }
            else {
                toast.error(res.data.message)
            }
        }


        catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout >
            <div className='login-container'>

                <form className='login-form ' onSubmit={handleSubmit}>
                    <h1 className='login-form-heading'>
                        Login
                    </h1>

                    <div className="mb-4 mt-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />


                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                    </div>


                    <div className='login-btn'>
                        <button type="submit" className="btn btn-success ">Login</button>
                        <Link>
                            <button type="submit" className="btn btn-primary d-flex">? Forgot Password</button>
                        </Link>
                    </div>
                </form>

            </div>

        </Layout>
    )
}

export default Login
