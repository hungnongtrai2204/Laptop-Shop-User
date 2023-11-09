import React, { useState, Fragment } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";

// import "./style.css";
/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const { _id, name, price, img, sale } = props.cartItem;
  console.log("Sale Cart", props.cartItem);

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };
  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };
  return (
    <tr key={props.key}>
      <td className="product-thumbnail">
        <Link to={process.env.PUBLIC_URL + "/product/" + "id"}>
          <img className="img-fluid" src={generatePublicUrl(img)} alt="" />
        </Link>
      </td>

      <td className="product-name">
        <Link to={process.env.PUBLIC_URL + "/product/" + "id"}>{name}</Link>
        {/* {cartItem.selectedProductColor &&
      cartItem.selectedProductSize ? (
        <div className="cart-item-variation">
          <span>
            Color: {cartItem.selectedProductColor}
          </span>
          <span>
            Size: {cartItem.selectedProductSize}
          </span>
        </div>
      ) : (
        ""
      )} */}
      </td>

      <td className="product-price-cart">
        {sale !== null && sale > 0 ? (
          <Fragment>
            <span className="amount old">
              {(+price).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <span className="amount">
              {(price - sale).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </Fragment>
        ) : (
          <span className="amount">
            {(+price).toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        )}
        {/* <span className="amount">
          {(+price).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </span> */}
      </td>

      <td className="product-quantity">
        <div className="cart-plus-minus">
          <button
            className="dec qtybutton"
            // onClick={() => {
            //   decreaseQuantity(cartItem, addToast)
            // }}
            onClick={onQuantityDecrement}
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            value={qty}
            readOnly
          />
          <button
            className="inc qtybutton"
            // onClick={() => {
            //   addToCart(
            //     cartItem,
            //     addToast,
            //     quantityCount
            //   )
            // }}
            onClick={onQuantityIncrement}
            // disabled={
            //   cartItem !== undefined &&
            //   cartItem.quantity &&
            //   cartItem.quantity >=
            //     cartItemStock(
            //       cartItem,
            //       cartItem.selectedProductColor,
            //       cartItem.selectedProductSize
            //     )
            // }
          >
            +
          </button>
        </div>
      </td>
      <td className="product-subtotal">
        {/* {discountedPrice !== null
        ? currency.currencySymbol +
          (
            finalDiscountedPrice * cartItem.quantity
          ).toFixed(2)
        : currency.currencySymbol +
          (
            finalProductPrice * cartItem.quantity
          ).toFixed(2)} */}
        {(+((price - sale) * qty)).toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}
      </td>

      <td className="product-remove">
        <button
          // onClick={() => {
          //   deleteFromCart(cartItem, addToast)
          // }}
          onClick={() => props.onRemoveCartItem(_id)}
        >
          <i className="fa fa-times"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
