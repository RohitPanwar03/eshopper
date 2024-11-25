import React, { useEffect, useState } from 'react'
import Layout from './../Components/Layout';
import { useCart } from '../Context/Cart';

const CartPage = () => {

    const [cart, setCart] = useCart()
    const [cartprice, setcartprice] = useState()
    const [deliveryfee, setdeliveryfee] = useState(0)
    const [totalprice, settotalprice] = useState()

    // PRICE

    const price = () => {
        try {
            let price = 0;
            cart.map(item => (
                price = price + item.price
            ));
            setcartprice(price);

            let totalPay = cartprice < 399 ? `${cartprice}` && setdeliveryfee(40) : price + deliveryfee
            if (price > 0) {
                settotalprice(totalPay)
            } else { settotalprice(0) }
        } catch (error) {
            console.log("Something went wrong")
        }
    }
    useEffect(() => {
        price()
    })


    // DELTE ITEM

    const removeCartItem = (pid) => {
        try {
            let mycart = [...cart]
            let index = mycart.findIndex((item) => item._id === pid)
            mycart.splice(index, 1)
            setCart(mycart)
            localStorage.setItem("cart", JSON.stringify(mycart));
        } catch (error) {
            console.log("Something went wrong")
        }
    }


    return (
        <Layout>
            <div className="container mb-3">
                <h1 className='m-4'>My Cart</h1>
                <div className="row d-flex">
                    <div className="bg-light col-md-6 " >
                        {cart.map((p) => (
                            <>
                                <div key={p._id} className='  d-flex flex-wrap align-items-center m-3' >
                                    <div className="col-md-5">
                                        <img src={`/api/v1/products/product-photo/${p._id}`} style={{ height: "150px" }} alt={p.name} />
                                    </div>
                                    <div className="col-md-4">

                                        <h3>{p.name}</h3>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p >Price : ₹ {p.price}</p>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex align-items-center  ">
                                                <button className='btn bg-white ' style={{ borderRadius: "50%" }}><span className="material-symbols-outlined">
                                                    remove
                                                </span></button>
                                                &nbsp;{0}&nbsp;
                                                <button className='btn bg-white ' style={{ borderRadius: "50px" }}><span className="material-symbols-outlined">
                                                    add
                                                </span></button>
                                            </div>
                                            <button className='btn bg-white m-2' style={{ borderRadius: "50px" }} onClick={() => removeCartItem(p._id)}>

                                                <span className="material-symbols-outlined" style={{ cursor: "pointer", fontSize: '40px', color: "red" }}>
                                                    delete
                                                </span>
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </>
                        ))}
                    </div>
                    <div className="col-md-5 m-4 p-4">

                        <h3>Price Details</h3>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <p>Price :</p>
                            <p>₹ {cartprice}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Delivey :</p>
                            <p>₹ {deliveryfee}</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <h5>Total Price :</h5>
                            <p>₹ {totalprice}</p>
                        </div>
                    </div>
                </div>

            </div>

        </Layout>
    )
}


export default CartPage
