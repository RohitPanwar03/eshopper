import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-hot-toast";
import { Modal } from 'antd';


const CreateCategory = () => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState([]);
    const [visible, setvisible] = useState(false)
    const [updatedname, setupdatedname] = useState("")
    const [selected, setselected] = useState(null)


    // HANDLE CREATE CATEGORY
    const handleformsubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", { name });
            if (data?.success) {
                toast.success(`${name} is Created`)
            } else {
                toast.error(data.message)
            }

            setName("")
        } catch (error) {
            console.log(error)
        }
    }

    // GET ALL CATEGORIES

    const getallCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/categories");
            if (data?.success) {
                setCategory(data?.category)
            }
            getallCategory()

        } catch (error) {
            console.log(error)
            toast.error("Error in Getting Categories")
        }
    }

    // UPDATE CATEGORY
    const handleupdatecategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedname })
            if (data.success) {
                toast.success("Category Updated Successfully")
            }
            setupdatedname("")
            setvisible(false);
            getallCategory()
        } catch (error) {
            console.log(error)
        }
    }


    // DELETE CATEGORY
    const handledeletecategory = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`);
            if (data?.success) {

                toast.success("Category Deleted Succesfully")
            }
            getallCategory()
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getallCategory()
    },
        // eslint-disable-next-line
        [])
    return (
        <Layout>
            <div className='m-5 mt-4 d-flex justify-content-between'>
                <div className='col-md-3 mt-4 '>

                    <h1>Create Category</h1>
                    <div className="list-group mt-4">
                        <Link to={'/dashboard/admin/create-category'} className="list-group-item list-group-item-action active" aria-current="true">
                            Create Category
                        </Link>
                        <Link to={'/dashboard/admin/create-products'} className="list-group-item list-group-item-action" >Create Products</Link>
                        <Link to={'/dashboard/admin/products'} className="list-group-item list-group-item-action" >All Products</Link>
                        <Link to={'/dashboard/admin/orders'} className="list-group-item list-group-item-action">Orders</Link>

                    </div>

                </div>


                <div className='col-md-9 p-5 mt-5 w-75'>
                    <div className="category-form">

                        <form onSubmit={handleformsubmit}>
                            <div className="mb-3 w-50">
                                <input type="text" className="form-control" placeholder='Enter Category Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                    <div className="w-75 mt-5">
                        <table className="table table-striped text-center rounded table-bordered">
                            <thead >
                                <tr>

                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody >
                                {category?.map(c => (

                                    <>
                                        <tr >

                                            <td className='p-4' key={c._id}> {c.name}</td>
                                            <td >
                                                <button className='btn btn-primary m-2' onClick={() => { setvisible(true); setupdatedname(c.name); setselected(c) }}>Edit</button>
                                                <button className='btn btn-danger ' onClick={() => { handledeletecategory(c._id); }}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                ))}


                            </tbody>
                        </table>

                    </div>
                    <Modal className='w-50 ' onCancel={() => setvisible(false)} open={visible} footer={null} >

                        <div>
                            <form onSubmit={handleupdatecategory}>
                                <div className="mb-3 w-75 d-flex flex-column justify-content-center">
                                    <label htmlFor="inputname" className="form-label">Category Name</label>

                                    <input type="text" className="form-control" id="inputname" value={updatedname} onChange={(e) => { setupdatedname(e.target.value) }} />

                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>
                    </Modal>


                </div>
            </div>

        </Layout >
    )
}

export default CreateCategory
