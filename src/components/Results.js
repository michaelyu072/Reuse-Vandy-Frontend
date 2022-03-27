import React from "react";
import ResultItem from './ResultItem';
import config from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState, useEffect } from 'react';


function Results(props) {

    const [dataArray, setDataArray] = useState([]);
    const [myItemArray, setMyItemArray] = useState([]);
    const [noResult, setNoResult] = useState(false);
    const [displayMyItem, setDisplayMyItem] = useState(false);
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
        const normalizedQuery = q.toLowerCase().split(/[\s-\,!?]/);
        console.log(normalizedQuery);
        db.collection("items").where('sellerFields', 'array-contains-any', normalizedQuery).get().then((res) => {
            if (res.empty){
                // EMPTY
            }

            res.forEach(doc => {
                userData.push(doc.data());
              });
              console.log('results: ');
              console.log(userData);
              setDataArray(userData);
              if(userData.length == 0) {
                  setNoResult(true);
              }

        });
    
        props.stopSearch();
     }, [props.searchToggle]);

     useEffect(() => {

        console.log('called');
        var userData = [];
        console.log(localStorage.getItem('userID'));
        db.collection("items").where('sellerID', '==', localStorage.getItem('userID')).get().then((res) => {
            if (res.empty){
                console.log('got nothing');
            }

            res.forEach(doc => {
                userData.push(doc.data());
              });
              console.log('myItems: ');
              console.log(userData);
              setMyItemArray(userData);
              if(userData.length == 0) {
                  setNoResult(true);
              }

        });
    
        props.stopSearch();
     }, [props.searchToggle]);
   
     const currentArray = displayMyItem ? myItemArray : dataArray;
     console.log(currentArray);
   

    return (<>
        <section className = 'resultSwitches'>
        <button className = {! displayMyItem ? 'resultSwitchYes' : 'resultSwitchNot'} onClick = {() => {setDisplayMyItem(false)}}>Search Results</button>
        <button className = { displayMyItem ? 'resultSwitchYes' : 'resultSwitchNot'} onClick = {() => {setDisplayMyItem(true)}}>My Items</button>
        </section>
        <section className = 'resultsBox'>
            {currentArray.length != 0 ? currentArray.map((c, index) => {
                   if(index < 40) {
                    return <ResultItem delete = {deleteItem} data = {currentArray[index]} key = {index}/>;
                   }
            }) : !props.searching && noResult ? <p className = 'resultsText'>No Result</p> : <p className = 'resultsText'>Loading</p>}
        </section></>
    );
}

export default Results;
