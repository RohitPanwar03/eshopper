
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Layout from './../../Components/Layout';
import { toast } from "react-hot-toast";



const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")



    const navigate = useNavigate()

    // HANDLE SUBMIT

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/auth/register", { name, email, password, phone, address })

            if (res && res.data.success) {

                navigate("/login")

                toast.success(res.data.message)

            }
            else {
                toast.error(res.data.message)
            }
        }


        catch (error) {
            toast.error(error)

        }
    }
    return (
        <Layout >
            <div className='register-container'>

                <form className='register-form' onSubmit={handleSubmit}>
                    <h1 className='register-form-heading'>
                        SignUP
                    </h1>
                    <div className="register-input mb-2 mt-4">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />


                    </div>
                    <div className="mb-2">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    <div className="mb-2">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="text" className="form-control" id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                        <input type="number" className="form-control" id="exampleInputPhone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputAddress" value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-primary ">SignUp</button>
                </form>

            </div>

        </Layout>
    )
}

export default Register
