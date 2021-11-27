import React from 'react';
import styles from './loader.module.scss'
import LoadingGIF from '../../assets/img/loading.gif'


const Loader = () => {
    return (
        <div className={styles.loader}>
            <img src={LoadingGIF} alt='loader' style={{height:'100px'}}/>
        </div>
    );
};

export default Loader;