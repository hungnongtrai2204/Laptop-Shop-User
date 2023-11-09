import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
// import { getDiscountPrice } from "../../../helpers/product";
import { useDispatch } from "react-redux";
import { generatePublicUrl } from "../../../urlConfig";
import { removeCartItem } from "../../../actions";
const MenuCart = ({ cartData, currency, deleteFromCart }) => {
  const dispatch = useDispatch();
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };
  return (
    <div className="shopping-cart-content">
      {cartData && Object.keys(cartData).length > 0 ? (
        <Fragment>
          <ul>
            {Object.keys(cartData).map((key, index) => {
              {
                /* const discountedPrice = getDiscountPrice(
                single.price,
                single.discount
              );
              const finalProductPrice = (
                single.price * currency.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity); */
              }

              return (
                <li className="single-shopping-cart" key={index}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + "1"}>
                      <img
                        alt=""
                        src={generatePublicUrl(cartData[key].img)}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/product/" + "1"}>
                        {" "}
                        {cartData[key].name}{" "}
                      </Link>
                    </h4>
                    <h6>Qty: {cartData[key].qty}</h6>
                    <span>
                      {/* {discountedPrice !== null
                        ? currency.currencySymbol + finalDiscountedPrice
                        : currency.currencySymbol + finalProductPrice} */}
                    </span>
                    {/* {single.selectedProductColor &&
                    single.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {single.selectedProductColor}</span>
                        <span>Size: {single.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )} */}
                  </div>
                  <div className="shopping-cart-delete">
                    <button
                      // onClick={() => deleteFromCart(single, addToast)}
                      onClick={() => onRemoveCartItem(cartData[key]._id)}
                    >
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {/* {currency.currencySymbol + cartTotalPrice.toFixed(2)} */}
                {(+Object.keys(cartData).reduce((totalPrice, key) => {
                  const { price, qty } = cartData[key];
                  return totalPrice + price * qty;
                }, 0)).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func,
};

export default MenuCart;
