import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
import userReducer from "./user.reducer";
import orderReducer from "./order.reducer";
import wishReducer from "./wish.reducer";
import compareReducer from "./compare.reducer";
import discountReducer from "./discount.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  wish: wishReducer,
  compare: compareReducer,
  discount: discountReducer,
});

export default rootReducer;
