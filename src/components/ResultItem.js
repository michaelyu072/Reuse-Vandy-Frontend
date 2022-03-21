import React from "react";

function ResultItem(props) {

    const obj = props.data;

  return (
      <div className = 'resultShadowBox'>
    <div className = 'resultItemBox'>
        <div className = 'itemImgBox'>
        <img className = 'itemImg' src = {obj.sellerPhoto}>
        </img>
        </div>
        <div className = 'itemDescriptions'> 
            <p className = 'vandyEmail'>Seller: {obj.sellerName}</p>
            <p className = 'vandyEmail'>Email: {obj.sellerEmail}</p>
            <p className = 'phoneNumber'>Phone: {obj.sellerPhone}</p>
        </div>
        <div className = 'itemCheckoutBox'>
            <p className = 'descriptionBox'>{obj.itemDescription}</p>
            <p className = 'price'>${obj.itemPrice}</p>
        </div>
    </div>
    </div>
  );
}

export default ResultItem;