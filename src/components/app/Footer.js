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
                    <img src="./assets/img/twitter.png" alt="twitter-icon" />
                    <img src="./assets/img/instagram.png" alt="instagram-icon" />
                    <img src="./assets/img/telegram.png" alt="telegram-icon" />
                    <img src="./assets/img/youtube.png" alt="youtube-icon" />
                    <img src="./assets/img/facebook.png" alt="facebook-icon" />
                    </div>
                </div>
            <div className='inner-footer'>
                <div  className='links'>
                    <h2>Products</h2>
                    <a href="#">Visual Advert</a>
                    <a href="#">Text Advert</a>
                    <a href="#">Billboard Advert</a>
                    <a href="#">One-to-one Advert</a>
                    <a href="#">Ecommerce</a>
                </div>
                <div  className='links'>
                    <h2>Help and Support</h2>
                    <a href="#">FAQs</a>
                    <a href="#">Help center</a>
                    <a href="#">Report an issue</a>
                    
                </div>
                <div  className='links'>
                    <h2>Contact Us</h2>
                    <a href="#mysogi-contact">Send an email</a>
                    <a href="#mysogi-contact">Talk to a Customer Rep</a>
                </div>
                <div  className='links'>
                    <h2>Legals</h2>
                    <Link to={"/terms-of-use"}>
                    Terms and Policy
                  </Link>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
        </div>
        
      </section>
    </Fragment>
  );
};

export default Footer;
