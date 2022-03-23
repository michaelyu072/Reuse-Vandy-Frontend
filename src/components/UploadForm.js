import React from "react";
import { useState } from "react";
import config from "../config";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getDownloadURL, ref } from "firebase/storage";
import CheckIcon from '@mui/icons-material/Check';

function UploadForm(props) {
  const [priceInput, updatePriceInput] = useState(0);
  const [categoryInput, updateCategoryInput] = useState("");
  const [descriptionInput, updateDescriptionInput] = useState("");
  const [nameInput, updateNameInput] = useState("");
  const [emailInput, updateEmailInput] = useState("");
  const [phoneInput, updatePhoneInput] = useState("");
  const [imageAsFile, setImageAsFile] = useState("");
  const [submitted, updateSubmitted] = useState(false);
  const [submitting, updateSubmitting] = useState(false);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    console.log(e.target.files[0]);
    setImageAsFile((imageFile) => image);
  };

  firebase.initializeApp(config);
  const db = firebase.firestore();
  const dbStorage = firebase.storage();

  function writeUserData() {
    dbStorage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile)
      .then(() => {
        var storageRef = ref(dbStorage, `images/${imageAsFile.name}`);

        getDownloadURL(storageRef).then((downloadURL) => {
          db.collection("count")
            .get()
            .then((res) => {
              var currentCount = 0;
              res.forEach((doc) => {
                console.log(doc.id, "=>", doc.data());
                currentCount = doc.data().value;
              });

              db.collection("items")
                .doc(`${parseInt(currentCount) + 1}`)
                .set({
                  itemPrice: priceInput,
                  itemCategory: categoryInput,
                  itemDescription: descriptionInput,
                  sellerName: nameInput,
                  sellerEmail: emailInput,
                  sellerPhone: phoneInput,
                  sellerPhoto: downloadURL,
                })
                .then((res) => {
                  updateSubmitted(true);
                });

              db.collection("count")
                .doc("1")
                .set({ value: currentCount + 1 });
            });
        });
      });
  }

  function checkFilled() {
    return priceInput && descriptionInput && nameInput && emailInput;
  }

  return (
    <section className="uploadForm">
      <div className="formInner" >
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          X
        </button>
        {!submitted ? (
          <>
            <h3 className="formTitle"> Upload Your Item! </h3>
            <form id="myForm">
              <label className="formLabel">Item Description: </label>
              <input
                className="formInput"
                required
                type="text"
                onChange={(e) => {
                  updateDescriptionInput(e.target.value);
                }}
              />

              <label className="formLabel">Item Price: </label>
              <input
                className="formInput"
                required
                type="text"
                onChange={(e) => {
                  updatePriceInput(e.target.value);
                }}
              />

              <label className="formLabel">Your Name: </label>
              <input
                className="formInput"
                required
                type="text"
                onChange={(e) => {
                  updateNameInput(e.target.value);
                }}
              />

              <label className="formLabel">Vandy Email: </label>
              <input
                className="formInput"
                required
                type="email"
                onChange={(e) => {
                  updateEmailInput(e.target.value);
                }}
              />

              <label className="formLabel">Phone Number: </label>
              <input
                className="formInput"
                type="tel"
                onChange={(e) => {
                  updatePhoneInput(e.target.value);
                }}
              />

              <label className="formLabel">Item Category: </label>
              <select
                className="formInput"
                onChange={(e) => {
                  updateCategoryInput(e.target.value);
                }}
              >
                <option value="Book">Other</option>
                <option value="Clothing">Clothing</option>
                <option value="School Supply">School Supply</option>
                <option value="Food">Food</option>
                <option value="Other">Book</option>
              </select>
              
              <label className="formLabel">Item Image: </label>
              <input
                className="pictureInput"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImageAsFile}
              />
            </form>
            <button
              className="btn-submit"
              disabled={!checkFilled() || submitting}
              type="submit"
              onClick={() => {
                updateSubmitting(true);
                writeUserData();
              }}
            >
              {!submitting ? 'Submit!' : 'Submitting'}
            </button>{" "}
          </>
        ) : (
          <div className = 'submittedBox'>
          <div className = 'submittedIconBox'>
            <CheckIcon/>
          </div>
          <p>Submitted!</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default UploadForm;
