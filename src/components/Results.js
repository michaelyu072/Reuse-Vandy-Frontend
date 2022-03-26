import React from "react";
import ResultItem from './ResultItem';
import config from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState, useEffect } from 'react';


function Results(props) {

    const [dataArray, setDataArray] = useState([]);
    const [noResult, setNoResult] = useState(false);

    firebase.initializeApp(config);
    const db = firebase.firestore();

    useEffect(() => {

        var userData = [];
        const q = props.searchTerm;
        const normalizedQuery = q.trim().toLowerCase();
        db.collection("items").where('sellerFields', 'array-contains', normalizedQuery).get().then((res) => {

            if (res.empty){
                // EMPTY
            }

            res.forEach(doc => {
                userData.push(doc.data());
              });
              setDataArray(userData);
              if(userData.length == 0) {
                  setNoResult(true);
              }

        });
    
        props.stopSearch();
     }, [props.searchToggle]);
   

    return (
        <section className = 'resultsBox'>
            {dataArray.length != 0 ? dataArray.map((c, index) => {
                   if(index < 40) {
                    return <ResultItem data = {dataArray[index]} key = {index}/>;
                   }
            }) : !props.searching && noResult ? <p>No Result</p> : <p>Loading</p>}
        </section>
    );
}

export default Results;
