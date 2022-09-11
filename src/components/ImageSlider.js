import React from 'react';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick';
import classes from './ImageSlider.module.css'

const ImageSlider = () => {
    const settings = {
        speed:500,
        dots: true,
        infinite:true,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
    }
    return (
        <Slider      className={classes.carousal} {...settings}>
            <div>

           <img src="images/slider-badging.jpg" alt="" />
            </div>
            <div>

           <img src="images/slider-badag.jpg" alt="" />
            </div>
            <div>

           <img src="images/slider-badging.jpg" alt="" />
            </div>
           </Slider>
    );
};

export default ImageSlider;