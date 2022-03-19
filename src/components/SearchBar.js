import React from "react";
import Form from './UploadForm';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {
  const [buttonPopup, setButtonPopup] = React.useState(false);

  return (
    <section className = 'searchBarContainer'>
        <div className = 'logoContainer'>
            <p className = 'reuseWord'>Reuse</p>
            <p className = 'vandyWord'>Vandy</p>
        </div>
        <div className = 'searchBarBox'>
        <input placeholder = 'Search Reuse Vandy'
         defaultValue = {props.keyword}
        className = 'searchBar'
        // onChange = {(e) => {props.updateTerm(e.target.value);}}
        />
        <button className = 'searchButton'><SearchIcon/></button>
        </div>
        <div className = 'profileContainer'>
        <button className = 'uploadButton'
          onClick={()=> setButtonPopup(true)}>
          Upload Item
        </button>
        { buttonPopup ? <Form
          trigger = {buttonPopup}
          setTrigger = {setButtonPopup}/> : <></> }
            <AccountCircleRoundedIcon/>
        </div>
    </section>
  );
}

export default SearchBar;
