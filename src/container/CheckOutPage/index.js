// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Layout from "../../component/Layout";
// import { getAddress } from "../../actions";
// import { MaterialButton, MaterialInput } from "../../component/MaterialUI";
// import AddressForm from "./AddressForm";
// import "./style.css";
// import PriceDetails from "../../component/PriceDetails";

// const CheckoutStep = (props) => {
//   return (
//     <div className="checkoutStep">
//       <div
//         onClick={props.onClick}
//         className={`checkoutHeader ${props.active && "active"} `}
//       >
//         <div>
//           <span className="stepNumber">{props.stepNumber}</span>
//           <span className="stepTitle">{props.title}</span>
//         </div>
//       </div>
//       {props.body && props.body}
//     </div>
//   );
// };

// export default function CheckoutPage(props) {
//   const user = useSelector((state) => state.user);
//   const auth = useSelector((state) => state.auth);
//   const cart = useSelector((state) => state.cart);

//   const dispatch = useDispatch();
//   const [newAddress, setNewAddress] = useState(false);
  
//   const [address, setAddress] = useState([]);
//   const [confirmAddress, setConfirmAddress] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);

  
//   useEffect(() => {
//     auth.authenticate && dispatch(getAddress());
//   }, [auth.authenticate]);
  
//   useEffect(() => {
//     const address = user.address.map((adr) => ({
//       ...adr,
//       selected: false,
//       edit: false,
//     }));
//     setAddress(address);
//   }, [user.address]);
  
//   const onAddressSubmit = (addr) => {
//     setSelectedAddress(addr);
//     setConfirmAddress(true);
//   };

//   const selectAddress = (addr) => {
//     console.log(addr);
//     const updatedAddress = address.map((adr) =>
//       adr._id === addr._id
//         ? { ...adr, selected: true }
//         : { ...adr, selected: false }
//     );
//     setAddress(updatedAddress);
//   };

//   const enableAddressEditForm=(addr)=>{
//     const updatedAddress= address.map((adr)=>
//     (adr._id===addr._id)? {...adr,edit:true}:{...adr,edit:false})
//     setAddress(updatedAddress);
//   }

//   const resetAddressmarked=()=>{
//     const resetedAddress=address.map((adr)=>{
//       return {...adr,edit:false,selected:false};
//     })
//     setAddress(resetedAddress);

//   }

//   const confirmDeliveryAddress = (adr) => {
//     setSelectedAddress(adr);
//     setConfirmAddress(true);
//   };

//   return (
//     <Layout>
//       <div className="cartContainer" style={{ alignItems: "flex-start" }}>
//         <div className="checkoutContainer">
//           <CheckoutStep
//             stepNumber={"1"}
//             title={"LOGIN"}
//             active={!auth.authenticate}
//             body={
//               auth.authenticate ? (
//                 <div className="loggedInId">
//                   <span style={{ fontWeight: "500" }}>
//                     {auth.user.fullName}
//                   </span>
//                   <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
//                 </div>
//               ) : (
//                 <div>
//                   <MaterialInput label="Email" />
//                 </div>
//               )
//             }
//           />
//           <CheckoutStep
//             stepNumber={"2"}
//             title={"DELIVERY ADDRESS"}
//             active={!confirmAddress}
//             body={
//               <>
//                 {confirmAddress ? (
//                   <div className="selectedAddress">
//                     <div className="flexRow">
//                   <div>{`${selectedAddress.address}-${selectedAddress.pinCode}`}
//                   </div>
//                   <div>
//                         <MaterialButton
//                           onClick={() => {
//                             setConfirmAddress(false);
//                             setSelectedAddress();
//                             // setAddress([]);
//                           }}
//                           title={"CHANGE"}
//                           style={{
//                             width: "100px",
//                             margin: "20px 20px",
//                           }}
//                           bgColor="white"
//                           textColor="#2874f0"
//                         />
//                       </div>
//                   </div>                
//                 </div>):(
                
//                   address.map((adr) => (
//                     <div className="flexRow addressContainer">
//                       <div>
//                         <input
//                           onClick={() => selectAddress(adr)}
//                           name="address"
//                           type="radio"
//                         />
//                       </div>
//                       <div className="flexRow sb addressinfo">
//                       {!adr.edit? (                      
//                         <div>      
//                           <div>
//                             <span>{adr.name}</span>
//                             <span>{adr.addressType}</span>
//                             <span>{adr.mobileNumber}</span>
//                           </div>
//                           <div>{adr.address}</div>
//                           {adr.selected && (
//                             <MaterialButton
//                               onClick={() => confirmDeliveryAddress(adr)}
//                               title="DELIVERY HERE"
//                               style={{
//                                 width: "250px",
//                               }}
//                             />
//                           )}
//                         </div>     
//                         ):(
//                           <AddressForm
//                           withoutLayout={true}
//                           onSubmitform={onAddressSubmit}
//                           onCancel={()=>{}}
//                           onClick={resetAddressmarked}

//                           />
//                         )
//                         }
//                         {adr.selected && !adr.edit && <div onClick={()=>enableAddressEditForm(adr)}>EDIT</div>}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </>
//             }
//           />

//           {/* AddressForm from here */}
//           {confirmAddress ? null : newAddress ? (
//             <AddressForm
//               onSubmitform={onAddressSubmit}
//               setNewAddress={setNewAddress}
//               onCancel={() => {}}
//               onClick={setNewAddress}  
//             />
//           ) : (
//             <CheckoutStep
//               stepNumber={"+"}
//               title={"ADD NEW ADDRESS"}
//               active={false}
//               onClick={() => setNewAddress(true)}
//             />
//           )}
//           <CheckoutStep stepNumber={"3"} title={"ORDER SUMMARY"} />
//           <CheckoutStep stepNumber={"4"} title={"PAYMENT OPTIONS"} />
//         </div>
//         <div style={{ display: "block" }}>
//           <PriceDetails
//             totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
//               return qty + cart.cartItems[key].qty;
//             }, 0)}
//             totalPrice={Object.keys(cart.cartItems).reduce(
//               (totalPrice, key) => {
//                 const { price, qty } = cart.cartItems[key];
//                 return totalPrice + price * qty;
//               },
//               0
//             )}
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// }


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import Layout from "../../component/Layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../component/MaterialUI";
import PriceDetails from "../../component/PriceDetails";
import Card from "../../component/UI/Card";
import CartPage from "../cartPage";
import AddressForm from "./AddressForm";

import "./style.css";
import { useNavigate } from "react-router-dom";


const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  
  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };
  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };

    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
    // navigate("/orders");  
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //user.address.length === 0 && setNewAddress(true);
  }, [user.address]);

  useEffect(() => {
    if (confirmOrder && user.placedOrderId) {
      console.log("navigating here ");
      navigate(`/order_details/${user.placedOrderId}`);
    }
  }, [user.placedOrderId,confirmOrder]);

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="selectedAddress">
                     <div className="flexRow">
                   <div>
                    {selectedAddress.name}&nbsp;
                   {`${" "}${selectedAddress.address? selectedAddress.address:""} ${" "}
                   ${selectedAddress.pinCode? selectedAddress.pinCode:""}`}
                   </div>
                   <div>

                   <MaterialButton
                          onClick={() => {
                            setConfirmAddress(false);
                            setSelectedAddress();
                            // setAddress([]);
                          }}
                          title={"CHANGE"}
                          style={{
                            width: "100px",
                            margin: "20px 20px",
                            position:"relative",
                            float:"right" 
                          }}
                          bgColor="white"
                          textColor="#2874f0"
                        />
                   </div>
                  </div>                
                </div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }} 
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <input type="radio" name="paymentOption" value="cod" />
                    <div>Cash on delivery</div>
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                </div>
              )
            }
          />
        </div>

        {/* Price Component */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;
