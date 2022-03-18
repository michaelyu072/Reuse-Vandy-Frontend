import React from "react";

class UploadForm extends React.Component {
  render() {
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

              <label className ="formLabel">Item Category: </label>
              <input className ="formInput" type = "text"/>

              <label className ="formLabel">Item Price: </label>
              <input className ="formInput" type = "text"/>

              <label className ="formLabel">Your Name: </label>
              <input className ="formInput" type = "text"/>

              <label className ="formLabel">Vandy Email: </label>
              <input className ="formInput" type = "email"/>

              <label className ="formLabel">Phone Number: </label>
              <input className ="formInput" type = "tel"/>

              <label className ="formLabel">Upload Picture: </label>
              <input className ="pictureInput" type = "file"/>

             </form>

             <button className = "btn-submit" type = "submit"> Submit! </button>

             </div>
             </section>
    ) : "";
  }
}

export default UploadForm;
