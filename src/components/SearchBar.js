import React from "react";
import { useState, useEffect } from 'react';
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
  const [currentUser, setCurrentUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userImg, setUserImg] = useState('');
  const [signInToken, setSignIn] = useState(false);

  firebase.initializeApp(config);
  const db = firebase.firestore();
  function signIn() {
    var provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((res) => {
        const user = getAuth().currentUser;
        setCurrentUser(user);
        localStorage.setItem('userImg', user.photoURL);
        localStorage.setItem('userID', user.uid);
        localStorage.setItem('name', user.displayName);
        localStorage.setItem('email', user.email);
        setSignIn(true);
    })
}

  function signOutOfFirebase() {
    signOut(getAuth()).then((res)=> {
      console.log(res);
      localStorage.clear();
      window.location.reload();
      console.log('signed out');
    });
  }

useEffect(() => {

  if(localStorage.getItem('userID')) {
      console.log('called');
      setCurrentUser(localStorage.getItem('userID'));
      setName(localStorage.getItem('name'));
      setEmail(localStorage.getItem('email'));
      setUserImg(localStorage.getItem('userImg'));
  }
}, [signInToken]);


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
        {currentUser ? <img className = 'profileImg' src = {userImg}></img> : <AccountCircleRoundedIcon/>}
        {showProfile ?
        <Profile name = {name} email = {email} userImg = {userImg} signOut = {signOutOfFirebase}
        setButtonPopup = {() => {setButtonPopup(true)}}signIn = {signIn} currentUser = {currentUser}/> : <></>}
        </div>

        { buttonPopup ? <Form
          trigger = {buttonPopup}
          setTrigger = {setButtonPopup}/> : <></> }

        </div>

    </section>
  );
}

export default SearchBar;
