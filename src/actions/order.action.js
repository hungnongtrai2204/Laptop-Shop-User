import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const updateOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.post("user/order/update", payload);
      if (res.status === 201) {
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateReviewOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_REVIEW_ORDER_REQUEST });
    try {
      const res = await axios.post("user/order/review", payload);
      if (res.status === 201) {
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_REVIEW_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
