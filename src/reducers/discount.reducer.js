import { discountContants } from "../actions/constants";

const initState = {
  discounts: [],
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case discountContants.GET_DISCOUNTS_BY_NAME:
      state = {
        ...state,
        discounts: action.payload.discounts,
      };
      break;
    case discountContants.RESET_DISCOUNT:
      state = {
        ...initState,
      };
    default:
      break;
  }
  return state;
};
