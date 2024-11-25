

import React, { useEffect, useState } from 'react'
import Layout from './../Components/Layout';
import axios from 'axios';
import { Checkbox, Radio } from "antd"
import { Prices } from '../Components/prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cart';
import toast from 'react-hot-toast';

const HomePage = () => {

    const [cart, setCart] = useCart()

    const navigate = useNavigate()

    const [categories, setcategories] = useState([])
    const [products, setproducts] = useState([])
    const [checked, setchecked] = useState([])
    const [radio, setradio] = useState([])

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/categories");
            if (data?.success) {
                setcategories(data?.category);
            }
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => { getAllCategory() },
        // eslint-disable-next-line
        [])



    // GET ALL PRODUCTS

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/products/getall-products");
            if (data?.success) {
                setproducts(data?.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // FILTER CATEGORIES
    const handlecheck = (value, id) => {

        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter((c) => c !== id)
        }
        setchecked(all)
    }


    // FILTER PRODUCT
    const filterproduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/products/filter-product", { checked, radio })
            setproducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (!checked.length || !radio.length) { getAllProducts() }
    },

        [checked.length, radio.length])

    useEffect(() => {

        if (checked.length || radio.length) { filterproduct() }
    },

        [checked, radio])

    return (
        <Layout>
            <div className="row p-4 w-100 ">
                <div className="col-md-2  d-flex flex-column p-5">
                    <h4 >Filter</h4>
                    <h5 className='mt-4'>Categories</h5>
                    <div className='d-flex flex-column p-3 '>
                        {categories.map(c => (
                            <Checkbox key={c._id} onChange={(e) => handlecheck(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        )
                        )}
                    </div>
                    <h5 className='mt-4'>Prices</h5>
                    <div className='d-flex flex-column p-3 '>
                        <Radio.Group onChange={(e) => setradio(e.target.value)} >
                            {
                                Prices.map(p => (
                                    <div key={p._id}>

                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))
                            }

                        </Radio.Group>
                    </div>
                    <button className='btn btn-primary mt-3' onClick={() => window.location.reload()}>Reset</button>
                </div>
                <div className="col-md-10  mt-5 ">

                    <h1>Best Deals </h1>
                    <div className="d-flex m-3 flex-wrap ">


                        {products.map(p => (

                            <div className="card m-4" key={p._id} style={{ width: '20rem' }}>
                                <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" style={{ height: "300px", borderRadius: "10px" }} alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 25)}...</p>
                                    <p className="card-text ">₹ {p.price}</p>
                                    <button className='btn btn-info w-100 mb-3' onClick={() => navigate(`/single-product/${p.name}`)}>More Details...</button>
                                    <button className='btn btn-primary  w-100' onClick={() => {
                                        setCart([...cart, p])
                                        localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                        toast.success("Item added to cart")
                                    }}
                                    >Add to Cart</button>

                                </div>
                            </div>


                        ))}
                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default HomePage
