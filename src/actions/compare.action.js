import axios from "../helpers/axios";
import { compareConstants } from "./constants";
import store from "../store";

const getCompareItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: compareConstants.ADD_TO_COMPARE_REQUEST });
      const res = await axios.post(`/user/getCompareItems`);
      if (res.status === 200) {
        const { compareItems } = res.data;
        console.log({ getCompareItems: compareItems });
        if (compareItems) {
          dispatch({
            type: compareConstants.ADD_TO_COMPARE_SUCCESS,
            payload: { compareItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCompare = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
      compare: { compareItems },
      auth,
    } = store.getState();
    //console.log('action::products', products);
    //const product = action.payload.product;
    //const products = state.products;
    //   const qty = cartItems[product._id]
    //     ? parseInt(cartItems[product._id].qty + newQty)
    //     : 1;
    compareItems[product._id] = {
      ...product,
      // qty,
    };

    if (auth.authenticate) {
      dispatch({ type: compareConstants.ADD_TO_COMPARE_REQUEST });
      const payload = {
        // cartItems: Object.keys(cartItems).map((key, index) => {
        //     return {
        //         quantity: cartItems[key].qty,
        //         product: cartItems[key]._id
        //     }
        // })
        compareItems: [
          {
            product: product._id,
            // quantity: qty,
          },
        ],
      };
      console.log(payload);
      const res = await axios.post(`/user/compare/addtocompare`, payload);
      console.log("RES", res);
      if (res.status === 201) {
        dispatch(getCompareItems());
      }
    } else {
      localStorage.setItem("compare", JSON.stringify(compareItems));
    }

    console.log("addToCompare::", compareItems);

    dispatch({
      type: compareConstants.ADD_TO_COMPARE_SUCCESS,
      payload: { compareItems },
    });
  };
};

export const removeCompareItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: compareConstants.REMOVE_COMPARE_ITEM_REQUEST });
      const res = await axios.post(`/user/compare/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: compareConstants.REMOVE_COMPARE_ITEM_SUCCESS });
        dispatch(getCompareItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: compareConstants.REMOVE_COMPARE_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export { getCompareItems };
