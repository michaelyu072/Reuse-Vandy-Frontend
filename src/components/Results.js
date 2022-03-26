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

    function deleteItem(itemID) {
        if(window.confirm('You are about to delete an item!')) {
        console.log('deleted');
        console.log(itemID);
        const collectionRef = db.collection('items').where('itemID', '==', itemID)
        collectionRef.get().then((res) => {
            res.forEach((item) => {
            console.log(item);
              item.ref.delete().then((res) => {
              });
            });
            props.search();
        });
    }
    }     

    useEffect(() => {

        console.log('called');
        var userData = [];
        const q = props.searchTerm;
        const normalizedQuery = q.toLowerCase().split(/[\s-\.,!?]/);
        console.log(normalizedQuery);
        db.collection("items").where('sellerFields', 'array-contains-any', normalizedQuery).get().then((res) => {
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
                    return <ResultItem delete = {deleteItem} data = {dataArray[index]} key = {index}/>;
                   }
            }) : !props.searching && noResult ? <p className = 'resultsText'>No Result</p> : <p className = 'resultsText'>Loading</p>}
        </section>
    );
}

export default Results;
