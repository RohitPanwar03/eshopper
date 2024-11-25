import React from 'react'
import Layout from './../../Components/Layout';
import { Link } from 'react-router-dom';

const Dashboard = () => (
    <Layout>
        <div className='m-5 mt-4'>
            <h1>User Dashboard</h1>
            <div className='col-md-2 mt-4'>
                <div className="list-group">
                    <Link to={'/dashboard/admin/create-category'} className="list-group-item list-group-item-action " aria-current="true">
                        Profile
                    </Link>
                    <Link to={'/dashboard/admin/create-products'} className="list-group-item list-group-item-action">Orders</Link>


                </div>
            </div>
            <div className='col-md-10'></div>
        </div>
    </Layout>
)

export default Dashboard
