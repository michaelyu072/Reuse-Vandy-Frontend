import React from "react";
import { useState } from "react";
function Profile(props) {
  return (
    <div className="profilePopUp">


      {!props.currentUser ? (
        <button className="signInButton" onClick={props.signIn}>
          sign in
        </button>
      ) : (
        <></>
      )}
      {props.currentUser ? ( <>
      <div className = 'profileInfo'>
        <img className = 'profileImg' src = {props.currentUser.photoURL}></img>
    <p className = 'nameText'>{props.currentUser.displayName}
      <p className = 'emailText'>{props.currentUser.email}</p></p>
      </div>
        <button
          className="uploadButton"
          onClick={() => props.setButtonPopup(true)}
        >
          Upload Item
        </button>
      </>) : (
        <> </>
      )}
    </div>
  );
}

export default Profile;
