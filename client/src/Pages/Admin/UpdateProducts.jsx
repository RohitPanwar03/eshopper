import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProducts = () => {

    const navigate = useNavigate();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("")

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/categories");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);


    //Get Single Product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/products/single-product/${params.name}`);
            setName(data?.products.name)
            setDescription(data?.products.description)
            setPhoto(data?.products.photo)
            setPrice(data?.products.price)
            setQuantity(data?.products.quantity)
            setShipping(data?.products.shipping)
            setId(data?.products._id)
            setCategory(data?.products.category._id)

        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getSingleProduct();
    },
        // eslint-disable-next-line
        []);

    //create product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);
            const { data } = axios.put(
                `/api/v1/products/update-products/${id}`,
                productData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
            }
            getSingleProduct()
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    // DELETE PRODUCTS
    const handledelete = async () => {
        try {
            await axios.delete(`/api/v1/products/delete-products/${id}`)
            toast.success("Product Deleted Successfully")
            navigate("/dashboard/admin/products")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in deleting Product")
        }
    }


    return (
        <div className="mt-5">
            <div className="d-flex align-items-center mt-5 justify-content-center" >

                <div className="mt-5 w-75">
                    <Select
                        bordered={false}
                        placeholder="Select a category"
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                            setCategory(value);
                        }}
                        value={category}
                    >
                        {categories?.map((c) => (
                            <Option key={c._id} value={c._id}>
                                {c.name}
                            </Option>
                        ))}
                    </Select>
                    <div className="mb-4">
                        <label className="btn btn-outline-secondary w-100 mt-4">
                            {photo ? photo.name : "Upload Photo"}
                            <input
                                type="file"
                                name="photo"

                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                hidden
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        {photo ? (
                            <div className="text-center">
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt="product_photo"
                                    height={"200px"}
                                    className="img img-responsive"
                                />
                            </div>
                        ) : (
                            <div className="text-center">
                                <img
                                    src={`/api/v1/products/product-photo/${id}`}
                                    alt="product_photo"
                                    height={"200px"}
                                    className="img img-responsive"
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter a name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            type="text"
                            value={description}
                            placeholder="Write a description"
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="number"
                            value={price}
                            placeholder="Enter a Price"
                            className="form-control"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            value={quantity}
                            placeholder="Enter  quantity"
                            className="form-control"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            bordered={false}
                            placeholder="Select Shipping "
                            size="large"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setShipping(value);
                            }}

                            value={shipping ? "yes" : "no"}
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <button className="btn btn-primary m-2" onClick={handleUpdate}>
                            UPDATE PRODUCT
                        </button>
                        <button className="btn btn-danger m-2" onClick={handledelete}>
                            DELETE PRODUCT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProducts
