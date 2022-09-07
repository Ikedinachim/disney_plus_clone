import React from 'react';
import classes from './Header.module.css';

const Header = () => {
    return (
        <nav className={classes.nav}>
          <img src='images/logo.png' className={classes.logo} />

          <div className={classes['nav-menu']} >
            <a href="">
                <img src="images/home-icon.png"  alt="home icon" />
                <span>HOME</span>
            </a>
            <a href="">
                <img src="images/search-icon.png"  alt="home icon" />
                <span>SEARCH</span>
            </a>
            <a href="">
                <img src="images/watchlist-icon.png"  alt="home icon" />
                <span>WATCH LIST</span>
            </a>
            <a href="">
                <img src="images/original-icon.png"  alt="home icon" />
                <span>ORIGINALS</span>
            </a>
            <a href="">
                <img src="images/movie-icon.png"  alt="home icon" />
                <span>MOVIES</span>
            </a>
            <a href="">
                <img src="images/series-icon.png"  alt="home icon" />
                <span>SERIES</span>
            </a>

          </div>
          <img src="images/me.jpg" alt="user Image" className={classes['user-image']} />
        </nav >

    );
};

export default Header;


