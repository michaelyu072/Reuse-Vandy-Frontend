import React from "react";
import { useState } from 'react';
function Profile(props) {
  

  return (
      <div className = 'profilePopUp'>
        <img src = {props.currentUser? props.currentUser.photoURL : ''}>
        </img>
        <button onClick = {props.signIn}>
            sign in
        </button>
    </div>

  );
}

export default Profile;