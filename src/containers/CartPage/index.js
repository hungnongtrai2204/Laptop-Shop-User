import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import PriceDetails from "../../components/PriceDetails";
import { generatePublicUrl } from "../../urlConfig";
// import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";
import { useNavigate } from "react-router-dom";
import { getDiscountsByName } from "../../actions/discount.action";

/**
 * @author
 * @function CartPage
 **/

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage


*/

const CartPage = (props) => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const discount = useSelector((state) => state.discount);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [coupon, setCoupon] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    //console.log({_id, qty});
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  const onDiscountApply = (e) => {
    e.preventDefault();
    dispatch(getDiscountsByName(coupon, addToast));
  };
  if (props.onlyCartItems) {
    return (
      <>
        <Fragment>
          <h3 className="cart-page-title">Your cart items</h3>
          <div className="row">
            <div className="col-12">
              <div className="table-content table-responsive cart-table-content">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Unit Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(cartItems).map((key, index) => {
                      {
                        /* const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );
                            const finalProductPrice = (
                              cartItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity); */
                      }
                      return (
                        <CartItem
                          key={index}
                          cartItem={cartItems[key]}
                          onQuantityInc={onQuantityIncrement}
                          onQuantityDec={onQuantityDecrement}
                          onRemoveCartItem={onRemoveCartItem}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="cart-shiping-update-wrapper">
                <div className="cart-shiping-update">
                  <Link to={process.env.PUBLIC_URL + "/"}>
                    Continue Shopping
                  </Link>
                </div>
                <div className="cart-clear">
                  <button
                  //  onClick={() => deleteAllFromCart(addToast)}
                  >
                    Clear Shopping Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </>
    );
  }

  console.log("CartItem", cartItems);

  return (
    <Fragment>
      <MetaTags>
        <title>Laptop Shop | Cart</title>
        <meta
          name="description"
          content="Cart page of Laptop Shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/cart"}>
        Cart
      </BreadcrumbsItem>

      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && Object.keys(cartItems).length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(cartItems).map((key, index) => {
                            {
                              /* const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );
                            const finalProductPrice = (
                              cartItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity); */
                            }
                            return (
                              <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                                onRemoveCartItem={onRemoveCartItem}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/"}>
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        {/* <button
                        //  onClick={() => deleteAllFromCart(addToast)}
                        >
                          Clear Shopping Cart
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    {/* <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input
                            type="text"
                            required
                            name="name"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                          />
                          <button
                            className="cart-btn-2"
                            type="submit"
                            onClick={onDiscountApply}
                          >
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {/* {Object.keys(cart.cartItems).reduce(function (
                            qty,
                            key
                          ) {
                            return qty + cart.cartItems[key].qty;
                          },
                          0)} */}
                          {(+Object.keys(cart.cartItems).reduce(
                            (totalPrice, key) => {
                              const { price, qty, sale } = cart.cartItems[key];
                              return totalPrice + (price - sale) * qty;
                            },
                            0
                          )).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </h5>
                      <h5>
                        Discount{" "}
                        {discount.discounts.percent > 0 &&
                        new Date() < new Date(discount.discounts.endDate) ? (
                          <span>
                            {(
                              (+Object.keys(cart.cartItems).reduce(
                                (totalPrice, key) => {
                                  const { price, qty, sale } =
                                    cart.cartItems[key];
                                  return totalPrice + (price - sale) * qty;
                                },
                                0
                              ) *
                                discount.discounts.percent) /
                              100
                            ).toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        ) : (
                          <span>0</span>
                        )}
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        {discount.discounts.percent > 0 &&
                        new Date() < new Date(discount.discounts.endDate) ? (
                          <span>
                            {(
                              +Object.keys(cart.cartItems).reduce(
                                (totalPrice, key) => {
                                  const { price, qty, sale } =
                                    cart.cartItems[key];
                                  return totalPrice + (price - sale) * qty;
                                },
                                0
                              ) -
                              (+Object.keys(cart.cartItems).reduce(
                                (totalPrice, key) => {
                                  const { price, qty, sale } =
                                    cart.cartItems[key];
                                  return totalPrice + (price - sale) * qty;
                                },
                                0
                              ) *
                                discount.discounts.percent) /
                                100
                            ).toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        ) : (
                          <span>
                            {(+Object.keys(cart.cartItems).reduce(
                              (totalPrice, key) => {
                                const { price, qty, sale } =
                                  cart.cartItems[key];
                                return totalPrice + (price - sale) * qty;
                              },
                              0
                            )).toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        )}
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default CartPage;
