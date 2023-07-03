import React, { useEffect, useState } from "react";
import Card from "../../component/UI/Card";
import Layout from "../../component/Layout";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cartItem";
import "./style.css";
import { addToCart, getCartItems } from "../../actions";
import { MaterialButton } from "../../component/MaterialUI";
import { useNavigate } from "react-router-dom";
import PriceDetails from "../../component/PriceDetails";

export default function CartPage(props) {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  //   const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityInc = (_id, qty) => {
    // console.log("cartItems[_id]",_id,cartItems);
    if (cartItems[_id]) {
      const { name, price, img } = cartItems[_id];
      dispatch(addToCart({ _id, qty, name, price, img }));
    }
  };
  const onQuantityDec = (_id, qty) => {
    if (cartItems[_id]) {
      const { name, price, img } = cartItems[_id];
      dispatch(addToCart({ _id, qty, name, price, img }));
    }
  };


  if(props.onlyCartItems){
    return (
      <>

      {Object.keys(cartItems).map((key, indx) => (
        <CartItem
          key={indx}
          cartItem={cartItems[key]}
          onQuantityInc={onQuantityInc}
          onQuantityDec={onQuantityDec}
        />
      ))}
      </>
    )
  }

  return (
    <Layout>
      <div className="cartContainer">
        <Card headerLeft={"My Cart"} headerRight={<div>Deliver to</div>}>
          {/* <div> */}
            {Object.keys(cartItems).map((key, indx) => (
              <CartItem
                key={indx}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityInc}
                onQuantityDec={onQuantityDec}
              />
            ))}
          {/* </div> */}
          <div style={{
            width:"100%",
            display:"flex",
            background:"#ffffff",
            justifyContent:"flex-end",  
            boxShadow:'0 0 10px 10px #eee',
            padding:"10px 0",
            boxSizing:"border-box"
          }}>
          {
            
          <div>
            <MaterialButton 
              title="PLACE ORDER"
              style={{width:"300px"}}
              onClick={()=>navigate("/checkout")}
            />
           </div>
}
          </div>
        </Card>
        { cartItems && <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function(qty,key){
            return qty+cart.cartItems[key].qty;
          },0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice,key)=>{
            const {price,qty} = cart.cartItems[key];
            return totalPrice+ price*qty;
          },0)}

        />}


{/* 
        <Card
          style={{
            width: "380px",
          }}
        >
          Price
        </Card> */}
      </div>
    </Layout>
  );
}
