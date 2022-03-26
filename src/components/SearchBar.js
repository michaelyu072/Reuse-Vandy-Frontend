import React from "react";
import { useState } from 'react';
import Form from './UploadForm';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchIcon from '@mui/icons-material/Search';
import Profile from './Profile';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import config from '../config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';


function SearchBar(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [showProfile, setShowProfile] = useState('');

  const [userId, setUserId] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  firebase.initializeApp(config);
  const db = firebase.firestore();

  function signIn() {
    var provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((res) => {
        console.log(getAuth().currentUser.uid);
        setUserId(getAuth().currentUser.uid);
        setCurrentUser(getAuth().currentUser);

    })
}

  return (

    
    <section className = 'searchBarContainer'>
        <div className = 'logoContainer'>
            <p className = 'reuseWord'>Reuse</p>
            <p className = 'vandyWord'>Vandy</p>
        </div>
        <div className = 'searchBarBox'>
        <input placeholder = 'Search Reuse Vandy'
        className = 'searchBar'
        onChange = {(e) => {props.updateSearch(e.target.value);}}
        />
        <button className = 'searchButton' onClick = {props.search}><SearchIcon/></button>
        </div>


        <div className = 'profileContainer'>
        <div onClick = {() => {setShowProfile(!showProfile)}}>
        {currentUser ? <img className = 'profileImg' src = {currentUser.photoURL}></img> : <AccountCircleRoundedIcon/>}
        {showProfile ?
        <Profile setButtonPopup = {() => {setButtonPopup(true)}}signIn = {signIn} currentUser = {currentUser}/> : <></>}
        </div>

        { buttonPopup ? <Form
          trigger = {buttonPopup}
          setTrigger = {setButtonPopup}/> : <></> }

        </div>

    </section>
  );
}

export default SearchBar;
