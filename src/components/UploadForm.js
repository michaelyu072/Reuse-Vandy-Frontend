import React from "react";
import { useState } from 'react';
import config from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function UploadForm(props) {

    const [priceInput, updatePriceInput] = useState(0);
    const [categoryInput, updateCategoryInput] = useState('');
    const [descriptionInput, updateDescriptionInput] = useState('');
    const [nameInput, updateNameInput] = useState('');
    const [emailInput, updateEmailInput] = useState('');
    const [phoneInput, updatePhoneInput] = useState('');
    const [submitted, updateSubmitted] = useState(false);

    firebase.initializeApp(config);
    const db = firebase.firestore();

    function writeUserData() {

      db.collection('count').get().then((res) => {
        var currentCount = 0;
        res.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            currentCount = doc.data().value;
        });
        console.log(currentCount);

        db.collection('items').doc(`${parseInt(currentCount)+1}`).set(
          {
            itemPrice: currentCount+1,
            itemCategory: 'deez',
            itemDescription: 'yobro',
            sellerName: 'mother',
            sellerEmail: '3t',
            sellerPhone: 'phoneInput',
          }
        );
        
        db.collection('count').doc('1').set({value: currentCount+1});
      });

    }

    return (
      <section className="uploadForm">
        <div className="formInner">

          <button
            className="close-btn"
            onClick={() => props.setTrigger(false)}
          >
            X
          </button>
          {!submitted ? (<>
          <h3 className="formTitle"> Upload Your Item! </h3>

          <form id="myForm">
            <label className="formLabel">Item Description: </label>
            <input className="formInput" type="text" onChange = {(e) => {updateDescriptionInput(e.target.value);}} />

            <label className="formLabel">Item Price: </label>
            <input className="formInput" type="text" onChange = {(e) => {updatePriceInput(e.target.value);}} />

            <label className="formLabel">Your Name: </label>
            <input className="formInput" type="text"  onChange = {(e) => {updateNameInput(e.target.value);}}/>

            <label className="formLabel">Vandy Email: </label>
            <input className="formInput" type="email" onChange = {(e) => {updateEmailInput(e.target.value);}}/>

            <label className="formLabel">Phone Number: </label>
            <input className="formInput" type="tel" onChange = {(e) => {updatePhoneInput(e.target.value);}}/>

            <label className="formLabel">Item Category: </label>
            <select className="formInput" onChange = {(e) => {updateCategoryInput(e.target.value);}}>
              <option value="Book">Other</option>
              <option value="Clothing">Clothing</option>
              <option value="School Supply">School Supply</option>
              <option value="Food">Food</option>
              <option value="Other">Book</option>
            </select>

            {/* <label className="formLabel">Upload Picture: </label>
            <input className="pictureInput" type="file" /> */}
          </form>

          <button className ="btn-submit"type="submit" onClick={() => {
              writeUserData();
              alert("pressed");}} > Submit! </button> </>): <p>submitted!</p>}
        </div> 
      </section>);
  }

export default UploadForm;
