// /* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "rc-slider/assets/index.css";
import Header from "./layout/Header";
import Footer from './app/Footer';
import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";
import WhyContainer from "./widgets/WhyContainer/WhyContainer";
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
            <section className="home">
         

        
           
              <div className="center-div">

             <h1>Get your business to the target audience with <span>Mysogi</span></h1>
             <div className='rectangle'></div>
             <h3>Relied upon to get constant engagement with audience and provide the win your organisation needs.</h3>
             <button className='get-started-btn'>
                 Get Started
             </button>
              </div>
             <div className='description-div'>
         <p>Mysogi Company Limited is a tech company that specializes in Digital Marketing. Our State Of the Art web-based digital campaign manager enables Agencies, Corporations & SMEs to promote and target adverts to prospective customers.</p>

     </div>
           
         </section>
     
            <section className='section-two' > 
             <div
              className="vert-center"
              data-aos="fade-left"
              data-aos-duration={2000}
              >
            <div className='section-two-left-div'>
                <h1>Billboard</h1>
                <h1><span>Campaign</span></h1>
                <h1>Ads</h1>
                <div className='section-two-rectangle'></div>
                <b>What's this?</b>
                <p>
                Capture attention with eye striking visuals and reach highly engaged users with prominent ad spots
                </p>
            </div>
            </div>
           
            <img src="./assets/img/billboard_big.png"
            alt="" 
            className="section-two-img"
            data-aos="fade-right"
            data-aos-duration={2000}/>
            
        </section>
        
              <section className="bg-reddish">
              <div className='section-three' > 
            <img 
            className="section-three-img"
            // data-aos="fade-right"
            data-aos-duration={2000}
            src="./assets/img/section_three_pic.png" 
            alt=""
             />
            <div
              className="vert-center"
              data-aos="fade-left"
              data-aos-duration={2000}
              >
            <div className='section-three-right-div'>
                <h1>One-to-one</h1>
                <h1><span>SMS</span></h1>
                <h1>Advert</h1>
                <div className='section-three-rectangle'></div>
                <b>What's this?</b>
                <p>
                Deliver information with a high success rate and support your digital marketing efforts 
                </p>
            </div>
            </div>
        </div>
              </section>
              <section className="section-four-section">
                <div className="container pb-md-5">
                 <div className='section-four' > 
                 <div
                  className="vert-center"
                  data-aos="fade-left"
                  data-aos-duration={2000}
                  >
            <div className='section-four-left-div'>
                <h1>High</h1>
                <h1><span>Visual</span></h1>
                <h1>Display Ads</h1>
                <div className='section-four-rectangle'></div>
                <b>What's this?</b>
                <p>
                Capture attention with eye striking visuals and reach highly engaged users with prominent ad spots</p>
            </div>
            </div>
            <img src="./assets/img/sectionfour.png"  
              className="section-four-img "
              data-aos="fade-left"
              data-aos-duration={2000} alt="" />
            
        </div>
                </div>
              </section>
              <section className="bg-reddish">
                
              <div className='section-five' > 
            <img src="./assets/img/sectionfive.png"
              className="section-five-img"
            data-aos="fade-right"
            data-aos-duration={2000}
            alt="" />
            <div
                              className="vert-center"
                              data-aos="fade-left"
                              data-aos-duration={2000}
                            >
            <div className='section-five-right-div'>
            <h1>Phone</h1>
                <h1><span>Call</span></h1>
                <h1>Advert</h1>
               
                <div className='section-five-rectangle'></div>
                <b>What's this?</b>
                <p>
                Promote your brand on calls and enhance recall, especially in media dark region.
                </p>
            </div>
            </div>
            
        </div>
                </section>
              <section>
                
               
                <div className='section-six' > 
                <div
                  className="vert-center"
                  data-aos="fade-left"
                  data-aos-duration={2000}
                  >
        <div className='section-six-left-div'>
            <h1>Influencer</h1>
            <h1><span>Marketing</span></h1>
            <h1>Ads</h1>
            <div className='section-six-rectangle'></div>
            <b>What's this?</b>
            <p>
            Deliver information with a high success rate and support your digital marketing efforts
            </p>
        </div>
        </div>
        <img 
         data-aos="fade-left"
         data-aos-duration={2000}
         src="./assets/img/sectionsix.png" alt="" />
        
    </div>
              </section>
              <div className='why-mysogi-section'>
            <h2><span>Why</span> Mysogi?</h2>
            <div className='why-mysogi-container'>
               <WhyContainer 
               imagePath = "./assets/img/invest.png" 
               title = 'High return on Investment' 
               content = "We provide a well optimised system that allows you access to all you need to grow your business, thereby giving you your money's worth of service"/>
                <WhyContainer 
               imagePath = "./assets/img/increase.png" 
               title = 'Increase Leads & Customers ' 
               content = "We allow you to focus on the people who are searching for what your business offers. Watch your number increase with our transparent process."/>
                <WhyContainer 
               imagePath = "./assets/img/target.png" 
               title = 'Target Demography' 
               content = "We target on the basis of age, gender and location to communicate with relevance and precision."/>
            </div>
        </div>
        <div className={'section-seven'} > 
        <div className='section-seven-left-div'>
            <h1>Build your Brand with <span>Mysogi</span></h1>
           
            <p>The smartads company...</p>
        <img className='mobImage' src="./assets/img/mysogipic.png" alt="" />
            <button >
                Join Mysogi Today
            </button>
        </div>
        <img className='sogiImage' src="./assets/img/mysogiapp.png" alt="" />
        
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
              {/* <section className="bg-reddish" id="mysogi-contact"> */}
              <div className="ask-section">

<div className="ask-section-left-div">
    <p>
        I’m a <span>brand owner</span>, looking to create <span>brand awareness</span>
    </p>
    <h1>Have questions? Let’s discuss.</h1>
</div>

<div className="ask-section-right-div">
    {/* <form action="submit"> */}
        <div className="ask-section-input-div">
            <p>First Name</p>
            <input type="text" placeholder="Enter your first name" />
        </div>
        <div className="ask-section-input-div">
            <p>Email address</p>
            <input type="text" placeholder="Enter your email address" />
        </div>
        <div className="ask-section-phone-input">    
            <p>Phone number</p>
            <div className="ask-section-phone-div">
                <input className="ask-section-phone-drop"type="number" step={1} min={+1} max="596" defaultValue="234" />

                <input className="ask-section-phone-field" type="tel" />
            </div>
        </div>
        {/* <div className="ask-section-input-div">
            <p>Notes</p>
            <input type="text" placeholder="Enter your question/complaint" />
        </div> */}
        <button className="ask-section-submit-btn">Register</button>
    {/* </form> */}
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
