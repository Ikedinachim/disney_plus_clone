// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "rc-slider/assets/index.css";
import Header from "./layout/Header";
import Footer from "./app/Footer";
import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";
import WhyContainer from "./widgets/WhyContainer/WhyContainer";
import PriceList from "./widgets/priceList";
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
            <section className="home-section">
              <div className="home-section-container">
                <div className="home">
                  <div className="home-left-div">
                    <div className="home-left-div-container">
                      <h3 className="home-left-div-h3">
                        Advertise. Connect. Convert.
                      </h3>
                      <div className="home-rectangle">
                        <span className="home-rectangle-span"></span>
                      </div>

                      <h1 className="home-left-div-h1">
                        Promote & Grow your business with <span>Mysogi</span>{" "}
                        Ads.
                      </h1>
                      <h2 className="home-left-div-h2">
                        The most powerful advertisting solution for your brand
                      </h2>
                    </div>
                    <Link
                      to={"/register"}
                      className="btn btn-primary pd-x-40 btn-auth get-started-btn"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="home-img-container ">
                    <img
                      src="./assets/img/bg-1.png"
                      alt="image"
                      className="home-img-desktop"
                    />
                    <img
                      src="./assets/img/mobile-bg.png"
                      className="home-img-mobile"
                    />
                  </div>
                </div>
              </div>
            </section>
            <div className="description-div" id="about-us">
              <p>
                Mysogi Company Limited is a tech company that specializes in
                Digital Marketing. Our State Of the Art web-based digital
                campaign manager enables Agencies, Corporations & SMEs to
                promote and target adverts to prospective customers.
              </p>
            </div>
            {/* <button className="get-started-btn">Get Started</button> */}
            <div>
              <section className=" " id="section-two">
                <div className="col-md-12 section-two">
                  <div
                    className="vert-center col-md-6"
                    data-aos="fade-left"
                    data-aos-duration={2000}
                  >
                    <div className="section-two-left-div">
                      <h1>Billboard</h1>
                      <h1>
                        <span>Campaign</span>
                      </h1>
                      <h1>Ads</h1>
                      <div className="section-two-rectangle"></div>
                      <b>What's this?</b>
                      <p>
                        Put your brand on digital billboards in just a few taps
                        starting from 30k₦/day. No contracts and no upfront
                        pricing required. Get the best quality for the cheapest
                        price.
                      </p>
                    </div>
                  </div>
                  <div className="section-two-img-container col-md-6">
                    <img
                      src="./assets/img/billboard.png"
                      alt=""
                      className="section-two-img  "
                      data-aos="fade-right"
                      data-aos-duration={2000}
                    />
                  </div>
                </div>

                <PriceList />
              </section>
            </div>

            <section className="bg-pinkish" id="section-three">
              <div className="section-three col-md-12">
                <div className="section-three-img-container col-md-6">
                  <img
                    className="section-three-img"
                    data-aos="fade-right"
                    data-aos-duration={2000}
                    src="./assets/img/sectionthree.png"
                    alt=""
                  />
                </div>
                <div
                  className="vert-center col-md-6"
                  data-aos="fade-left"
                  data-aos-duration={2000}
                >
                  <div className="section-three-right-div">
                    <h1>Smart</h1>
                    <h1>
                      <span>SMS</span>
                    </h1>
                    <h1>Ads</h1>

                    <div className="section-three-rectangle"></div>
                    <b>What's this?</b>
                    <p>
                      The SMS marketing feature allows customers send targeted
                      campaigns to their customers, which can be targeted by
                      state, Town, Local government, gender, monthly spend, etc.
                      This will ensure that customers are targeting the right
                      demography for their products. SMART SMS marketing can be
                      used to deliver everything that traditional marketing can
                      deliver today.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="section-four-section" id="section-four">
              <div className="container pb-md-5">
                <div className="section-four col-md-12">
                  <div
                    className="vert-center col-md-6"
                    data-aos="fade-left"
                    data-aos-duration={2000}
                  >
                    <div className="section-four-left-div">
                      <h1>High</h1>
                      <h1>
                        <span>Visual</span>
                      </h1>
                      <h1>Display Ads</h1>
                      <div className="section-four-rectangle"></div>
                      <b>What's this?</b>
                      <p>
                        Drive awareness on relevant display channels and drive
                        traffic to your offer, using Mysogi's programmatic
                        display feature to reach your target audience when they
                        consume relevant content online. We will combine the
                        best targeting approach to reach the audience.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 section-two-img-container">
                    <img
                      src="./assets/img/sectionfour.png"
                      className="section-four-img "
                      data-aos="fade-right"
                      data-aos-duration={2000}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-pinkish" id="section-five">
              <div className="section-five col-md-12">
                <div className="col-md-6 section-five-img-container">
                  <img
                    src="./assets/img/Rectangle.png"
                    className="section-five-img "
                    data-aos="fade-right"
                    data-aos-duration={2000}
                    alt=""
                  />
                </div>
                <div
                  className="vert-center col-md-6"
                  data-aos="fade-left"
                  data-aos-duration={2000}
                >
                  <div className="section-five-right-div">
                    <h1>Voice</h1>
                    <h1>
                      <span>Ads</span>
                    </h1>

                    <div className="section-five-rectangle"></div>
                    <b>What's this?</b>
                    <p>
                      Our Voice Ads Services seamlessly helps you deliver
                      pre-recorded messages and any other promotional
                      information directly to customers, enlightening them about
                      products, services, new offers, discounts upgrades and a
                      whole lot more, especially in media-dark regions.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="section-six-container" id="section-six">
              <div className="section-six col-md-12">
                <div
                  className="vert-center col-md-6"
                  data-aos="fade-left"
                  data-aos-duration={2000}
                >
                  <div className="section-six-left-div ">
                    <h1>Influencer</h1>
                    <h1>
                      <span>Marketing</span>
                    </h1>
                    <h1>Ads</h1>
                    <div className="section-six-rectangle"></div>
                    <b>What's this?</b>
                    <p>
                      The Mysogi platform aggregates influencers and makes it
                      easy to access influencers that are registered on our
                      platform. With Mysogi platform, it is as easy as typing
                      what you need the specific influencer to post on his
                      platform and the other part is basically taken care of
                      from our platform.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 section-three-img-container">
                  <img
                    className="section-six-img"
                    data-aos="fade-right"
                    data-aos-duration={2000}
                    src="./assets/img/influencer.png"
                    alt=""
                  />
                </div>
              </div>
            </section>

            <section
              className="bg-pinkish section-three-container"
              id="mini-website"
            >
              <div className="section-three col-md-12">
                <div className="section-three-img-container col-md-6">
                  <img
                    className="section-three-img"
                    data-aos="fade-right"
                    data-aos-duration={2000}
                    src="./assets/img/miniwebsite.png"
                    alt=""
                  />
                </div>
                <div
                  className="vert-center col-md-6"
                  data-aos="fade-left"
                  data-aos-duration={2000}
                >
                  <div className="section-three-right-div">
                    <h1>Mini</h1>
                    <h1>
                      <span>Website</span>
                    </h1>

                    <div className="section-three-rectangle"></div>
                    <b>What's this?</b>
                    <p>
                      Want a personal e-commerce website,to showcase your goods
                      and services in detail? Mysogi gives your brand/business a
                      website in 5minutes for free!
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="section-eight-container" id="section-eight">
              <div className="section-eight col-md-12">
                <div
                  className="vert-center col-md-6"
                  data-aos="fade-left"
                  data-aos-duration={2000}
                >
                  <div className="section-eight-left-div ">
                    <h1>App</h1>
                    <h1>
                      <span>Download</span>
                    </h1>
                    <h1>Campaign</h1>
                    <div className="section-eight-rectangle"></div>
                    <b>What's this?</b>
                    <p>
                      Mysogi Ads App Download Channel is a powerful platform
                      that helps you create and manage mobile app ad campaigns
                      across multiple networks. With our easy-to-use interface,
                      you can set up your campaigns in minutes, target your
                      ideal audience, and track your results in real-time.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 section-eight-img-container">
                  <img
                    className="section-eight-img"
                    data-aos="fade-right"
                    data-aos-duration={2000}
                    src="./assets/img/campaign_img.png"
                    alt=""
                  />
                </div>
              </div>
            </section>
            <div className="why-mysogi-section">
              <h2>
                <span>Why</span> Mysogi?
              </h2>
              <div className="why-mysogi-container">
                <WhyContainer
                  imagePath="./assets/img/invest.png"
                  title="High return on Investment"
                  content="We provide a well optimised system that allows you access to all you need to grow your business, thereby giving you your money's worth of service"
                />
                <WhyContainer
                  imagePath="./assets/img/increase.png"
                  title="Increase Leads & Customers "
                  content="We allow you to focus on the people who are searching for what your business offers. Watch your number increase with our transparent process."
                />
                <WhyContainer
                  imagePath="./assets/img/target.png"
                  title="Target Demography"
                  content="We target on the basis of age, gender and location to communicate with relevance and precision."
                />
              </div>
            </div>
            <section className="section-seven-container" id="section-seven">
              <div className={"section-seven"}>
                <div className="section-seven-left-div">
                  <h1>
                    Build your Brand with <span>Mysogi</span>
                  </h1>

                  <p>The smartads company...</p>
                  <img
                    className="mobImage"
                    src="./assets/img/mysogipic.png"
                    alt=""
                  />
                  <Link to={"/register"}>
                    <button>Join Mysogi Today</button>
                  </Link>
                </div>
                <img
                  className="sogiImage"
                  src="./assets/img/mysogiapp.png"
                  alt=""
                />
              </div>
            </section>
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
            {/* <section className="bg-reddish" id="mysogi-contact"> */}

            <div className="ask-section container-fluid" id="mysogi-contact">
              <div className="ask-section-container col-md-12 mx-auto">
                <div className=" align-items-center row mg-t-12">
                  <div className="ask-section-left-div col-md-6 col-sm-12">
                    <p>
                      I’m a <span>brand owner</span>, looking to create{" "}
                      <span>brand awareness</span>
                    </p>
                    <h1>Have questions? Let’s discuss.</h1>
                  </div>

                  {/* <div className="ask-section-right-div"> */}
                  <div className="col-md-6 mg-t-20 order-2col-sm-12">
                    <div className="card bd-0 shadow ask-section-card">
                      <div className="card-body pd-lg-60">
                        <form onSubmit={submitEmail}>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label
                                htmlFor="name"
                                className="tx-14 tx-bold tx-com label-black mg-b-8"
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
                                className="tx-14 tx-bold tx-com label-black mg-b-8"
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
                                className="tx-14 tx-bold tx-com label-black mg-b-8"
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
                            <div className="form-group col-md-12">
                              <label
                                htmlFor="notes"
                                className="tx-14 tx-bold tx-com label-black mg-b-8"
                              >
                                Notes
                              </label>
                              <input
                                name="notes"
                                type="text"
                                className="form-control contact"
                                placeholder="Enter your question/complaint"
                                onChange={handleStateChange}
                                // value={notes}
                              />
                            </div>
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
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* </section> */}

            <Footer />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
