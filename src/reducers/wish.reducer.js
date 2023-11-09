import { wishConstants } from "../actions/constants";

const initState = {
  wishItems: {
    // 123: {
    //     _id: 123,
    //     name: 'Samsung mobile',
    //     img: 'some.jpg',
    //     price: 200,
    //     qty: 1,
    // }
  },
  updatingWish: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case wishConstants.ADD_TO_WISH_REQUEST:
      state = {
        ...state,
        updatingWish: true,
      };
      break;
    case wishConstants.ADD_TO_WISH_SUCCESS:
      state = {
        ...state,
        wishItems: action.payload.wishItems,
        updatingWish: false,
      };
      break;
    case wishConstants.ADD_TO_WISH_FAILURE:
      state = {
        ...state,
        updatingWish: false,
        error: action.payload.error,
      };
      break;
    case wishConstants.RESET_WISH:
      state = {
        ...initState,
      };
  }
  return state;
};
