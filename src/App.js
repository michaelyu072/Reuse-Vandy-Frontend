import React from "react";
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import { useSpring, animated} from 'react-spring';
import {useState, useEffect} from 'react';

function App(props) {

    const [rendered, toggleRendered] = useState(localStorage.getItem('userID') ? true : false);
    const [searchTerm, updateSearchTerm] = useState('');
    const moves = useSpring({opacity : rendered ? 1 : 0, config: {duration: 1000}});
    const [searchToggle, flipSearchToggle] = useState(true);
    const [searching, setSearching] = useState(false);
    const [displayMyItem, setDisplayMyItem] = useState(false);

    function displayMyItemList(isDisplayMyItem) {
      setDisplayMyItem(isDisplayMyItem);
    }

    function updateSearch(newTerm) {
      updateSearchTerm(newTerm);
    }

    function search(button) {
      console.log('search');
      setSearching(true);
      flipSearchToggle(!searchToggle);
      if(button) {
        displayMyItemList(false);
      }
    }

    useEffect(() => {
        toggleRendered(true);
    }, [])


  return (
    <section className="main">
      <animated.div className="searchContainer" style = {moves}>
        {/* <Heading /> */}
        <SearchBar updateSearch = {updateSearch} search = {search} />
        <Results stopSearch = {() => {setSearching(false)}} 
        searching = {searching} searchTerm = {searchTerm} searchToggle = {searchToggle} search = {search}
        displayMyItem = {displayMyItem} displayMyItemList = {displayMyItemList}
        />
      </animated.div>
    </section>
  );
}

export default App;