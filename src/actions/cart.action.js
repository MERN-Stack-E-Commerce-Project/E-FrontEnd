import { cartConstants } from "./constant";
import store from "../store";
import axiosIntance from "../helpers/axios";



const  getCartItems=()=>{
    return async dispatch=>{
        try{
            dispatch({type:cartConstants.ADD_TO_CART_REQUEST});
            const res=await axiosIntance.post("/user/cart/getCartItems")
            if(res.status==200){
                const {cartItems}= res.data;
                console.log({getCartItems:cartItems});
                if(cartItems){
                    dispatch({
                        type:cartConstants.ADD_TO_CART_SUCCESS,
                        payload:{cartItems},
                    });
                }
            }
        }catch(e){
            console.log(e);
        }
    }
}

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      
      const { cart:{cartItems}, auth} = store.getState();
      let qty = 1;
      if (product.qty) {
        qty = product.qty;
      }
      cartItems[product._id] = {
        ...product,
        qty,
      };
      console.log('qty---',qty);

      if(auth.authenticate){
        dispatch({type:cartConstants.ADD_TO_CART_REQUEST});
        const payload={
            cartItems:[{
                product:{...product},
                quantity:qty,
            },],
        }
        
        const res=await axiosIntance.post("/user/cart/add-to-cart",payload);
        console.log(res);
        if(res.status==200){
            dispatch(getCartItems());
        }
        
    }else{
        localStorage.setItem("cart", JSON.stringify(cartItems));
        
    }
    
    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const {auth}=store.getState();
    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

      if(auth.authenticate){
        localStorage.removeItem("cart");
        if (cartItems) {     
        //   dispatch({
        //     type: cartConstants.ADD_TO_CART_SUCCESS,
        //     payload: { cartItems: cart },
        //   });
        const payload={
            cartItems:Object.keys(cartItems).map((key,indx)=>{
                return {

                    quantity: cartItems[key].qty,
                    product: cartItems[key]._id,
                }

                
            })
        }
        if (Object.keys(cartItems).length > 0) {
          const res = await axiosIntance.post(`/user/cart/add-to-cart`, payload);
          if (res.status === 200) {
            dispatch(getCartItems());
          }
        }
      } else {
        dispatch(getCartItems());
      } 
      }else{
         if(cartItems){
            dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload:{cartItems},
            })
         }
      }

  };
};



export  {
    getCartItems
}