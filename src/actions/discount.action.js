import axios from "../helpers/axios";
import { discountContants } from "./constants";

export const getDiscountsByName = (name, addToast) => {
  return async (dispatch) => {
    const res = await axios.post(`/discount/getdiscount`, { name: name });
    if (res.status === 200) {
      if (addToast) {
        addToast("Apply coupen success", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      dispatch({
        type: discountContants.GET_DISCOUNTS_BY_NAME,
        payload: res.data,
      });
    } else {
    }
  };
};
