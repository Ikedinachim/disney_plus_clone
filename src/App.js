import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

// Cart Imports
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
// import PaymentTest from './components/cart/PaymentTest'
import OrderSuccess from "./components/cart/OrderSuccess";

// Order Imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Auth / User Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin Imports
import Dashboard from "./components/admin/Dashboard";
// import ProductsList from './components/admin/ProductsList'
// import NewProduct from './components/admin/NewProduct'
// import UpdateProduct from './components/admin/UpdateProduct'
// import OrdersList from './components/admin/OrdersList'
// import ProcessOrder from './components/admin/ProcessOrder'
// import UsersList from './components/admin/UsersList'
// import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews'

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/authActions";
import { useSelector } from "react-redux";
import store from "./store";
import axios from "axios";

import "./dashforge.css";
import "./main.css";

function App() {
  const [paystackApiKey, setPaystackApiKey] = useState("");

  // useEffect(() => {
  //   store.dispatch(loadUser());

  //   async function getPaystackApikey() {
  //     const { data } = await axios.get("/api/v1/paystackapi");
  //     setPaystackApiKey(data.paystackApiKey);
  //   }

  //   getPaystackApikey();
  // }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Router>
          <Routes>
            < Route path='/' element={<Home />}/>
              <Route path='/login' element={<Login />} />
              <Route path="/register" element={<Register />} />
              </Routes>
        </Router>
      </div>
      <Router>
        <ProtectedRoute path="/dashboard"  isAdmin={true} element={<Dashboard />} exact />
      </Router>

      {/* {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />} */}

      <Footer />
    </div>
  );
}

export default App;
