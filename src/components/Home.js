// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from "react";
import { Link } from 'react-router-dom'
// import Pagination from "react-js-pagination"
// import Slider from "rc-slider"
import 'rc-slider/assets/index.css';

import MetaData from "./layout/MetaData";
// import Product from "./product/Product"
import Loader from "./layout/Loader";

import { useSelector } from "react-redux";
// import { useAlert } from "react-alert";
// import { getProducts } from "../actions/productActions";

// import High from "../assets/img/High_return_on_investment.svg";
// import Smile from "../assets/img/woman_smiling.png";
// "./assets/img/Increase_Leads.svg"
// "/assets/img/High_return_on_investment.svg"

// const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {
    const { loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Welcome to MysogiAds"} />
                    <div>
                        <section className="header-part">
                            <div className="container pd-lg-t-50  pd-b-30 pd-lg-b-0">
                            <div className="row">
                                <div className="col-md-7 col-12 pd-md-r-0 order-2 order-md-1">
                                <p className="tx-44 tx-bold mg-xl-t-100 mg-t-10">
                                    Get your business on the next level with <span className="tx-primary tx-com">Mysogi</span>
                                </p>
                                <p className="tx-16 tx-blac tx-medium mg-t-30">Relied upon to get constant engagement with audience and provide the win your organisation needs.</p>
                                <div className="mg-t-40">
                                    <Link to="/register" className="btn btn-primary pd-x-40 started-btn">Get Started</Link>
                                </div>
                                </div>
                                <div className="col-md-5 col-12 order-1 order-md-2">
                                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="./assets/img/landing-image.png" className="d-block w-100 img-fluid" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="./assets/img/landing_picture.png" className="d-block w-100 img-fluid" alt="..." />
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </section>
                        <section className="ads-body">
                            <div className="container pd-y-30 pd-md-t-70 pd-md-b-0">
                            <p className="tx-28 tx-com tx-center tx-bold mb-0">Why Mysogi?</p>
                            <div className="row mg-t-10">
                                <div className="col-md-4 col-12 mg-t-20">
                                <div className="card bd-0 shadoww card-height">
                                    <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                                    <img src="./assets/img/High_return_on_investment.svg" className="img-fluid" alt="" srcSet />
                                    <p className="tx-18 tx-com tx-semibold mg-t-10">High return on Investment</p>
                                    <p className="tx-14 tx-gray tx-light">We provide well optimised system that allows you access to all you need to grow 
                                        your business thereby giving you your money’s worth of service.</p>
                                    </div>
                                </div>
                                </div>
                                <div className="col-md-4 col-12 mg-t-20">
                                <div className="card bd-0 shadoww card-height">
                                    <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                                    <img src="./assets/img/Increase_Leads.svg" className="img-fluid" alt="" srcSet />
                                    <p className="tx-18 tx-com tx-semibold mg-t-10">Increase Leads &amp; Customers</p>
                                    <p className="tx-14 tx-gray tx-light">We allow you to focus on the people who are searching for what your business offers.
                                        Watch your number increase with our transparent process.</p>
                                    </div>
                                </div>
                                </div>
                                <div className="col-md-4 col-12 mg-t-20">
                                <div className="card bd-0 shadoww card-height">
                                    <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                                    <img src="./assets/img/High_return_on_investment.svg" className="img-fluid" alt="" srcSet />
                                    <p className="tx-18 tx-com tx-semibold mg-t-10">Target Demography</p>
                                    <p className="tx-14 tx-gray tx-light">We target on the basis of age, gender, location to communicate with relevance and precision.</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-lg-11 mx-auto pd-lg-t-70 pd-t-30">
                                <div className="tx-center">
                                <p className="tx-28 tx-com tx-bold mb-2">Get your audience’s attention</p>
                                <p className="tx-18 ">Let’s help secure the right audience with our options</p>
                                </div>
                                <div className="row">
                                <div className="col-md-6 mg-t-20">
                                    <div className="card-height">
                                    <img src="./assets/img/High_Visual_Display_Ads.svg" className="img-fluid " data-aos="fade-up" data-aos-duration={2000} alt="" srcSet />
                                    </div>
                                </div>
                                <div className="col-md-6 mg-t-20 pd-md-b-100">
                                    <div className=" card-height vert-container">
                                    <div className="vert-center animate__slower" data-aos="fade-down" data-aos-duration={2000}>
                                        <p className="tx-28 tx-bold tx-com">High Visual Display Ads</p>
                                        <p className="tx-18 tx-blac mg-b-80">Capture attention with eye striking visuals and reach highly engaged users with prominent ad spots</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <section className="bg-reddish">
                            <div className="container">
                                <div className="col-xl-11 mx-auto">
                                <div className>
                                    <div className="row">
                                    <div className="col-md-6 order-2 order-md-1 mg-t-20">
                                        <div className=" card-height vert-container">
                                        <div className="vert-center" data-aos="fade-left" data-aos-duration={2000}>
                                            <p className="tx-28 tx-bold tx-com">Phone Call Ads</p>
                                            <p className="tx-18 tx-blac">Promote your brand on calls and enhance recall, especially in media dark region</p>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 order-1 order-md-2 mg-t-20">
                                        <div className="card-height">
                                        <img src="./assets/img/Call_Ads.svg" className="img-fluid img-negg" data-aos="fade-right" data-aos-duration={2000} alt="" srcSet />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </section>
                            <section className>
                            <div className="container pb-md-5">
                                <div className="col-xl-11 mx-auto">
                                <div className="row">
                                    <div className="col-md-6 mg-t-20">
                                    <div className="card-height">
                                        <img src="./assets/img/SMS_Ads.svg" className="img-fluid img-neg" data-aos="fade-left" data-aos-duration={2000} alt="" srcSet />
                                    </div>
                                    </div>
                                    <div className="col-md-6 mg-t-20">
                                    <div className=" card-height vert-container">
                                        <div className="vert-center" data-aos="fade-right" data-aos-duration={2000}>
                                        <p className="tx-28 tx-bold tx-com">One to One SMS</p>
                                        <p className="tx-18 tx-blac">Deliver information with a high success rate and support your digital marketing efforts</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </section>
                            <section className="bg-reddish">
                            <div className="container py-1">
                                <div className="mg-md-t-40 mg-t-30">
                                <p className="tx-36 tx-bold mb-2 tx-com ">Let's discuss</p>
                                <p className="tx-20">I am a <span className="tx-primary tx-medium">brand</span> looking to <span className="tx-primary tx-medium">build awareness</span></p>
                                <div className="row pos-rel">
                                    <div className="col-md-11 mg-t-20 order-2 ">
                                    <div className="card bd-0 shadow">
                                        <div className="card-body pd-lg-60">
                                        <form>
                                            <div className="form-row">
                                            <div className="form-group col-md-5">
                                                <label htmlFor="name" className="tx-14 tx-com tx-blac mg-b-3">Your Name</label>
                                                <input type="text" className="form-control contact" id="inputEmail4" placeholder="Enter Name" />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label htmlFor="name" className="tx-14 tx-com tx-blac mg-b-3">Phone Number</label>
                                                <input type="text" className="form-control contact" id placeholder="Enter Number" />
                                            </div>
                                            </div>
                                            <div className="form-row">
                                            <div className="form-group col-md-5">
                                                <label htmlFor="name" className="tx-14 tx-com tx-blac mg-b-3">Email Address</label>
                                                <input type="email" className="form-control contact" id="inputEmail4" placeholder="Enter Email Address" />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label htmlFor="name" className="tx-14 tx-com tx-blac mg-b-3">Company Name</label>
                                                <input type="text" className="form-control contact" id placeholder="Enter Company Name" />
                                            </div>
                                            </div>
                                            <div className="form-row">
                                            <div className="form-group col-md-5">
                                                <label htmlFor="name" className="tx-14 tx-com tx-blac mg-b-3">Designation</label>
                                                <input type="text" className="form-control contact" id placeholder="Enter Designation" />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label htmlFor="name" className="tx-14 tx-com tx-blac mg-b-3">Industry</label>
                                                <input type="text" className="form-control contact" id="inputEmail4" placeholder="Enter Industry" />
                                            </div>
                                            </div>
                                            <div className="form-row">
                                            <div className="form-group col-md-5">
                                                <label htmlFor="name" className="tx-14 tx-com tx-blac mg-b-3">Employee Count</label>
                                                <input type="text" className="form-control contact" id placeholder="Enter Number" />
                                            </div>
                                            <div className="form-group col-md-5">
                                                <label htmlFor="name" className="tx-14 tx-com tx-blac mg-b-3">City</label>
                                                <input type="text" className="form-control contact" id placeholder="Enter City" />
                                            </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary pd-x-40 mg-t-20">Submit</button>
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                    <div className=" mg-t-20 pd-md-t-40 order-1 order-md-2 pd-md-x-0 mar-left">
                                    <img src="./assets/img/woman_smiling.png" className="img-fluid" data-aos="fade-down" data-aos-duration={3000} alt="" srcSet />
                                    </div>
                                </div>
                                </div>
                            </div>
                            </section>
                            <section id="campaign" className="camp-top">
                            <div className>
                                <div className="container bg-black">
                                <div className>
                                    <div className="row">
                                    <div className="col-md-6 mg-t-20">
                                        <div className>
                                        <img src="./assets/img/mysogi_phone.png" className="img-fluid img-neg-camp" data-aos="fade-left" data-aos-duration={2000} alt="" srcSet />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mg-t-20">
                                        <div className=" card-height text-white">
                                        <div className="vert-center">
                                            <p className="tx-16 text-white">Ready to hit the digital market?</p>
                                            <p className="tx-26 tx-com fw-bold">Get started with Mysogi</p>
                                            <Link to="register" type="button" className="btn btn-primary pd-x-40 mg-t-20">Sign Up</Link>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </section>
                        </section>
                        <section className="footer">
                            <div className="container py-5 tx-white">
                            <div className="row col-md-9">
                                <div className="col-md-3 col-6">
                                <img src="./assets/img/logo.png" alt="" />
                                </div>
                                <div className="col-md-3 col-6">
                                <ul className="list-unstyled tx-16 tx-bold footer-link">
                                    <li><a href>Campaigns</a></li>
                                    <li><a href>Contact</a></li>
                                    <li />
                                </ul>
                                </div>
                                <div className="col-md-6 col-12">
                                <form action>
                                    <label htmlFor className="tx-16 tx-bold footer-label">Subscribe to our newsletter</label>
                                    <div className="input-group pd-5 bg-white">
                                    <input type="text" className="form-control bd-0" placeholder aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary tx-12 pd-y-5" type="button" id="button-addon2">Subscribe <i className="fa fa-arrow-right mg-l-10 mg-t-3" style={{fontSize: '14px'}} /></button>
                                    </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                            <hr className="bg-white mg-t-100" />
                            <div className="row mg-t-30">
                                <div className="col-md-3 offset-md-9 col-12">
                                <div className="d-flex">
                                    <p className="tx-14 mb-0 tx-light-blue">Terms and Policy</p>
                                    <div className="mg-l-10">
                                    <a href="http://" className="tx-white"><i className="fab fa-twitter mg-l-20 text-white" style={{fontSize: '20px'}} /></a>
                                    <a href="http://" className="tx-white"><i className="fab fa-facebook-f mg-l-20 tx-white" style={{fontSize: '20px'}} /></a>
                                    <a href="http://" className="tx-white"><i className="fab fa-linkedin-in mg-l-20 tx-white" style={{fontSize: '20px'}} /></a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </section>
                    </div>
                </Fragment>
            )}
            
        </Fragment>
    );
};

export default Home;
