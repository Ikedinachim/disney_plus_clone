// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import Logo from "../../assets/img/logo2.png"

// import { useDispatch, useSelector } from 'react-redux'
// import { useAlert } from 'react-alert'
// import { logout } from '../../actions/authActions'

// import "../../App.css";
import "../../dashforge.css";
import "../../main.css";

import Search from "./Search";

const Header = () => {

    // const alert = useAlert()
    // const dispatch = useDispatch()

    // const { user, loading } = useSelector(state => state.auth)
    // const { cartItems } = useSelector(state => state.cart)

    // const logoutHandler = () => {
    //     dispatch(logout())
    //     alert.success("Logged out successfully")
    // }

    return (
        <Fragment>
            {/* <nav className="navbar row">
                <div className="col-12 col-md-3 d-flex">
                    <div className="navbar-brand">
                    <BrowserRouter>
                    
                    </BrowserRouter>
                        <Link to="/">
                            <img src="/images/logo.png" alt="CeenoStore" />
                        </Link>
                    </div>
                </div>

                <div className="mt-2 col-12 col-md-6 mt-md-0 first-div">
                    <BrowserRouter>
                        <Routes>
                            <Route render={({ history }) => <Search history = { history } />} />
                        </Routes>
                    </BrowserRouter>
                </div>

                <div className="mt-4 text-center col-12 col-md-3 mt-md-0 sec-div">
                    <BrowserRouter>
                    
                    </BrowserRouter>
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <span id="cart" className="ml-3">
                            Cart
                        </span>
                        <span className="ml-1" id="cart_count">
                            {cartItems.length}
                        </span>
                    </Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <BrowserRouter>
                    
                            </BrowserRouter>
                            <Link to="#!" className="mr-4 text-white btn dropdown-toggle" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure className="avatar avatar-nav">
                                    <img 
                                        src={user.avatar && user.avatar.url} 
                                        alt={user && user.name}
                                        className="rounded-circle" 
                                    />
                                </figure>
                                <span>{ user && user.name }</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <BrowserRouter>
                                         <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    </BrowserRouter>
                                )}
                                <BrowserRouter>
                                    <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                    <Link className="dropdown-item" to="/me">Profile</Link>
                                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                        Logout
                                    </Link>
                                </BrowserRouter>
                            </div>

                        </div>
                    ) : !loading && <BrowserRouter><Link to="/login" className="ml-4 btn" id="login_btn">Login</Link></BrowserRouter>}

                </div>
            </nav> */}

    <header>
      <nav className="navbar navbar-expand-lg bg-white bd shadow-sm">
        <div className="container">
          <a className="navbar-brand tx-bold tx-spacing--2 order-1 pd-y-0" href="#"><img src={Logo} className="sec-logo img-fluid" alt="" srcSet="" /></a>
        <button className="navbar-toggler order-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i data-feather="menu" className="wd-20 ht-20"></i>
        </button>
      
        <div className="collapse navbar-collapse order-2" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link tx-dark" href="#">Campaign <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item pd-x-20">
              <a className="nav-link tx-dark" href="#">Contact Us</a>
            </li>
            <li className="nav-item pd-r-20 pd-md-l-100 pd-l-20">
                <BrowserRouter>
                    <Link to="/login" className="btn pd-y-8 pd-x- btn-auth tx-primary">Login</Link>
                </BrowserRouter>
            </li>
            <li className="nav-item">
            <BrowserRouter>
              <Link to={"/register"} className="btn btn-primary pd-x-40 btn-auth">Get Started</Link>
            </BrowserRouter>
            </li>
          </ul>
        </div>
        </div>
      </nav>
    </header>
            
        </Fragment>
    );
};

export default Header;
