import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { toast } from 'react-hot-toast';
import { Badge } from 'antd';
import { useCart } from '../Context/Cart';


const Header = () => {

    const [auth, setauth] = useAuth();
    const [cart] = useCart()

    const handleLogout = () => {
        setauth({
            ...auth,
            user: null,
            token: ""

        })
        localStorage.removeItem("auth")
        toast.success("Logout Successfully")
    }

    return (
        <div >
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ height: "100px" }}>
                <div className="container-fluid m-4">
                    <Link className="navbar-brand d-flex align-items-center" style={{ fontSize: "25px", fontWeight: "300px" }} to={"/"}><span className="material-symbols-outlined m-2">
                        storefront
                    </span>E-MART</Link>

                    <form className="d-flex m-3 w-25" style={{ backgroundColor: "white" }} role="search">
                        <input className='form-control w-100' style={{ border: "none", borderRadius: "20px" }} type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn" type="submit"><span className="material-symbols-outlined">
                            search
                        </span></button>
                    </form>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                            {!auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={"/login"}>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/register"}>SignUp</Link>
                                    </li>
                                </>
                            ) : (<>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth.user.name}
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item m-2" to={`/dashboard/${auth?.user.role === 1 ? "admin" : "user"}`}>Profile</Link></li>
                                        <li><hr className="dropdown-divider" /></li>



                                        <li ><Link className="dropdown-item d-flex align-items-center" onClick={handleLogout} to={"/login"}><span className="material-symbols-outlined m-1">
                                            logout
                                        </span>  Logout</Link></li>

                                    </ul>
                                </li>

                            </>)}

                            <li className="nav-item">
                                <Link to={"/cart"} className="nav-link d-flex align-items-center" aria-disabled="true"><Badge count={cart.length} showZero><span className="material-symbols-outlined">
                                    shopping_cart
                                </span>
                                </Badge></Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>


        </div >
    )
}

export default Header
