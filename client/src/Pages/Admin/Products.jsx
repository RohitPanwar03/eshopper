
import React, { useEffect, useState } from 'react'
import Layout from './../../Components/Layout';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';


const Products = () => {

    const [products, setproducts] = useState([])




    // GET ALL PRODUCTS

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/products/getall-products");
            if (data?.success) {
                setproducts(data?.products)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in getting Products")
        }
    }


    useEffect(() => {
        getAllProducts()
    },
        // eslint-disable-next-line
        [])




    return (
        <Layout>
            <div className='m-5 mt-4 d-flex justify-content-between'>
                <div className='col-md-3'>

                    <h1>All Products</h1>
                    <div className=' mt-4'>
                        <div className="list-group">
                            <Link to={'/dashboard/admin/create-category'} className="list-group-item list-group-item-action " >
                                Create Category
                            </Link>
                            <Link to={'/dashboard/admin/create-products'} className="list-group-item list-group-item-action" >Create Products</Link>
                            <Link to={'/dashboard/admin/products'} className="list-group-item list-group-item-action active" >All Products</Link>
                            <Link to={'/dashboard/admin/orders'} className="list-group-item list-group-item-action " aria-current="true">Orders</Link>

                        </div>
                    </div>
                </div>
                <div className='col-md-9  p-5 mt-4 w-75'>

                    <div className="d-flex flex-wrap">
                        {products?.map(p => {
                            return (
                                <>
                                    <Link to={`/dashboard/admin/products/${p.name}`} style={{ textDecoration: "none" }} >
                                        <div className="card text-center m-2" key={p._id} style={{ width: '18rem' }}>
                                            <img src={`/api/v1/products/product-photo/${p._id}`} style={{ height: "300px" }} className="card-img-top" alt={p.name} />
                                            <div className="card-body">
                                                <h5 className="card-title mt-2">{p.name}</h5>
                                                <p className="card-text">{p.description.substring(0, 20)}...</p>
                                                <p className="card-text">₹ {p.price}</p>

                                            </div>
                                        </div>
                                    </Link >

                                </>


                            )
                        })}


                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default Products
