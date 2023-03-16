import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// import "../../App.css";
import "../../dashforge.css";
import "../../main.css";

const Footer = () => {
  return (
    <Fragment>
      <section className="footer">
      <div className='footer'>
                <div className='icons-div'>
                    <img src="./assets/img/logowhite.png" alt="" />
                    <div className='icons'>
                      <a href="https://twitter.com/MysogiAds">

                    <img src="./assets/img/twitter.png" alt="twitter-icon" />
                      </a>
                    <a href="https://www.instagram.com/mysogiads/">
                    <img src="./assets/img/instagram.png" alt="instagram-icon" />

                    </a>
                    <a href="https://www.linkedin.com/company/mysogicompanylimited/">
                    <img src="./assets/img/linkin.png" alt="linkdin-icon" />

                    </a>
                    <a href="https://www.facebook.com/MysogiAdsCompany">
                    <img src="./assets/img/facebook.png" alt="facebook-icon" />

                    </a>
                    </div>
                </div>
            <div className='inner-footer'>
                <div  className='links'>
                    <h2>Quick Links</h2>
                    <a href="#about-us">About Us</a>
                    <a href="#">Careers</a>
                    <a href="#">FAQs</a>
                    <a href="#mysogi-contact">Help center</a>
                    
                </div>
                <div  className='links'>
                    <h2>OUR SERVICES</h2>
                    <a href="#section-two">Billboard Marketing</a>
                    <a href="#mini-website">Ecommerce Mini Website</a>
                    <a href="#section-three">Smart Ads SMS</a>
                    <a href="#section-six">Influencer Marketing</a>
                    <a href="#section-four">Digital Ads</a>
                    <a href="#section-five">Voice Ads</a>
                    
                </div>
                <div  className='links'>
                    <h2>Contact Info</h2>
                    <p>9, Adedoyin Ogungbe Crescent,Lekki Phase 1, Lagos, Nigeria.</p>
                    <p>+234 812 088 9773</p>
                    <p>info@mysogi.com.ng</p>
                </div>
               
            </div>
        </div>
        
      </section>
    </Fragment>
  );
};

export default Footer;
