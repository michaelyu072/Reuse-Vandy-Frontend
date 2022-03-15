import React from "react";

function ResultItem() {

  return (
      <div className = 'resultShadowBox'>
    <div className = 'resultItemBox'>
        <div className = 'itemImgBox'>
        <img className = 'itemImg' src = 'https://i.ebayimg.com/images/g/yXkAAOSw9jdeoQai/s-l400.jpg'>
        </img>
        </div>
        <div className = 'itemDescriptions'> 
            <p className = 'descriptionBox'>Campbell Biology AP Edition Eleventh Edition - Hardcover By Lisa A. Urry - GOOD</p>
            <p className = 'vandyEmail'>Email: michael.x.yu@vanderbilt.edu</p>
            <p className = 'phoneNumber'>Phone: 281-919-3166</p>
        </div>
        <div className = 'itemCheckoutBox'>
            <p className = 'price'>$20.00</p>
            <button className = 'checkoutButton'>Something</button>
        </div>
    </div>
    </div>
  );
}

export default ResultItem;