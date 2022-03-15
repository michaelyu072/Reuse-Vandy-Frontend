import React from "react";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {

  return (
    <section className = 'searchBarContainer'>
        <div className = 'logoContainer'>   
            <p className = 'reuseWord'>Reuse</p>
            <p className = 'vandyWord'>Vandy</p>
        </div>
        <div className = 'searchBarBox'>
        <input placeholder = 'search reuse vandy'
         defaultValue = {props.keyword} 
        className = 'searchBar' 
        // onChange = {(e) => {props.updateTerm(e.target.value);}}
        />
        <button className = 'searchButton'><SearchIcon/></button>
        </div>
        <div className = 'profileContainer'>
            <AccountCircleRoundedIcon/>
        </div>
    </section>
  );
}

export default SearchBar;