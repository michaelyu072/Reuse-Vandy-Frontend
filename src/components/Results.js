import React from "react";
import ResultItem from './ResultItem';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref, set, child, query, orderByKey, equalTo } from 'firebase/database';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import 'firebase/database';

function Results() {

    const config = {
        apiKey: "AIzaSyBo7Z9_lTljySJYVR-LzmjIRi9wnXa4qd0",
        authDomain: "dsc-test-dd32c.firebaseapp.com",
        databaseURL: "https://dsc-test-dd32c-default-rtdb.firebaseio.com/",
        projectId: "dsc-test-dd32c",
        storageBucket: "dsc-test-dd32c.appspot.com",
        messagingSenderId: "464283554098",
        appId: "1:464283554098:web:3d245d05bd5c64bb65072b",
        measurementId: "G-ER7STWGLQ3"
    }

    const app = initializeApp(config);
    const database = getDatabase(app);

    const searchRef = getFirestore(app);
    const dataRef = ref(database);
    get(child(dataRef, 'items/1')).then((res) => {
        console.log(res.val());
    })



  return (
    <section className = 'resultsBox'>
        <ResultItem/>
        <ResultItem/>
        <ResultItem/>
    </section>
  );
}

export default Results;