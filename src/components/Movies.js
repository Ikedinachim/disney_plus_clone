import React from 'react';
import classes from './Movies.module.css';

const Movies = () => {
    return (
        <div>
            <h4>Recommended for you</h4>
            <div className={classes.container}>
                <div className={classes.wrap}>
                    <img src="images/slider-badag.jpg" alt="" />
                </div>
                <div className={classes.wrap}>
                    <img src="images/slider-badag.jpg" alt="" />
                </div>
                <div className={classes.wrap}>
                    <img src="images/slider-badag.jpg" alt="" />
                </div>
                <div className={classes.wrap}>
                    <img src="images/slider-badag.jpg" alt="" />
                </div>
                <div className={classes.wrap}>
                    <img src="images/slider-badag.jpg" alt="" />
                </div>
                <div className={classes.wrap}>
                    <img src="images/slider-badag.jpg" alt="" />
                </div>
                <div className={classes.wrap}>
                    <img src="images/slider-badag.jpg" alt="" />
                </div>

            </div>
        </div>
    );
};

export default Movies;