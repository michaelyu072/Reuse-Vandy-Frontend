import React from "react";
import ResultItem from './ResultItem';
import config from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState, useEffect } from 'react';


function Results() {

    const [dataArray, setDataArray] = useState([]);

    firebase.initializeApp(config);
    const db = firebase.firestore();

    useEffect(() => {

    

        var userData = [];
        const q = "huns";
        const normalizedQuery = q.trim().toLowerCase();
        db.collection("items").where('sellerFields', 'array-contains', normalizedQuery).get().then((res) => {

            if (res.empty){
                // EMPTY
            }
            console.log(res.empty)

            res.forEach(doc => {
                userData.push(doc.data());
                console.log(doc.data());
              });
            
              setDataArray(userData);

        });
    
    
     }, []);
   

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
