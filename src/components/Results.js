import React from "react";
import ResultItem from './ResultItem';
import config from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState, useEffect } from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from 'firebase/auth';


function Results() {

    const [dataArray, setDataArray] = useState([]);

    firebase.initializeApp(config);
    const db = firebase.firestore();

    useEffect(() => {

        var newData = [];

        var query = db.collection('items');
        query.where('itemDescription', '==', 'a').get().then((res) => {
            
    
            res.forEach(doc => {
                if (!newData.includes(doc.data()));
                newData.push(doc.data());
              });
            
        

            query = db.collection('items');

            query.where('itemCategory', '==', 'Clothing').get().then((res) => {
            
                res.forEach(doc => {
                    if (!newData.includes(doc.data()));
                        console.log(doc.data());
                        newData.push(doc.data());
                });
                setDataArray(newData);
            });
    });
    }, []);
    console.log(dataArray);

    return (
        <section className = 'resultsBox'>
            {dataArray.length != 0 ? dataArray.map((c, index) => {
                   if(index < 40) {
                    return <ResultItem data = {dataArray[index]} key = {index}/>;
                   }
            }) : <p>Loading</p>}
        </section>
    );
}

export default Results;