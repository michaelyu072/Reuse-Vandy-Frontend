import React from "react";
import { useState, useEffect } from 'react';
import Form from './UploadForm';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SearchIcon from '@mui/icons-material/Search';
import Profile from './Profile';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import config from '../config';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';


function SearchBar(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [showProfile, setShowProfile] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userImg, setUserImg] = useState('');

  firebase.initializeApp(config);
  const db = firebase.firestore();
  function signIn() {
    localStorage.clear();
    var provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((res) => {
        const user = getAuth().currentUser;
          setCurrentUser(user);
          setShowProfile(false);
          window.location.reload();
    });
}

  function signOutOfFirebase() {
    signOut(getAuth()).then((res)=> {
      localStorage.clear();
      window.location.assign('https://accounts.google.com/logout');
    });
  }


onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log('signed in');
    localStorage.setItem('userImg', user.photoURL);
    localStorage.setItem('userID', user.uid);
    localStorage.setItem('name', user.displayName);
    localStorage.setItem('email', user.email);
    setCurrentUser(user.uid);
    setName(user.name);
    setEmail(user.email);
    setUserImg(user.photoURL);
    // ...
  } else {
    console.log('signed out');
  }
});


  return (

    
    <section className = 'searchBarContainer'>
        <div className = 'logoContainer'>
            <p className = 'reuseWord'>Reuse</p>
            <p className = 'vandyWord'>Vandy</p>
        </div>
        <div className = 'searchBarBox'>
        <input placeholder = 'Search By Item, Seller Vandy Email, or Seller Name'
        className = 'searchBar'
        onChange = {(e) => {props.updateSearch(e.target.value);}}
        />
        <button className = 'searchButton' onClick = {() => {props.search(true)}}><SearchIcon/></button>
        </div>


        <div className = 'profileContainer'>
        <div onClick = {() => {setShowProfile(!showProfile)}}>
        {currentUser ? <img className = 'profileImg' src = {userImg}></img> : <AccountCircleRoundedIcon/>}
        {showProfile ?
        <Profile name = {name} email = {email} userImg = {userImg} signOut = {signOutOfFirebase}
        setButtonPopup = {() => {setButtonPopup(true)}}signIn = {signIn} currentUser = {currentUser}/> : <></>}
        </div>

        { buttonPopup ? <Form search = {props.search}
          trigger = {buttonPopup}
          setTrigger = {setButtonPopup}/> : <></> }

        </div>

    </section>
  );
}

export default SearchBar;
