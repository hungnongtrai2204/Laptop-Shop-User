import axios from "../helpers/axios";
import { wishConstants } from "./constants";
import store from "../store";

const getWishItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: wishConstants.ADD_TO_WISH_REQUEST });
      const res = await axios.post(`/user/getWishItems`);
      if (res.status === 200) {
        const { wishItems } = res.data;
        console.log({ getWishItems: wishItems });
        if (wishItems) {
          dispatch({
            type: wishConstants.ADD_TO_WISH_SUCCESS,
            payload: { wishItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToWish = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
      wish: { wishItems },
      auth,
    } = store.getState();
    //console.log('action::products', products);
    //const product = action.payload.product;
    //const products = state.products;
    //   const qty = cartItems[product._id]
    //     ? parseInt(cartItems[product._id].qty + newQty)
    //     : 1;
    wishItems[product._id] = {
      ...product,
      // qty,
    };

    if (auth.authenticate) {
      dispatch({ type: wishConstants.ADD_TO_WISH_REQUEST });
      const payload = {
        // cartItems: Object.keys(cartItems).map((key, index) => {
        //     return {
        //         quantity: cartItems[key].qty,
        //         product: cartItems[key]._id
        //     }
        // })
        wishItems: [
          {
            product: product._id,
            // quantity: qty,
          },
        ],
      };
      console.log(payload);
      const res = await axios.post(`/user/wish/addtowish`, payload);
      console.log("RES", res);
      if (res.status === 201) {
        dispatch(getWishItems());
      }
    } else {
      localStorage.setItem("wish", JSON.stringify(wishItems));
    }

    console.log("addToWish::", wishItems);

    dispatch({
      type: wishConstants.ADD_TO_WISH_SUCCESS,
      payload: { wishItems },
    });
  };
};

export const removeWishItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: wishConstants.REMOVE_WISH_ITEM_REQUEST });
      const res = await axios.post(`/user/wish/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: wishConstants.REMOVE_WISH_ITEM_SUCCESS });
        dispatch(getWishItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: wishConstants.REMOVE_WISH_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export { getWishItems };
