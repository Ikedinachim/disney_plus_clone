// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from "react";
import { Route, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/authActions'

import "../../App.css";

import Search from "./Search";

const Header = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success("Logged out successfully")
    }

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3 d-flex">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/logo.png" alt="CeenoStore" />
                            {/* <h2>CeeNoStore</h2> */}
                        </Link>
                    </div>
                </div>

                <div className="mt-2 col-12 col-md-6 mt-md-0 first-div">
                    <Route render={({ history }) => <Search history = { history } />} />
                </div>

                <div className="mt-4 text-center col-12 col-md-3 mt-md-0 sec-div">
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
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>
                            </div>

                        </div>
                    ) : !loading && <Link to="/login" className="ml-4 btn" id="login_btn">Login</Link>}

                </div>
            </nav>
        </Fragment>
    );
};

export default Header;
