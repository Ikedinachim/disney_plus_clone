import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../actions/authActions'

import FeatherIcon from 'feather-icons-react';

const Header = () => {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        alert.success("Logged out successfully")
    }

    const { user } = useSelector(state => state.auth)
    const { wallet, billing } = useSelector(state => state.wallet)

    return (
        <div className="content-header shadow-dash bd-b-0">
            <div className="content-search">
                <FeatherIcon icon="search" />
                <input type="search" className="form-control" placeholder="Search..." />
            </div>
            <nav className="nav">
                <div className=" ml-md-4 ml-2 mg-t-5">
                <div className="d-flex">
                    <Link
                    to="/app/billing/fund-wallet"
                    className="tx-semibold tx-orange pd-t-1 mg-r-5"
                    style={{ textDecoration: "underline" }}
                    >
                    Fund wallet
                    </Link>
                    <span className="mg-l-3 tx-14 tx-medium">
                    <img src="../../assets/img/campaign.svg" alt="asset" srcSet />
                    Balance: &#8358;{billing.length < 1  ? 0.00 : wallet.balance}
                    </span>
                </div>
                </div>
                <div className="dropdown dropdown-profile ml-md-4 ml-2">
                <Link
                    to="/app"
                    className="dropdown-link tx-dark tx-13 tx-medium"
                    data-toggle="dropdown"
                    data-display="static"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {billing.length < 1  ? "John" : user.user.firstName}
                    {/* Jane Doe */}
                    <div className="avatar avatar-sm mg-l-10">
                    <img
                        src="https://via.placeholder.com/500"
                        className="rounded-circle"
                        alt="asset"
                    />
                    </div>
                </Link>
                {/* dropdown-link */}
                <div className="dropdown-menu dropdown-menu-right tx-13">
                    <div className="avatar avatar-lg mg-b-15">
                    <img
                        src="https://via.placeholder.com/500"
                        className="rounded-circle"
                        alt="asset"
                    />
                    </div>
                    <h6 className="tx-semibold mg-b-5">
                        {(billing.length < 1  ? "John" : user.user.firstName) +" " + (billing.length < 1  ? "John" : user.user.LastName)}
                        {/* Jane */}
                    </h6>
                    <p className="mg-b-25 tx-12 tx-color-03">Administrator</p>
                    <Link to="admin" className="dropdown-item">
                        <FeatherIcon icon="edit-3" /> Edit Profile
                    </Link>
                    <Link to="page-profile-view.html" className="dropdown-item">
                        <FeatherIcon icon="user" /> View Profile
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="page-help-center.html" className="dropdown-item">
                        <FeatherIcon icon="help-circle" /> Help Center
                    </Link>
                    <Link to="" className="dropdown-item">
                        <FeatherIcon icon="uslife-buoyer" /> Forum
                    </Link>
                    <Link to="" className="dropdown-item">
                        <FeatherIcon icon="settings" /> Account Settings
                    </Link>
                    <Link to="" className="dropdown-item">
                        <FeatherIcon icon="settings" /> Privacy Settings
                    </Link>
                    <Link to="/" className="dropdown-item" onClick={logoutHandler}>
                        <FeatherIcon icon="log-out" /> Sign Out
                    </Link>
                </div>
                {/* dropdown-menu */}
                </div>
            </nav>
        </div>
    )
}

export default Header