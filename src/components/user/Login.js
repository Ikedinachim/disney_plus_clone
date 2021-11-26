import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/authActions'

const Login = ({ history, location }) => {

    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect( () => {

        if(isAuthenticated) {
            history.push('/')
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(userName, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    {/* <div className="row wrapper"> 
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={ submitHandler }>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                    
                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
                    
                                <button
                                id="login_button"
                                type="submit"
                                className="py-3 btn btn-block"
                                >
                                LOGIN
                                </button>

                                <Link to="/register" className="float-right mt-3">New User?</Link>
                            </form>
                        </div>
                    </div> */}

                    <section className="ht-100v container-fluid">
                    <div className="row">
                        <div className="col-md-6 login-bg card-height d-none d-md-block d-lg-block d-xl-block">
                        <div className="pd-50">
                            <img src="./assets/img/logo.svg" className="img-fluid logo" alt="" srcSet="" />
                        </div>
                        </div>
                        <div className="col-md-6 login-side">
                        <div className="container pd-lg-30 pd-10">
                            <a href="./home.html" type="button" className="close close-btn" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </a>
                            <div className="">
                            <div className="col-lg-10 col-xl-8 mx-auto pd-t-30 tx-center welcome-div">
                                <p className="tx-36 tx-bold mb-2 tx-com">Welcome Back</p>
                                <p className="tx-16 tx-gray">Welcome back! Please login to your account.</p>
                                <form className="mg-y-50"  onSubmit={ submitHandler }>
                                <div className="form-group">
                                    <input
                                        className="form-control new"
                                        placeholder="Username" 
                                        type="text"
                                        id="email_field"
                                        value={userName}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control new" 
                                        placeholder="Password"
                                        type="password"
                                        id="password_field"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-row mg-t-30">
                                    <div className="form-group col-md-6 col-6">
                                    <div className="custom-control custom-checkbox float-left">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" for="customCheck1">Remember Me</label>
                                    </div>
                                    </div>
                                    <div className="form-group col-md-6 col-6">
                                    <a href="http://">Forgot Password</a>
                                    </div>
                                </div>
                                <div className="mg-y-30">
                                    <div className="form-group col-md-5 mx-auto">
                                    <button
                                    id="login_button"
                                    className="btn btn-primary btn-block btn-lg py-15"
                                    type="submit"
                                    // className="py-3 btn btn-block"
                                    >
                                    LOGIN
                                    </button>
                                    {/* <a href="./campaign.html" type="submit" className="btn btn-primary btn-block btn-lg py-15">Login</a> */}
                                    </div>
                                    <Link to={"/register"}><span className="tx-dark" style={{color: "#000;", textDecoration: "underline;"}}>Don’t have an account yet? </span> <span style={{textDecoration: "underline;"}}>Sign Up.</span></Link>
                                
                                </div>
                                </form>
                                <p className="tx-blac tx-12 pd-t-50 mb-0">Term of use. Privacy policy</p>
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

export default Login
