// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "rc-slider/assets/index.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";

const Home = () => {
  const baseURL = process.env.REACT_APP_MYSOGI_BASE_URL;

  const axios = Axios.create({
    baseURL,
  });
  const { loading } = useSelector((state) => state.auth);

  const [mailerState, setMailerState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    industry: "",
    employee: "",
    city: "",
  });

  const {
    name,
    email,
    phone,
    // company, designation, industry, employee, city
  } = mailerState;

  const handleStateChange = (e) => {
    setMailerState({
      ...mailerState,
      [e.target.name]: e.target.value,
    });
  };

  const submitEmail = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("api/contact", mailerState);
    if (data.status === "success") {
      toast.success(data.message);
      setMailerState({
        name: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        industry: "",
        employee: "",
        city: "",
      });
    } else {
      toast.error("Mail Not Sent");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Welcome to MysogiAds"} />
          <div className="w-100 overflow-x-hidden">
            <Header />
            <section className="header-part">
              <div className="container pd-lg-t-50  pd-b-30 pd-lg-b-0">
                <div className="row">
                  <div className="col-md-7 col-12 pd-md-r-0 order-2 order-md-1">
                    <p className="tx-44 tx-bold mg-xl-t-100 mg-t-10">
                      Take your business to the next level with{" "}
                      <span className="tx-primary tx-com">Mysogi</span>
                    </p>
                    <p className="tx-16 tx-blac tx-medium mg-t-30">
                      With over 70 million target audience we connect your
                      business to the right customer using our{" "}
                      <span className="tx-bold">
                        BILLBOARDS, SMART SMS, DISPLAY ADS, VOICE SMS
                      </span>{" "}
                      and <span className="tx-bold">TOP INFLUENCERS</span> who
                      will promote your brand and products.
                    </p>
                    <div className="mg-t-40">
                      <Link
                        to="/register"
                        className="btn btn-primary pd-x-40 started-btn"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-5 col-12 order-1 order-md-2">
                    <div
                      id="carouselExampleSlidesOnly"
                      className="carousel slide h-100"
                      data-ride="carousel"
                    >
                      <div className="carousel-inner">
                        <div className="h-100 carousel-item active">
                          <img
                            src="./assets/img/landing-image.png"
                            className="img-fit-cover d-block w-100 img-fluid"
                            alt="..."
                          />
                        </div>
                        <div className="h-100 carousel-item">
                          <img
                            src="./assets/img/landing_picture.png"
                            className="img-fit-cover d-block w-100 img-fluid"
                            alt="..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="content-body pd-x-0" id="about">
              <div className="container pd-y-30 pd-md-t-70 pd-md-b-70">
                <div className="col-lg-12 pd-x-0 mx-auto pd-lg-t-70 pd-t-30">
                  <div className="tx-center">
                    <p className="tx-28 tx-com tx-bold mb-2">
                      Get your audience’s attention with our services
                    </p>
                    <p className="tx-18 ">
                      Let’s help secure the right audience with our services
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mg-t-20">
                      <div className="card-height">
                        <img
                          src="./assets/img/High_Visual_Display_Ads.svg"
                          className="img-fluid "
                          data-aos="fade-up"
                          data-aos-duration={2000}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mg-t-20 pd-md-b-100">
                      <div className=" card-height vert-container">
                        <div
                          className="vert-center animate__slower"
                          data-aos="fade-down"
                          data-aos-duration={2000}
                        >
                          <p className="tx-28 tx-bold tx-com">
                            Voice/Smart SMS Messaging
                          </p>
                          <p className="tx-18 tx-blac mg-b-80">
                            A special kind of messaging that send targeted
                            campaigns to customers or gives your target audience
                            a phone call with your pre-recorded messages.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section className="bg-reddish">
                <div className="container">
                  <div className="col-xl-11 mx-auto">
                    <div>
                      <div className="row">
                        <div className="col-md-6 order-2 order-md-1 mg-t-20">
                          <div className=" card-height vert-container">
                            <div
                              className="vert-center"
                              data-aos="fade-left"
                              data-aos-duration={2000}
                            >
                              <p className="tx-28 tx-bold tx-com">
                                Digital Ads
                              </p>
                              <p className="tx-18 tx-blac">
                                We utilize display ads to reach our target
                                audience when consuming relevant content on the
                                network. With this data, we combine the best
                                appraoch to reach them
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 order-1 order-md-2 mg-y-20 d-flex justify-content-center">
                          <div className="card-height">
                            <img
                              src="./assets/img/Call_Ads.svg"
                              className="img-fluid"
                              data-aos="fade-right"
                              data-aos-duration={2000}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className="container pb-md-5">
                  <div className="col-xl-11 mx-auto">
                    <div className="row">
                      <div className="col-md-6 mg-t-20 d-flex justify-content-center">
                        <div className="card-height">
                          <img
                            src="./assets/img/SMS_Ads.svg"
                            className="img-fluid"
                            data-aos="fade-left"
                            data-aos-duration={2000}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mg-t-20">
                        <div className=" card-height vert-container">
                          <div
                            className="vert-center"
                            data-aos="fade-right"
                            data-aos-duration={2000}
                          >
                            <p className="tx-28 tx-bold tx-com">
                              SMS Marketing
                            </p>
                            <p className="tx-18 tx-blac">
                              Our SMS Marketing service mostly delivers messages
                              on latest updates, time-sensitive offers, product
                              launches, alerts, notifications and any other form
                              of promotional information.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-reddish">
                <div className="container">
                  <div className="col-xl-11 mx-auto">
                    <div>
                      <div className="row">
                        <div className="col-md-6 order-2 order-md-1 mg-y-20">
                          <div className=" card-height vert-container">
                            <div
                              className="vert-center"
                              data-aos="fade-left"
                              data-aos-duration={2000}
                            >
                              <p className="tx-28 tx-bold tx-com">
                                Influencer Marketing
                              </p>
                              <p className="tx-18 tx-blac">
                                Mysogi ads offers the ideal platform for
                                advertisers to engage influencers to promote
                                their products and services on their social
                                media platforms at a cost.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 order-1 order-md-2 mg-y-20 d-flex justify-content-center">
                          <div className="card-height">
                            <img
                              src="./assets/img/Call_Ads.svg"
                              className="img-fluid"
                              data-aos="fade-right"
                              data-aos-duration={2000}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className="container pb-md-5">
                  <div className="col-xl-11 mx-auto">
                    <div className="row">
                      <div className="col-md-6 mg-t-20">
                        <div className="card-height">
                          <img
                            src="./assets/img/SMS_Ads.svg"
                            className="img-fluid img-neg"
                            data-aos="fade-left"
                            data-aos-duration={2000}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mg-t-20">
                        <div className=" card-height vert-container">
                          <div
                            className="vert-center"
                            data-aos="fade-right"
                            data-aos-duration={2000}
                          >
                            <p className="tx-28 tx-bold tx-com">
                              Billboard Marketing
                            </p>
                            <p className="tx-18 tx-blac">
                              With Billboards displayed in strategic locations
                              across the country, you can reach your customers
                              with promotional information, product offers and
                              alerts.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="container-fluid pd-y-30 pd-md-t-70 pd-md-b-20 bg-reddish">
                <div className="col-xl-11 mx-auto">
                  <div className="row mg-t-10 tx-center">
                    <div className="col-md-6 mg-t-20">
                      <div className="card-height">
                        <img
                          src="./assets/img/mysogi_phone.png"
                          className="img-fluid"
                          data-aos="fade-left"
                          data-aos-duration={2000}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mg-t-20 d-flex flex-column justify-content-center">
                      <p className="tx-28 tx-com tx-left tx-bold mb-20">
                        About Us
                      </p>
                      <p className="tx-18 tx-blac tx-left">
                        Mysogi Company Limited is a tech company that
                        specializes in Digital Marketing. Our recently developed
                        web-based digital campaign manager enables corporations
                        & SME's to promote and target adverts to prospective
                        customers.
                      </p>
                      <p className="tx-18 tx-blac tx-left">
                        Our aim is to aid organisations drive digital campaign
                        model via our collections of tools specifically
                        developed to manage the design process, generate leads,
                        imporve user responsiveness and efficiently deliver
                        advert contents.
                      </p>
                      <div className="d-flex">
                        <Link
                          to="register"
                          type="button"
                          className="btn btn-primary pd-x-40 mg-t-10"
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container pd-y-30 pd-md-t-70 pd-md-b-70">
                <p className="tx-28 tx-com tx-center tx-bold mb-0">
                  Why Mysogi?
                </p>
                <div className="row mg-t-10">
                  <div className="col-md-4 col-12 mg-t-20">
                    <div className="card bd-0 shadoww card-height">
                      <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                        <img
                          src="./assets/img/High_return_on_investment.svg"
                          className="img-fluid"
                          alt=""
                        />
                        <p className="tx-18 tx-com tx-semibold mg-t-10">
                          Customer Loyalty Management
                        </p>
                        <p className="tx-14 tx-gray tx-light">
                          We provide well optimised system that allows you
                          access to all you need to grow your business thereby
                          giving you your money’s worth of service.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-12 mg-t-20">
                    <div className="card bd-0 shadoww card-height">
                      <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                        <img
                          src="./assets/img/Increase_Leads.svg"
                          className="img-fluid"
                          alt=""
                        />
                        <p className="tx-18 tx-com tx-semibold mg-t-10">
                          Increase Leads &amp; Customers
                        </p>
                        <p className="tx-14 tx-gray tx-light">
                          We allow you to focus on the people who are searching
                          for what your business offers. Watch your number
                          increase with our transparent process.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-12 mg-t-20">
                    <div className="card bd-0 shadoww card-height">
                      <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                        <img
                          src="./assets/img/High_return_on_investment.svg"
                          className="img-fluid"
                          alt=""
                        />
                        <p className="tx-18 tx-com tx-semibold mg-t-10">
                          Target Demography
                        </p>
                        <p className="tx-14 tx-gray tx-light">
                          We target on the basis of age, gender, location to
                          communicate with relevance and precision.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <section id="mysogi-products">
                <div className="container pd-y-30 pd-md-t-70 pd-md-b-0">
                  <p className="tx-28 tx-com tx-center tx-bold mb-0">
                    Products
                  </p>
                  <div className="row mg-t-10">
                    <div className="col-md-3 col-12 mg-t-20">
                      <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                          <img
                            src="./assets/img/High_return_on_investment.svg"
                            className="img-fluid"
                            alt=""
                          />
                          <p className="tx-18 tx-com tx-bold mg-t-10">
                            Voice Messaging
                          </p>
                          <p className="tx-14 tx-com tx-semibold">
                            A special kind of messaging that gives your target
                            audience a phone call with your pre-recorded
                            messages.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-12 mg-t-20">
                      <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                          <img
                            src="./assets/img/Increase_Leads.svg"
                            className="img-fluid"
                            alt=""
                          />
                          <p className="tx-18 tx-com tx-bold mg-t-10">
                            Smart SMS Marketing
                          </p>
                          <p className="tx-14 tx-com tx-semibold">
                            This feature allows clients to send targeted
                            campaigns to customers. It can be targeted by
                            demographics, sex, monthly spend, etc.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-12 mg-t-20">
                      <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                          <img
                            src="./assets/img/High_return_on_investment.svg"
                            className="img-fluid"
                            alt=""
                          />
                          <p className="tx-18 tx-com tx-bold mg-t-10">
                            Digital Ads
                          </p>
                          <p className="tx-14 tx-com tx-semibold">
                            We utilize display ads to reach our target audience
                            when consuming relevant content on the network. With
                            this data, we combine the best appraoch to reach
                            them
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-12 mg-t-20">
                      <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                          <img
                            src="./assets/img/High_return_on_investment.svg"
                            className="img-fluid"
                            alt=""
                          />
                          <p className="tx-18 tx-com tx-bold mg-t-10">
                            SMS Marketing
                          </p>
                          <p className="tx-14 tx-com tx-semibold">
                            Our SMS Marketing service mostly delivers messages
                            on latest updates, time-sensitive offers, product
                            launches, alerts, notifications and any other form
                            of promotional information.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-12 mg-t-20">
                      <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                          <img
                            src="./assets/img/High_return_on_investment.svg"
                            className="img-fluid"
                            alt=""
                          />
                          <p className="tx-18 tx-com tx-bold mg-t-10">
                            USSD Campaigns
                          </p>
                          <p className="tx-14 tx-com tx-semibold">
                            Often used as an alternative to SMS in marketing,
                            because it's cheaper, and does not require data to
                            work. With its broad reach, this method captures
                            more audience and it's not limited to SEC.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-12 mg-t-20">
                      <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                          <img
                            src="./assets/img/High_return_on_investment.svg"
                            className="img-fluid"
                            alt=""
                          />
                          <p className="tx-18 tx-com tx-bold mg-t-10">
                            Influencer Marketing
                          </p>
                          <p className="tx-14 tx-com tx-semibold">
                            Mysogi ads offers the ideal platform for advertisers
                            to engage influencers to promote their products and
                            services on their social media platforms at a cost.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-12 mg-t-20">
                      <div className="card bd-0 shadoww card-height">
                        <div className="card-body tx-center pd-md-y-40 pd-md-x-30">
                          <img
                            src="./assets/img/High_return_on_investment.svg"
                            className="img-fluid"
                            alt=""
                          />
                          <p className="tx-18 tx-com tx-bold mg-t-10">
                            Billboard Marketing
                          </p>
                          <p className="tx-14 tx-com tx-semibold">
                            With Billboards displayed in strategic locations
                            across the country, you can reach your customers
                            with promotional information, product offers and
                            alerts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}
              <section className="bg-reddish" id="mysogi-contact">
                <div className="container py-1 pos-rel overflow-hidden">
                  <div className="mg-md-y-40 mg-y-30">
                    <p className="tx-36 tx-bold mb-2 tx-com ">Let's discuss</p>
                    <p className="tx-20">
                      I am a <span className="tx-primary tx-medium">brand</span>{" "}
                      looking to{" "}
                      <span className="tx-primary tx-medium">
                        build awareness
                      </span>
                    </p>
                    <div className="row">
                      <div className="col-md-6 mg-t-20 order-2 ">
                        <div className="card bd-0 shadow">
                          <div className="card-body pd-lg-60">
                            <form onSubmit={submitEmail}>
                              <div className="form-row">
                                <div className="form-group col-md-12">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Your Name
                                  </label>
                                  <input
                                    name="name"
                                    type="text"
                                    className="form-control contact"
                                    id="inputEmail4"
                                    placeholder="Enter Name"
                                    onChange={handleStateChange}
                                    value={name}
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group col-md-12">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Phone Number
                                  </label>
                                  <input
                                    name="phone"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter Number"
                                    onChange={handleStateChange}
                                    value={phone}
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group col-md-12">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Email Address
                                  </label>
                                  <input
                                    name="email"
                                    type="email"
                                    className="form-control contact"
                                    id="inputEmail4"
                                    placeholder="Enter Email Address"
                                    onChange={handleStateChange}
                                    value={email}
                                  />
                                </div>
                                {/* <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Company Name
                                  </label>
                                  <input
                                    name="company"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter Company Name"
                                    onChange={handleStateChange}
                                    value={company}
                                  />
                                </div> */}
                              </div>
                              {/* <div className="form-row">
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Designation
                                  </label>
                                  <input
                                    name="designation"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter Designation"
                                    onChange={handleStateChange}
                                    value={designation}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Industry
                                  </label>
                                  <input
                                    name="industry"
                                    type="text"
                                    className="form-control contact"
                                    id="inputEmail4"
                                    placeholder="Enter Industry"
                                    onChange={handleStateChange}
                                    value={industry}
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    Employee Count
                                  </label>
                                  <input
                                    name="employee"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter Number"
                                    onChange={handleStateChange}
                                    value={employee}
                                  />
                                </div>
                                <div className="form-group col-md-5">
                                  <label
                                    htmlFor="name"
                                    className="tx-14 tx-com tx-blac mg-b-3"
                                  >
                                    City
                                  </label>
                                  <input
                                    name="city"
                                    type="text"
                                    className="form-control contact"
                                    placeholder="Enter City"
                                    onChange={handleStateChange}
                                    value={city}
                                  />
                                </div>
                              </div> */}
                              <button
                                type="submit"
                                className="btn btn-primary pd-x-40 mg-t-20"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 order-md-2 pd-md-x-0 mar-left h-100">
                    <img
                      src="./assets/img/woman_smiling.png"
                      className="img-fluid h-100"
                      data-aos="fade-down"
                      data-aos-duration={3000}
                      alt=""
                    />
                  </div>
                </div>
              </section>
              <section className="camp-top">
                <div>
                  <div className="container bg-black">
                    <div>
                      <div className="row">
                        <div className="col-md-6 mg-t-20">
                          <div>
                            <img
                              src="./assets/img/mysogi_phone.png"
                              className="img-fluid img-neg-camp"
                              data-aos="fade-left"
                              data-aos-duration={2000}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mg-t-20">
                          <div className=" card-height text-white">
                            <div className="vert-center">
                              <p className="tx-28 text-white">
                                Join Mysogi Today
                              </p>
                              <p className="tx-16 tx-com fw-bold">
                                You're only a few minutes away from thousands of
                                unique publishers and direct advertisers. Don't
                                hesitate
                                <br /> - register and start testing right now
                              </p>
                              <Link
                                to="register"
                                type="button"
                                className="btn btn-primary pd-x-40 mg-t-20"
                              >
                                Get Started
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
            <Footer />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
