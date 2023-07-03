import axios from "axios";
import axiosIntance from "../helpers/axios";
import { categoryConstants } from "./constant";

export const getAllCategory = () => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/category/getcategory");

    dispatch({
      type: categoryConstants.CATEGORY_GET_REQUEST,
    });

    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.CATEGORY_GET_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.CATEGORY_GET_SUCCESS,
        payload:{error:res.data.error}
      });
    }
  };
};


