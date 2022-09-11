import React from 'react';
import classes from './Home.module.css'
import ImageSlider from './ImageSlider';
import Movies from './Movies';
import Viewers from './Viewers';



const Home = () => {
  
    return (
        <main>
            <ImageSlider />
            <Viewers />
            <Movies />
        </main>
    );
};

export default Home;