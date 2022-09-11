import React from 'react';
import classes from './Viewers.module.css'
const Viewers = () => {
    return (
        <div className={classes.viewers}>
            <div>
                <img src="images/viewers-disney.png" alt="" />
            </div>
            <div>
                <img src="images/viewers-pixar.png" alt="" />
            </div>
            <div>
                <img src="images/viewers-marvel.png" alt="" />
            </div>
            <div>
                <img src="images/viewers-starwars.png" alt="" />
            </div>
            <div>
                <img src="images/viewers-national.png" alt="" />
            </div>
        </div>
    );
};

export default Viewers;