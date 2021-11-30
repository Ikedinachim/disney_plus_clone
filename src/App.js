import React, { useEffect } from "react";
import { Route, Routes, Navigate, Router } from "react-router-dom";
// import CustomRoutes from "./components/route/RouteObjects";

import Header from "./components/layout/DashboardHeader";
import Sidebar from "./components/layout/Sidebar";
// import Footer from "./components/layout/Footer";
import Loader from "./components/loader";

import Home from "./components/Home";
import Dashboard from "./components/app";
import SenderID from "./components/app/SenderID/SenderID";
import ViewSenderID from "./components/app/SenderID/ViewSenderID";
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

  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  // const routing = useRoutes(routes(isAuthenticated));

  return (
    <div>
      {!loading && (isAuthenticated) && (
      <Sidebar />
      )}
      <div className="content ht-100v pd-0">
        {!loading && (isAuthenticated) && (
          <Header />
        )}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/app/sender-id" element={isAuthenticated ? <SenderID /> : <Login />} />
          <Route path="/app/view-sender-id" element={isAuthenticated ? <ViewSenderID /> : <Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/app" element={isAuthenticated ? <Dashboard /> : <Home />} />
          {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
        </Routes>

      
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/app/sender-id" element={isAuthenticated ? <SenderID /> : <Login />} /> */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/app" element={isAuthenticated ? <Dashboard /> : <Login />} />
          {/* <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} /> */}
        </Routes>
      {loading ? <Loader /> : null}
      </div>
    </div>
  );
}

export default App;

function PrivateRoute({ children }) {
  return localStorage.getItem('user') !== null ? children : <Navigate to="/login" />;

}

