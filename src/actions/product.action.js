import axiosIntance from "../helpers/axios";
import { productConstants } from "./constant";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosIntance.get(`/product/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
      // dispatch({
      // })
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params;
      const res = await axiosIntance.get(`/page/${cid}/${type}`);
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_REQUEST,
      });
      if (res.status === 200) {
        const { page } = res.data;
        // console.log("page123",page);
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST,
    });
    let res;
    try {
      const { productId } = payload.params;

      res = await axiosIntance.get(`/product/p/${productId}`);

      if (res.status == 200) {
        dispatch({
          type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
          payload: { productDetails: res.data.product },
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({  
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error:e },
      });
    }
  };
};
