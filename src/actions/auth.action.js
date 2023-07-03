import axiosIntance from "../helpers/axios";
import { authConstants, cartConstants } from "./constant";

export const login = (user) => {
  return async (dispatch) => {
     try{
       
       
           dispatch({
             type: authConstants.LOGIN_REQUEST,
             payload: {
               login: true,
             },
           });
       
           const res = await axiosIntance.post("/signin", {
             ...user,
           });
       
           if (res.status === 200) {
             const { token, user } = res.data;
             localStorage.setItem("FCtoken", token);
             localStorage.setItem("FCuser", JSON.stringify(user));
             dispatch({
               type: authConstants.LOGIN_SUCCESS,
               payload: {
                 token,
                 user,
               },
             });
             return true;
           } else {
             if (res.status === 400) {
               dispatch({
                 type: authConstants.LOGIN_FAILURE,
                 payload: { error: res.data.error },
               });
             }
           }

     }catch(e){
          console.log(e);
     }  
     return false;
    // console.log(res.data.user);

    // dispatch({type: authConstants.LOGIN_REQUEST,
    // payload:{
    //     ...user
    // }})
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("FCtoken");
    if (token) {
      const user = JSON.parse(localStorage.getItem("FCuser"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
      payload: { message: "Requested to be signout" },
    });
      localStorage.removeItem("FCuser");
      localStorage.removeItem("FCtoken");
      // localStorage.clear();
        dispatch({
          type: authConstants.LOGOUT_SUCCESS,
          payload: { message: "Logout successfully" },
        });
        dispatch({type:cartConstants.RESET_CART});

    // const res = await axiosIntance.post("/admin/signout");
    // if (res.status === 200) {
    // } else {
    //   dispatch({
    //     type: authConstants.LOGOUT_FAILURE,
    //     payload: { error: res.data.error },
    //   });
    // }
  };
};
