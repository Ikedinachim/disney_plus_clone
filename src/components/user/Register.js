import React, { Fragment, useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from "../../components/loader";

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getSenderID } from '../../actions/senderIDActions';
import { register, clearErrors } from '../../actions/authActions'
import { getTransactionHistory, getWallet, } from '../../actions/billingActions'
import { REGISTER_USER_RESET } from '../../constants/authConstants';

const Register = ({ history }) => {
    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        // middleName: '',
        username: '',
        userType: '',
        email: '',
        password: '',
        phone: '',
        businessName: '',
        contactName: '',
        // businessEmail: ''
    })

    const { 
        firstName, 
        lastName, 
        // middleName, 
        username,
        userType, 
        email, 
        password, 
        phone, 
        businessName, 
        contactName, 
        // businessEmail 
    } = newUser;

    // const [avatar, setAvatar] = useState('')
    // const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, isRegistered, error, loading, user } = useSelector(state => state.auth)
    // const { wallet, billing } = useSelector(state => state.wallet)
    // const { senderID } = useSelector(state => state.senderID  || []);
    // const { tnxHistory } = useSelector(state => state.tnxHistory || {})
    // const { wallet } = useSelector(state => state.wallet)

    useEffect( () => {
        if (isRegistered) {
            alert.success('User registered successfully')
            navigate('/login')
            dispatch({ type: REGISTER_USER_RESET })
        } 
        // else if (isRegistered || !isAuthenticated) {
        //     navigate('/register')
        // }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, isAuthenticated, isRegistered, error, alert ])

    const submitIndividualHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('firstName', firstName);
        formData.set('lastName', lastName);
        // formData.set('middleName', middleName);
        formData.set('userType', "individual");
        formData.set('username', username);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('phone', phone);

        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        
        dispatch(register(json))
        // setNewUser("")
        
    }

    const submitBusinessHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('firstName', firstName);
        formData.set('lastnName', lastName);
        // formData.set('middleName', middleName);
        formData.set('userType', "business");
        formData.set('username', username);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('phone', phone);
        formData.set('businessName', businessName);
        formData.set('contactName', contactName);
        // formData.set('businessEmail', businessEmail);
        

        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);

        dispatch(register(json))
    }

    const onChange = e => {
        if(e.target.name === 'avatar') {

            // const reader = new FileReader()

            // reader.onload = () => {
            //     if (reader.readyState === 2) {
            //         setAvatarPreview(reader.result)
            //         setAvatar(reader.result)
            //     }
            // }

            // reader.readAsDataURL(e.target.files[0])

        } else {
            setNewUser({ ...newUser, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            {loading ? 
            <Loader /> 
            
            : (
                <Fragment>
                    <MetaData title={'Register User'} />
                    <section className="ht-100v container-fluid">
                        <div className="row">
                            <div className="col-md-6 login-bg card-height d-none d-md-block d-lg-block d-xl-block">
                            <div className="pd-50">
                                <img
                                src="./assets/img/logo.svg"
                                className="img-fluid logo"
                                alt ="register logo"
                                srcSet
                                />
                            </div>
                            </div>
                            <div className="col-md-6 login-side">
                            <div className="container pd-lg-30 pd-10">
                                <Link
                                to="/home"
                                type="button"
                                className="close close-btn"
                                aria-label="Close"
                                >
                                <span aria-hidden="true">×</span>
                                </Link>
                                <div className>
                                <div className="col-lg-10 col-xl-8 mx-auto pd-t-100 pd-md-t-50 pd-lg-t-20 tx-center">
                                    <p className="tx-36 tx-bold mb-2 tx-com">Let’s get started</p>
                                    <p className="tx-18 tx-gray">
                                    Please complete to create your account.
                                    </p>
                                    <ul
                                    className="nav nav-tabs bd-tab pd-5 col-lg-11 justify-content-between mx-auto"
                                    id="myTab"
                                    role="tablist"
                                    >
                                    <li className="nav-item">
                                        <a
                                        className="nav-link reg active"
                                        id="home-tab"
                                        data-toggle="tab"
                                        href="#home"
                                        role="tab"
                                        aria-controls="home"
                                        aria-selected="true"
                                        >
                                        Individual
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                        className="nav-link reg"
                                        id="profile-tab"
                                        data-toggle="tab"
                                        href="#profile"
                                        role="tab"
                                        aria-controls="profile"
                                        aria-selected="false"
                                        >
                                        Business
                                        </a>
                                    </li>
                                    </ul>
                                    <div className="tab-content bd-t-0" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="home"
                                        role="tabpanel"
                                        aria-labelledby="home-tab"
                                    >
                                        <form className="pd-y-30 pd-md-x-20" onSubmit={submitIndividualHandler}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                            <input 
                                                type="text" 
                                                id="firstname" 
                                                className="form-control new"
                                                placeholder="First Name"
                                                name="firstName"
                                                required
                                                value={firstName}
                                                onChange={onChange}
                                            />
                                            </div>
                                            <div className="form-group col-md-6">
                                            <input 
                                                type="text" 
                                                id="lastname" 
                                                className="form-control new"
                                                placeholder="Last Name"
                                                name="lastName"
                                                required
                                                value={lastName}
                                                onChange={onChange}
                                            />
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <input
                                            type="text"
                                            className="form-control new"
                                            placeholder="Middle Name"
                                            name="middleName"
                                            value={middleName}
                                            onChange={onChange}
                                            />
                                        </div> */}
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                id="individualUsername" 
                                                className="form-control new"
                                                placeholder="Username"
                                                name="username"
                                                required
                                                value={username} 
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="hidden"
                                            className="form-control new"
                                            placeholder="User Type"
                                            name="userType"
                                            value={"individual"}
                                            onChange={onChange} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className="form-control new"
                                                placeholder="Email"
                                                name="email"
                                                required
                                                value={email} 
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="password"
                                            className="form-control new"
                                            placeholder="Password"
                                            name="password"
                                            required
                                            value={password} 
                                            onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="number"
                                            className="form-control new"
                                            placeholder="Phone Number"
                                            name="phone"
                                            required
                                            value={phone}
                                            onChange={onChange}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-9 col-12 mg-t-15">
                                            <div className="custom-control custom-checkbox pd-l-0">
                                                <input
                                                type="checkbox"
                                                className="custom-control-input form-control"
                                                id="customCheck1"
                                                name="userType"
                                                required
                                                />
                                                <label
                                                className="custom-control-label"
                                                htmlFor="customCheck1"
                                                >
                                                I agree with{" "}
                                                <span className="tx-primary">
                                                    terms and conditions
                                                </span>
                                                </label>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="form-row mg-t-30">
                                            <div className="form-group col-md-5 mx-auto">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block btn-lg pd-y-15"
                                                disabled={ loading ? true : false }
                                            >
                                                Sign up
                                            </button>
                                            </div>
                                        </div>
                                        <Link to="/login">
                                            <span
                                            className="tx-dark"
                                            style={{ color: "#000", textDecoration: "underline" }}
                                            >
                                            Already have an account?
                                            </span>{" "}
                                            <span style={{ textDecoration: "underline" }}>
                                            Sign in.
                                            </span>
                                        </Link>
                                        </form>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="profile"
                                        role="tabpanel"
                                        aria-labelledby="profile-tab"
                                    >
                                        <form className="pd-y-30 pd-md-x-20" onSubmit={submitBusinessHandler}>
                                        <div className="form-group">
                                            <input
                                            type="text"
                                            className="form-control new"
                                            placeholder="First Name"
                                            name="firstName"
                                            required
                                            value={firstName}
                                            onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="text"
                                            className="form-control new"
                                            placeholder="Last Name"
                                            name="lastName"
                                            required
                                            value={lastName}
                                            onChange={onChange}
                                            />
                                        </div>
                                        {/* <div className="form-group">
                                            <input
                                            type="text"
                                            className="form-control new"
                                            placeholder="Middle Name"
                                            name="middleName"
                                            value={middleName}
                                            onChange={onChange}
                                            />
                                        </div> */}
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                id="businessUsername" 
                                                className="form-control new"
                                                placeholder="Username"
                                                name="username"
                                                required
                                                value={username} 
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="hidden"
                                            className="form-control new"
                                            placeholder="User Type"
                                            name="userType"
                                            required
                                            value={"business"}
                                            onChange={onChange} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="email"
                                            className="form-control new"
                                            placeholder="Company Email"
                                            name="email"
                                            required
                                            value={email}
                                            onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="password"
                                            className="form-control new"
                                            placeholder="Password"
                                            name="password"
                                            required
                                            value={password}
                                            onChange={onChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="number"
                                            className="form-control new"
                                            placeholder="Phone Number"
                                            name="phone"
                                            required
                                            value={phone}
                                            onChange={onChange} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="text"
                                            className="form-control new"
                                            placeholder="Business Name"
                                            name="businessName"
                                            required
                                            value={businessName}
                                            onChange={onChange} 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                            type="text"
                                            className="form-control new"
                                            placeholder="Contact Name"
                                            name="contactName"
                                            required
                                            value={contactName}
                                            onChange={onChange} 
                                            />
                                        </div>
                                        {/* <div className="form-group">
                                            <input
                                            type="email"
                                            className="form-control new"
                                            placeholder="Business Email"
                                            name="businessEmail"
                                            value={businessEmail}
                                            onChange={onChange} 
                                            />
                                        </div> */}
                                        
                                        <div className="row">
                                            <div className="col-lg-9 col-12 mg-t-15">
                                            <div className="custom-control custom-checkbox pd-l-0">
                                                <input
                                                type="checkbox"
                                                className="custom-control-input form-control"
                                                id="customCheck2"
                                                required
                                                />
                                                <label
                                                className="custom-control-label"
                                                htmlFor="customCheck2"
                                                >
                                                I agree with{" "}
                                                <span className="tx-primary">
                                                    terms and conditions
                                                </span>{" "}
                                                </label>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="form-row mg-t-30">
                                            <div className="form-group col-md-5 mx-auto">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block btn-lg pd-y-15"
                                                disabled={ loading ? true : false }
                                            >
                                                Sign up
                                            </button>
                                            </div>
                                        </div>
                                        <Link to="/login">
                                            <span
                                            className="tx-dark"
                                            style={{ color: "#000", textDecoration: "underline" }}
                                            >
                                            Already have an account?
                                            </span>{" "}
                                            <span style={{ textDecoration: "underline" }}>
                                            Sign in.
                                            </span>
                                        </Link>
                                        </form>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Register
