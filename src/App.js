import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import CustomRoutes from "./components/route/RouteObjects";

// import Header from "./components/layout/Header";
// import Footer from "./components/layout/Footer";
import Loader from "./components/layout/Loader";

import Home from "./components/Home";
import Dashboard from "./components/app";
// import ProductDetails from "./components/product/ProductDetails";

// // Cart Imports
// import Cart from "./components/cart/Cart";
// import Shipping from "./components/cart/Shipping";
// import ConfirmOrder from "./components/cart/ConfirmOrder";
// import Payment from "./components/cart/Payment";
// // import PaymentTest from './components/cart/PaymentTest'
// import OrderSuccess from "./components/cart/OrderSuccess";

// // Order Imports
// import ListOrders from "./components/order/ListOrders";
// import OrderDetails from "./components/order/OrderDetails";

// Auth / User Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
// import Profile from "./components/user/Profile";
// import UpdateProfile from "./components/user/UpdateProfile";
// import UpdatePassword from "./components/user/UpdatePassword";
// import ForgotPassword from "./components/user/ForgotPassword";
// import NewPassword from "./components/user/NewPassword";

// Admin Imports
// import DashboardAdmin from "./components/admin/Dashboard";
// import ProductsList from './components/admin/ProductsList'
// import NewProduct from './components/admin/NewProduct'
// import UpdateProduct from './components/admin/UpdateProduct'
// import OrdersList from './components/admin/OrdersList'
// import ProcessOrder from './components/admin/ProcessOrder'
// import UsersList from './components/admin/UsersList'
// import UpdateUser from './components/admin/UpdateUser'
// import ProductReviews from './components/admin/ProductReviews'

// import ProtectedRoute from "./components/route/ProtectedRoute";
// import { loadUser } from "./actions/authActions";
import { useSelector } from "react-redux";
// import store from "./store";
// import axios from "axios";

import "./dashforge.css";
import "./main.css";

import AOS from 'aos'
import 'aos/dist/aos.css';
AOS.init();

function App() {
  // useEffect(() => {
  //   store.dispatch(loadUser())
  // }, [])

  const { loading } = useSelector((state) => state.auth);
  // const routing = useRoutes(routes(isAuthenticated));

  return (
    <div>
      <Routes>
        <Route
            path="/app"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path="*" element={<Login />}></Route>
      </Routes>
      {loading ? <Loader /> : null}
    </div>
  );
}

export default App;

function PrivateRoute({ children }) {
  return localStorage.getItem('user') !== null ? children : <Navigate to="/login" />;
}

