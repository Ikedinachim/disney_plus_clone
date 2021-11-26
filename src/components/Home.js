// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination"
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';

// import MetaData from "./layout/MetaData";
// import Product from "./product/Product"
// import Loader from "./layout/Loader"

// import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";
// import { getProducts } from "../actions/productActions";

import High from "../assets/img/High_return_on_investment.svg";
import Smile from "../assets/img/woman_smiling.png";
// "./assets/img/Increase_Leads.svg"
// "/assets/img/High_return_on_investment.svg"

// const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {

    // const [currentPage, setCurrentPage] = useState(1)
    // const [price, setPrice] = useState([1, 250000])
    // const [category, setCategory] = useState('')
    // const [rating, setRating] = useState(0);

    // const categories = [
    //     'Electronic',
    //     'Camera',
    //     'Laptops',
    //     'Accessories',
    //     'Headphones',
    //     'Food',
    //     'Books',
    //     'Clothes/Shoes',
    //     'Beauty/Health',
    //     'Sports',
    //     'Outdoor',
    //     'Home'
    // ]

    // const alert = useAlert();
    // const dispatch = useDispatch();

    // const filteredProductsCount = useSelector(state => state.products || {} );
    // const { loading, products, error, productsCount, resPerPage } = useSelector(
    //     (state) => state.products
    // )

    // const keyword = match.params.keyword

    // useEffect(() => {
        
    //     if(error) {
            
    //         return alert.error(error)
            
    //     }
    //     dispatch(getProducts(keyword, currentPage, price, category, rating));

    // }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

    // function setCurrentPageNo(pageNumber) {
    //     setCurrentPage(pageNumber)
    // }

    // let count = productsCount;
    // if(keyword) {
    //     count = filteredProductsCount
    // }

    return (
        <Fragment>
            {/* {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Buy Best Products Online"} />

                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="mt-5 mb-5 col-6 col-md-3">
                                        <div className="px-5">
                                            <Range 
                                                marks = {{
                                                    1 : `$1`,
                                                    250000: `$250000`
                                                }}
                                                min = {1}
                                                max = {250000}
                                                defaultValue = {[1, 250000]}
                                                tipFormatter = {value => `$${value}`}
                                                tipProps = {{
                                                    placement: "top",
                                                    visible: true,
                                                }}
                                                value = {price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />
                                            
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>

                                                <ul className="pl-0">
                                                    {categories.map(category =>(
                                                        <li style={{cursor: "pointer", listStyleType: "none"}} key={category} onClick={ () => setCategory(category)}>
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            
                                            <hr className="my-3" />
                                            
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>

                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1, 0].map(star =>(
                                                        <li style={{cursor: "pointer", listStyleType: "none"}} key={star} onClick={ () => setRating(star)}>
                                                            <div className="rating-outer">
                                                                <div className="rating-inner" style={{width: `${star * 20}%`}}>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ): (
                                products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))
                            )}

                            
                        </div>
                    </section>

                    {resPerPage < count && (
                        <div className="mt-5 d-flex justify-content-center">
                            <Pagination 
                                activePage={currentPage}
                                itemsCountPerPage = {resPerPage}
                                totalItemsCount = {productsCount}
                                onChange = {setCurrentPageNo}
                                nextPageText = {'Next'}
                                prevPageText = {'Previous'}
                                firstPageText = {'First'}
                                lastPageText = {'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
                </Fragment>
            )} */}
            <section className="ads-body">
                <div className="container pd-y-30 pd-md-t-70 pd-md-b-0">
                    <p className="tx-28 tx-com tx-center tx-bold mb-0">Why Mysogi?</p>
                    <div className="row mg-t-10">
                    <div className="col-md-4 col-12 mg-t-20">
                        <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                            <img src={High} className="img-fluid" alt="" srcset="" />
                            <p className="tx-18 tx-com tx-semibold mg-t-10">High return on Investment</p>
                            <p className="tx-14 tx-gray tx-light">We provide well optimised system that allows you access to all you need to grow 
                            your business thereby giving you your money’s worth of service.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-12 mg-t-20">
                        <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                            <img src="./assets/img/Increase_Leads.svg" className="img-fluid" alt="" srcset="" />
                            <p className="tx-18 tx-com tx-semibold mg-t-10">Increase Leads & Customers</p>
                            <p className="tx-14 tx-gray tx-light">We allow you to focus on the people who are searching for what your business offers.
                            Watch your number increase with our transparent process.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-12 mg-t-20">
                        <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                            <img src="./assets/img/High_return_on_investment.svg" className="img-fluid" alt="" srcset="" />
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
                            <img src="./assets/img/High_Visual_Display_Ads.svg" className="img-fluid " data-aos="fade-up" data-aos-duration="2000"  alt="" srcset="" />
                        </div>
                        </div>
                        <div className="col-md-6 mg-t-20 pd-md-b-100">
                        <div className=" card-height vert-container">
                            <div className="vert-center animate__slower" data-aos="fade-down" data-aos-duration="2000">
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
                        <div className="">
                        <div className="row">
                            <div className="col-md-6 order-2 order-md-1 mg-t-20">
                            <div className=" card-height vert-container">
                                <div className="vert-center" data-aos="fade-left" data-aos-duration="2000" >
                                <p className="tx-28 tx-bold tx-com">Phone Call Ads</p>
                                <p className="tx-18 tx-blac">Promote your brand on calls and enhance recall, especially in media dark region</p>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-6 order-1 order-md-2 mg-t-20">
                            <div className="card-height">
                                <img src="./assets/img/Call_Ads.svg" className="img-fluid img-negg" data-aos="fade-right" data-aos-duration="2000" alt="" srcset="" />
                            </div>
                            </div>
                        </div>
                        </div>
                    
                    </div>
                    </div>
                </section>
                <section className="">
                    <div className="container pb-md-5">
                    <div className="col-xl-11 mx-auto">
                        <div className="row">
                        <div className="col-md-6 mg-t-20">
                            <div className="card-height">
                            <img src="./assets/img/SMS_Ads.svg" className="img-fluid img-neg" data-aos="fade-left" data-aos-duration="2000"  alt="" srcset="" />
                            </div>
                        </div>
                        <div className="col-md-6 mg-t-20">
                            <div className=" card-height vert-container">
                            <div className="vert-center" data-aos="fade-right" data-aos-duration="2000">
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
                                <label for="name" className="tx-14 tx-com tx-blac mg-b-3">Your Name</label>
                                <input type="text" className="form-control contact" id="inputEmail4" placeholder="Enter Name" />
                                </div>
                                <div className="form-group col-md-5">
                                <label for="name" className="tx-14 tx-com tx-blac mg-b-3">Phone Number</label>
                                <input type="text" className="form-control contact" id="" placeholder="Enter Number" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                <label for="name" className="tx-14 tx-com tx-blac mg-b-3">Email Address</label>

                                <input type="email" className="form-control contact" id="inputEmail4" placeholder="Enter Email Address" />
                                </div>
                                <div className="form-group col-md-5">
                                <label for="name" className="tx-14 tx-com tx-blac mg-b-3">Company Name</label>

                                <input type="text" className="form-control contact" id="" placeholder="Enter Company Name" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                <label for="name" className="tx-14 tx-com tx-blac mg-b-3">Designation</label>
                                <input type="text" className="form-control contact" id="" placeholder="Enter Designation" />
                                </div>
                                <div className="form-group col-md-5">
                                <label for="name" className="tx-14 tx-com tx-blac mg-b-3">Industry</label>
                                <input type="text" className="form-control contact" id="inputEmail4" placeholder="Enter Industry" />

                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                <label for="name" className="tx-14 tx-com tx-blac mg-b-3">Employee Count</label>
                                <input type="text" className="form-control contact" id="" placeholder="Enter Number" />

                                </div>
                                <div className="form-group col-md-5">
                                <label for="name" className="tx-14 tx-com tx-blac mg-b-3">City</label>
                                <input type="text" className="form-control contact" id="" placeholder="Enter City" />
                                </div>
                            </div>
                            
                            <button type="submit" className="btn btn-primary pd-x-40 mg-t-20">Submit</button>
                            </form>
                        </div>
                        </div>
                        
                    </div>
                    <div className=" mg-t-20 pd-md-t-40 order-1 order-md-2 pd-md-x-0 mar-left">
                        <img src={Smile} className="img-fluid" data-aos="fade-down" data-aos-duration="3000" alt="" srcset="" />
                    </div>
                    </div>
                
                </div>
                </div>
                </section>
                <section id="campaign" className="camp-top" >
                <div className="">
                    <div className="container bg-black">
                    <div className="">
                        <div className="row">
                        <div className="col-md-6 mg-t-20">
                            <div className="">
                            <img src="./assets/img/mysogi_phone.png" className="img-fluid img-neg-camp" data-aos="fade-left" data-aos-duration="2000"  alt="" srcset="" />
                            </div>
                        </div>
                        <div className="col-md-6 mg-t-20">
                            <div className=" card-height text-white">
                            <div className="vert-center">
                                <p className="tx-16 text-white">Ready to hit the digital market?</p>
                                <p className="tx-26 tx-com fw-bold">Get started with Mysogi</p>
                                <a href="./register.html" type="button" className="btn btn-primary pd-x-40 mg-t-20">Sign Up</a>

                            </div>
                            </div>
                        </div>
                        </div>
            
                    </div>
                    </div>
                </div>
                
                </section>
            </section>
            
        </Fragment>
    );
};

export default Home;
