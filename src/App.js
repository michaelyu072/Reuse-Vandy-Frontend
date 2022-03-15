import React from "react";
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref, set, child } from 'firebase/database';
import 'firebase/database';
import { useSpring, animated} from 'react-spring';
import {useState, useEffect} from 'react';

function App(props) {

    const [rendered, toggleRendered] = useState(false);
    const moves = useSpring({opacity : rendered ? 1 : 0, config: {duration: 1000}});

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
    

    function writeUserData() {
      set(ref(database, 'items/1'),
      {
        itemType: 'book',
        itemDescription: 'chicken',
        sellerEmail: 'michael.x.yu@vanderbilt.edu',
        sellerPhone: '2819193166'
      }
      );
    };

    // const itemRef = ref(database, 'item/1');
    // onValue(itemRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    // });

    const dataRef = ref(database);
    get(child(dataRef, 'items/1')).then((res) => {
      console.log(res.val());
    })

    


    useEffect(() => {
        toggleRendered(true);
    }, [])


  return (
    <section className="main">
      <animated.div className="searchContainer" style = {moves}>
        {/* <Heading /> */}
        <SearchBar keyword = {props.keyword} updateTerm = {props.update} />
        <Results/>
      </animated.div>
    </section>
  );
}

export default App;