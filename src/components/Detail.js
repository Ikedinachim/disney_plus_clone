import React from 'react';
import classes from './Detail.module.css'

const Detail = () => {
    return (
        <div className={classes.container}>
            <div className={classes['background-image']}>
            <img src="images/login-background.jpg" alt="" />

            </div>
            <div className={classes['image-title']}>
            <img src="images/me.jpg" alt="" />
            </div>
            <div className={classes.controls}>
                <button className={classes['play-button']}>
                   <img src="images/play-icon-black.png" alt="" />
                   <span>

                    PLAY
                   </span>
                </button>
                <button className={classes['trailer-button']}>
                   <img src="images/play-icon-white.png" alt="" />
                   <span>TRAILER</span>
                    
                </button>
                <button className={classes['add-button']}>
                    <span>+</span>

                </button>
                <button className={classes['group-watch-button']}>
                <img src="images/group-icon.png" alt="" />
                </button>
               

            </div>
            <div className={classes.subtitle}>
                    This is a placeholder text baby boys and girls
                </div>
                <div className={classes.description}>
                A chinese mom who's sad when her grown son leaves home gets another chance at
                motherhood when one of her dumplings springs to life. But she find that nothing stays cute and small forever.
                </div>
        </div>
    );
};

export default Detail;