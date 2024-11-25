
import './App.css';
import { Routes, Route } from "react-router-dom"
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import PNF from './Pages/PNF';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/User/Dashboard';
import { PrivateRoute } from './Pages/User/PrivateRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminRoute from './Pages/Admin/AdminRoute';
import CreateCategory from './Pages/Admin/CreateCategory';
import AdminOrders from './Pages/Admin/AdminOrders';
import Products from './Pages/Admin/Products';
import CreateProduct from './Pages/Admin/CreateProduct';
import UpdateProducts from './Pages/Admin/UpdateProducts';
import ProductDetails from './Pages/ProductDetails';
import CartPage from './Pages/CartPage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/single-product/:name' element={<ProductDetails />}></Route>
        <Route path='/cart' element={<CartPage />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/policy' element={<Policy />}></Route>
        <Route path='*' element={<PNF />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<PrivateRoute />}>

          <Route path='user' element={<Dashboard />}></Route>
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>

          <Route path='admin' element={<AdminDashboard />}></Route>
          <Route path='admin/create-category' element={<CreateCategory />}></Route>
          <Route path='admin/create-products' element={<CreateProduct />}></Route>
          <Route path='admin/orders' element={<AdminOrders />}></Route>
          <Route path='admin/products' element={<Products />}></Route>
          <Route path='admin/products/:name' element={<UpdateProducts />}></Route>
        </Route>


      </Routes>
    </div >
  );
}

export default App;
