import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import myImage from '../placeholder.png';

function ResultItem(props) {

    const obj = props.data;
    

  return ( 
      <div className = 'resultShadowBox'>
    <div className = 'resultItemBox'>
        <div className = 'itemImgBox'>
        <img className = 'itemImg' src = {!obj.sellerPhoto.includes('undefined') ? obj.sellerPhoto : myImage}>
        </img>
        </div>
        <div className = 'itemCheckoutBox'>
            <p className = 'descriptionBox'>Item: {obj.itemDescription}</p>
            <p className = 'price'>${obj.itemPrice}</p>
        </div>
        <div className = 'itemDescriptions'> 
            <p className = 'vandyEmail'>Seller: {obj.sellerName}</p>
            <p className = 'vandyEmail'>Email: {obj.sellerEmail}</p>
            {obj.sellerPhone ? <p className = 'phoneNumber'>Phone: {obj.sellerPhone}</p> : <></>}
        </div>
        {obj.sellerID == localStorage.getItem('userID') ? 
        <button className = 'deleteButton' onClick = {() => {props.delete(obj.itemID)}}><CloseIcon/></button> : <> </>}

    </div>
    </div>
  ) ;
}

export default ResultItem;