import React from 'react';
import classes from './WhyContainer.module.css';

const WhyContainer = (props) => {
    return (
        <div className={classes.container}>
                    <img src={props.imagePath} alt="" />
                    <h4>{props.title}</h4>
                    <p>{props.content}</p>
                </div>
    );
};

export default WhyContainer;