import React from "react";
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import { useSpring, animated} from 'react-spring';
import {useState, useEffect} from 'react';

function App(props) {

    const [rendered, toggleRendered] = useState(false);
    const moves = useSpring({opacity : rendered ? 1 : 0, config: {duration: 1000}});



    


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