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
        db.collection('items').get().then((res) => {
            console.log(res);
            var newData = [];
            res.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                newData.push(doc.data());
              });
            setDataArray(newData);
        });
    }, [])


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