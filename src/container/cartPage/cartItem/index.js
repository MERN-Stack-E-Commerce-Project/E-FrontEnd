import React, { useState } from "react";
import "./style.css";


export default function CartItem(props) {
  console.log("props.cartItems",props.cartItem)
  const { _id, name, price,  img } = props.cartItem;
  const [qty,setqty]=useState(props.cartItem.qty);


  const Inc=()=>{
    setqty(qty+1);
    props.onQuantityInc(_id,qty+1);
  }
  const Dec=()=>{
    if(qty<=1)return;
    setqty(qty-1);
    props.onQuantityDec(_id,qty-1);
  }
  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={img} alt="" />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <div>Delivery in 3-5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        <div className="quantityControl">
          <button onClick={Dec}>-</button>
          <input value={qty} />
          <button onClick={Inc}>+</button>   
        </div>
        <button className="cartActionBtn">save for later</button>
        <button className="cartActionBtn">Remove</button>
      </div>
    </div>
  );
}
