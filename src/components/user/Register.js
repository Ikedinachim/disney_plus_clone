import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/authActions'

const Register = ({ history }) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

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

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);
        
        dispatch(register(formData))
    }

    const onChange = e => {
        if(e.target.name === 'avatar') {

            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            <MetaData title={'Register User'} />

            {/* <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
                                type="name" 
                                id="name_field" 
                                className="form-control"
                                name="name"
                                value={name} 
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email} 
                                onChange={onChange}
                            />
                        </div>
            
                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password} 
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='mr-3 avatar item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>
                
                        <button
                            id="register_button"
                            type="submit"
                            className="py-3 btn btn-block"
                            disabled={ loading ? true : false }
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div> */}

<section className="ht-100v container-fluid">
      <div className="row">
        <div className="col-md-6 login-bg card-height d-none d-md-block d-lg-block d-xl-block">
          <div className="pd-50">
            <img src="./assets/img/logo.svg" className="img-fluid logo" alt="" srcset="" />
          </div>
        </div>
        <div className="col-md-6 login-side">
          <div className="container pd-lg-30 pd-10">
            <a href="./home.html" type="button" className="close close-btn" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </a>
            <div className="">
              <div className="col-lg-10 col-xl-8 mx-auto pd-t-100 pd-md-t-50 pd-lg-t-20 tx-center">
                <p className="tx-36 tx-bold mb-2 tx-com">Let’s get started</p>
                <p className="tx-18 tx-gray">Please complete to create your account.</p>

                <ul className="nav nav-tabs bd-tab pd-5 col-lg-11 justify-content-between mx-auto" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link reg active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Individual</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link reg" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Business</a>
                  </li>
                 
                </ul>
                <div className="tab-content bd-t-0" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <form className="pd-y-30 pd-md-x-20">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <input type="text" className="form-control new" id="inputEmail4" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-6">
                          <input type="text" className="form-control new" id="inputPassword4" placeholder="Last Name" />
                        </div>
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control new" placeholder="Username" />
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control new" placeholder="Email" />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control new" placeholder="Password" />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control new" placeholder="Phone Number" />
                      </div>
                      <div className="row">
                        <div className="col-lg-9 col-12 mg-t-15">
                          <div className="custom-control custom-checkbox pd-l-0">
                            <input type="checkbox" className="custom-control-input form-control" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">I agree with <span className="tx-primary">terms and conditions</span></label>
                          </div>
                        </div>
                      </div>
                     
                      <div className="form-row mg-t-30">
                        <div className="form-group col-md-5 mx-auto">
                          <button type="submit" className="btn btn-primary btn-block btn-lg pd-y-15">Sign up</button>
                        </div>
                      </div>
                      <a href="./login.html"><span className="tx-dark" style={{color: "#000;", textDecoration: "underline;"}}>Already have an account?</span> <span style={{textDecoration: "underline;"}}>Sign in.</span></a>
                    
                    </form>
                  </div>

                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <form className="pd-y-30 pd-md-x-20">
                      <div className="form-group">
                        <input type="text" className="form-control new" placeholder="Company Name" />
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control new" placeholder="Company Email" />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control new" placeholder="Password" />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control new" placeholder="Phone Number" />
                      </div>
                      <div className="row">
                        <div className="col-lg-9 col-12 mg-t-15">
                          <div className="custom-control custom-checkbox pd-l-0">
                            <input type="checkbox" className="custom-control-input form-control" id="customCheck2" />
                            <label className="custom-control-label" htmlFor="customCheck2">I agree with <span className="tx-primary">terms and conditions</span> </label>
                          </div>
                        </div>
                      </div>
                     
                      <div className="form-row mg-t-30">
                        <div className="form-group col-md-5 mx-auto">
                          <button type="submit" className="btn btn-primary btn-block btn-lg pd-y-15">Sign up</button>
                        </div>
                      </div>
                      <a href="./login.html"><span className="tx-dark" style={{color: "#000; text-decoration:underline;"}}>Already have an account?</span> <span style={{textDecoration: "underline;"}}>Sign in.</span></a>
                    
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
    )
}

export default Register
