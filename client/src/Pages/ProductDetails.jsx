import React, { useEffect, useState } from 'react'
import Layout from './../Components/Layout';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [product, setproduct] = useState({})
    const [relatedproduct, setrelatedproduct] = useState([])


    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/products/single-product/${params.name}`)
            setproduct(data?.products)
            similarproducts(data?.products._id, data?.products.category._id)
        } catch (error) {
            console.log(error.message)
            toast.error("Something went wrong in Getting Product")
        }
    }

    useEffect(() => {
        getSingleProduct()
    },
        // eslint-disable-next-line
        [])

    // SIMILAR PRODUCT FUNCTION

    const similarproducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/products/similar-products/${pid}/${cid}`)
            setrelatedproduct(data?.products)
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <Layout>
            <div className="container border mt-5">
                <div className="d-flex justify-content-around flex-wrap ">
                    <div className="col-md-4 p-5" style={{ height: "400px", width: "400px", fontWeight: "700px" }}>
                        <img src={`/api/v1/products/product-photo/${product._id}`} className='h-100 w-100' alt={product.name} />
                    </div>
                    <div className="col-md-8 p-5 ">
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <h4 >₹ {product.price} </h4>
                        <p >Only {product.quantity} left </p>
                        <hr />
                        <button className='btn  btn-warning w-100 mt-4 '>Buy Now</button>
                        <button className='btn  btn-primary w-100 mt-4' onClick={() => navigate("/cart")}>Add to Cart</button>
                    </div>
                </div>
                <hr />
                <div className="d-flex">
                    {JSON.stringify(relatedproduct)}
                    {relatedproduct.map(p => (
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>

                            </div>
                        </div>

                    ))}

                </div>
            </div>

        </Layout >
    )
}

export default ProductDetails
