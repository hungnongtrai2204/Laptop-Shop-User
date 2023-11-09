import { compareConstants } from "../actions/constants";

const initState = {
  compareItems: {
    // 123: {
    //     _id: 123,
    //     name: 'Samsung mobile',
    //     img: 'some.jpg',
    //     price: 200,
    //     qty: 1,
    // }
  },
  updatingCompare: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case compareConstants.ADD_TO_COMPARE_REQUEST:
      state = {
        ...state,
        updatingCompare: true,
      };
      break;
    case compareConstants.ADD_TO_COMPARE_SUCCESS:
      state = {
        ...state,
        compareItems: action.payload.compareItems,
        updatingCompare: false,
      };
      break;
    case compareConstants.ADD_TO_COMPARE_FAILURE:
      state = {
        ...state,
        updatingCompare: false,
        error: action.payload.error,
      };
      break;
    case compareConstants.RESET_COMPARE:
      state = {
        ...initState,
      };
  }
  return state;
};
