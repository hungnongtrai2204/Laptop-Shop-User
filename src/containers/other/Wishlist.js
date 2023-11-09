import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect, useDispatch, useSelector } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { getWishItems, removeWishItem } from "../../actions/wish.action";
import { addToCart } from "../../actions/cart.action";

import { generatePublicUrl } from "../../urlConfig";
const Wishlist = ({
  location,
  // cartItems,
  currency,
  // addToCart,
  wishlistItems,
  deleteFromWishlist,
  deleteAllFromWishlist,
}) => {
  const { addToast } = useToasts();
  const wish = useSelector((state) => state.wish);
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);

  const auth = useSelector((state) => state.auth);
  const [wishItems, setWishItems] = useState(wish.wishItems);
  const dispatch = useDispatch();
  useEffect(() => {
    setWishItems(wish.wishItems);
  }, [wish.wishItems]);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getWishItems());
    }
  }, [auth.authenticate]);
  // const { pathname } = location;
  const onRemoveWishItem = (_id) => {
    dispatch(removeWishItem({ productId: _id }));
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Laptop Shop | Wishlist</title>
        <meta
          name="description"
          content="Wishlist page of Laptop Shop react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/wish"}>
        Wishlist
      </BreadcrumbsItem>

      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishItems && Object.keys(wishItems).length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your wishlist items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Add To Cart</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(wishItems).map((key, index) => {
                            {
                              /* const discountedPrice = getDiscountPrice(
                                wishlistItem.price,
                                wishlistItem.discount
                              );
                              const finalProductPrice = (
                                wishlistItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);
                              const cartItem = cartItems.filter(
                                item => item.id === wishlistItem.id
                              )[0]; */
                              console.log("WISH", wishItems[key]);
                            }
                            return (
                              <tr key={index}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={`${process.env.PUBLIC_URL}/${wishItems[key].slug}/${wishItems[key]._id}/p`}
                                    onClick={() =>
                                      (window.location.href = `${process.env.PUBLIC_URL}/${wishItems[key].slug}/${wishItems[key]._id}/p`)
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={generatePublicUrl(
                                        wishItems[key].img
                                      )}
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link
                                    to={`${process.env.PUBLIC_URL}/${wishItems[key].slug}/${wishItems[key]._id}/p`}
                                    onClick={() =>
                                      (window.location.href = `${process.env.PUBLIC_URL}/${wishItems[key].slug}/${wishItems[key]._id}/p`)
                                    }
                                  >
                                    {wishItems[key].name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {/* {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                          {currency.currencySymbol +
                                            finalProductPrice}
                                        </span>
                                        <span className="amount">
                                          {currency.currencySymbol +
                                            finalDiscountedPrice}
                                        </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol +
                                          finalProductPrice}
                                    </span>
                                  )} */}
                                  <span className="amount">
                                    {(+wishItems[key].price).toLocaleString(
                                      "vi",
                                      {
                                        style: "currency",
                                        currency: "VND",
                                      }
                                    )}
                                  </span>
                                </td>

                                <td className="product-wishlist-cart">
                                  {wishItems[key].affiliateLink ? (
                                    <a
                                      href={wishItems[key].affiliateLink}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      {" "}
                                      Buy now{" "}
                                    </a>
                                  ) : wishItems[key].variation &&
                                    wishItems[key].variation.length >= 1 ? (
                                    <Link
                                      to={`${process.env.PUBLIC_URL}/product/${wishItems[key].id}`}
                                    >
                                      Select option
                                    </Link>
                                  ) : wishItems[key].quantity &&
                                    wishItems[key].quantity > 0 ? (
                                    {
                                      /* <button
                                      onClick={() =>
                                        addToCart(wishlistItem, addToast)
                                      }
                                      className={
                                        cartItem !== undefined &&
                                        cartItem.quantity > 0
                                          ? "active"
                                          : ""
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity > 0
                                      }
                                      title={
                                        wishlistItem !== undefined
                                          ? "Added to cart"
                                          : "Add to cart"
                                      }
                                    >
                                      {cartItem !== undefined &&
                                      cartItem.quantity > 0
                                        ? "Added"
                                        : "Add to cart"}
                                    </button> */
                                    }
                                  ) : (
                                    <button
                                      className={
                                        cartItems[key] !== undefined &&
                                        cartItems[key].qty > 0
                                          ? "active"
                                          : ""
                                      }
                                      disabled={
                                        cartItems[key] !== undefined &&
                                        cartItems[key].qty > 0
                                      }
                                      title={
                                        wishItems[key] !== undefined
                                          ? "Added to cart"
                                          : "Add to cart"
                                      }
                                      onClick={() => {
                                        const { _id, name, price } =
                                          wishItems[key];
                                        const img = wishItems[key].img;
                                        dispatch(
                                          addToCart({ _id, name, price, img })
                                        );
                                        // navigate(`/cart`);
                                        // addToCart(product, addToast)}a
                                      }}
                                    >
                                      {cartItems[key] !== undefined &&
                                      cartItems[key].qty > 0
                                        ? "Added"
                                        : "Add to cart"}
                                    </button>
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button
                                    // onClick={() =>
                                    //   deleteFromWishlist(
                                    //     wishItems[key],
                                    //     addToast
                                    //   )
                                    // }
                                    onClick={() =>
                                      onRemoveWishItem(wishItems[key]._id)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
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
                        {/* <button onClick={() => deleteAllFromWishlist(addToast)}>
                          Clear Wishlist
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>Add Items</Link>
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

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromWishlist: PropTypes.func,
  deleteFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
};

export default Wishlist;
