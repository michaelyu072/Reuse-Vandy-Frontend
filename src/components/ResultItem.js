import React from "react";

function ResultItem(props) {

    const obj = props.data;

  return (
      <div className = 'resultShadowBox'>
    <div className = 'resultItemBox'>
        <div className = 'itemImgBox'>
        <img className = 'itemImg' src = {!obj.sellerPhoto.includes('undefined') ? obj.sellerPhoto : 'https://media.istockphoto.com/photos/isolated-shot-of-opened-blank-cardboard-box-on-white-background-picture-id520619396?k=20&m=520619396&s=612x612&w=0&h=4f0ZqIMkVHEIhq76j8qmI-nc55cBhx-nqgITFtoW6WI='}>
        </img>
        </div>
        <div className = 'itemCheckoutBox'>
            <p className = 'descriptionBox'>Item: {obj.itemDescription}</p>
            <p className = 'price'>${obj.itemPrice}</p>
        </div>
        <div className = 'itemDescriptions'> 
            <p className = 'vandyEmail'>Seller: {obj.sellerName}</p>
            <p className = 'vandyEmail'>Email: {obj.sellerEmail}</p>
            <p className = 'phoneNumber'>Phone: {obj.sellerPhone}</p>
        </div>

    </div>
    </div>
  );
}

export default ResultItem;