import React from "react";
import { useState } from "react";
function Profile(props) {
  return (
    <div className="profilePopUp" onClick = {(e) => {e.stopPropagation();}}>


      {!props.currentUser ? (
        <button className="signInButton" onClick={props.signIn}>
          Sign In
        </button>
      ) : (
        <></>
      )}
      {props.currentUser ? ( <>
      <div className = 'profileInfo'>
        <img className = 'profileImg' src = {props.userImg}></img>
    <p className = 'nameText'>{props.name}</p>
    <p className = 'emailText'>{props.email}</p>
      </div>
        <button
          className="uploadButton"
          onClick={() => props.setButtonPopup(true)}
        >
          Upload Item
        </button>
        <button className = 'signOutButton' onClick = {props.signOut}>
            Sign Out
        </button>
      </>) : (
        <> </>
      )}
    </div>
  );
}

export default Profile;
