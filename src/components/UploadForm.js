import React from "react";
import { useState } from 'react';
import config from '../config';
import { initializeApp } from "firebase/app";
import { get, getDatabase, onValue, ref, set, child } from "firebase/database";
import "firebase/database";

function UploadForm(props) {

    const [priceInput, updatePriceInput] = useState(0);
    const [categoryInput, updateCategoryInput] = useState('');
    const [descriptionInput, updateDescriptionInput] = useState('');
    const [nameInput, updateNameInput] = useState('');
    const [emailInput, updateEmailInput] = useState('');
    const [phoneInput, updatePhoneInput] = useState('');
    const [submitted, updateSubmitted] = useState(false);

    const app = initializeApp(config);
    const database = getDatabase(app);
    const dataRef = ref(database);

    function writeUserData() {
      var currentTotal = 0;
      get(child(dataRef, "total")).then((res) => {
        console.log(res.val());
        currentTotal = res.val().val;
        console.log(currentTotal);
        set(ref(database, `items/${currentTotal + 1}`), {
          itemPrice: priceInput,
          itemCategory: categoryInput,
          itemDescription: descriptionInput,
          sellerName: nameInput,
          sellerEmail: emailInput,
          sellerPhone: phoneInput,
        });
        set(ref(database, "total"), {
          val: currentTotal + 1,
        });
        updateSubmitted(true);
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
          {submitted ? (<>
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
