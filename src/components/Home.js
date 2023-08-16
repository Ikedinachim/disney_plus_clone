import React from 'react';
import { useEffect } from 'react';
import classes from './Home.module.css'
import ImageSlider from './ImageSlider';
import Movies from './Movies';
import Viewers from './Viewers';
import db from '../firebase';
import { collection, DocumentSnapshot } from 'firebase/firestore/lite';



const Home = () => {
    useEffect(() =>{
       const w = collection(db,'/movies');
       console.log(w)
       DocumentSnapshot().get
        
        // db.collection('movies').onSnapshot((snapshot) =>{
        //     console.log(snapshot);
        // })

    },[])
  
    return (
        <main>
            <ImageSlider />
            <Viewers />
            <Movies />
        </main>
    );
};

export default Home;