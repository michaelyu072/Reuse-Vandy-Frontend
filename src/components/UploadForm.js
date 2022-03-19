import React from "react";
import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref, set, child } from 'firebase/database';
import 'firebase/database';

class UploadForm extends React.Component {
  render() {



    const config = {
      apiKey: "AIzaSyBo7Z9_lTljySJYVR-LzmjIRi9wnXa4qd0",
      authDomain: "dsc-test-dd32c.firebaseapp.com",
      databaseURL: "https://dsc-test-dd32c-default-rtdb.firebaseio.com/",
      projectId: "dsc-test-dd32c",
      storageBucket: "dsc-test-dd32c.appspot.com",
      messagingSenderId: "464283554098",
      appId: "1:464283554098:web:3d245d05bd5c64bb65072b",
      measurementId: "G-ER7STWGLQ3"
    }
    const app = initializeApp(config);
    const database = getDatabase(app);
    

    const dataRef = ref(database);
  



    function writeUserData() {

      var currentTotal = 0;
      get(child(dataRef, 'total')).then((res) => {
          console.log(res.val());
          currentTotal = res.val().val;
          console.log(currentTotal);
          set(ref(database, `items/${currentTotal+1}`),
      {
        itemPrice: 13,
        itemCategory: "School Supply",
        itemDescription: 'cool guy',
        sellerName: "Kyle",
        sellerEmail: 'michael.x.yu@vanderbilt.edu',
        sellerPhone: '28191934362'
      });

      set(ref(database, "total"),
      {
        val: currentTotal + 1
      }
      );


      });
      
      
    };



    return (this.props.trigger) ? (
      <section className = "uploadForm">
          <div className = "formInner">
            <button className = "close-btn"
            onClick = {()=> this.props.setTrigger(false)}>
            X
             </button>


             <h3 className ="formTitle"> Upload Your Item! </h3>

             <form id = "myForm">


             <label className ="formLabel">Item Name: </label>
             <input className ="formInput" type = "text"/>


              <label className ="formLabel">Item Price: </label>
              <input className ="formInput" type = "text"/>

              <label className ="formLabel">Your Name: </label>
              <input className ="formInput" type = "text"/>

              <label className ="formLabel">Vandy Email: </label>
              <input className ="formInput" type = "email"/>

              <label className ="formLabel">Phone Number: </label>
              <input className ="formInput" type = "tel"/>



              <label className ="formLabel">Item Category: </label>
              <select className ="formInput">
                <option value = 'Book'>Other</option>
                <option value = 'Clothing'>Clothing</option>
                <option value = 'School Supply'>School Supply</option>
                <option value = 'Food'>Food</option>
                <option value = 'Other'>Book</option>
              </select>


              <label className ="formLabel">Upload Picture: </label>
              <input className ="pictureInput" type = "file"/>

             </form>

             <button className = "btn-submit" type = "submit" onClick = {() => {writeUserData(); alert("pressed");}}> Submit! </button>

             </div>
             </section>
    ) : "";
  }
}

export default UploadForm;
