import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cart.action";
import { deleteFromCompare } from "../../redux/actions/compareActions";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Rating from "../../components/product/sub-components/ProductRating";
import {
  getCompareItems,
  removeCompareItem,
} from "../../actions/compare.action";
import { generatePublicUrl } from "../../urlConfig";

const Compare = ({
  location,
  // cartItems,
  // compareItems,
  // addToCart,
  deleteFromCompare,
  currency,
}) => {
  // const { pathname } = location;
  const { addToast } = useToasts();
  const compare = useSelector((state) => state.compare);
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const wish = useSelector((state) => state.wish);
  const [wishItems, setWishItems] = useState(wish.wishItems);

  const auth = useSelector((state) => state.auth);
  const [compareItems, setCompareItems] = useState(compare.compareItems);
  const dispatch = useDispatch();
  useEffect(() => {
    setCompareItems(compare.compareItems);
  }, [compare.compareItems]);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCompareItems());
    }
  }, [auth.authenticate]);
  // const { pathname } = location;
  const onRemoveCompareItem = (_id) => {
    dispatch(removeCompareItem({ productId: _id }));
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Laptop Shop | Compare</title>
        <meta
          name="description"
          content="Compare page of Laptop Shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "compare"}>
        Compare
      </BreadcrumbsItem>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="compare-main-area pt-90 pb-100">
          <div className="container">
            {compareItems && Object.keys(compareItems).length >= 1 ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="compare-page-content">
                    <div className="compare-table table-responsive">
                      <table className="table table-bordered mb-0">
                        <tbody>
                          <tr>
                            <th className="title-column">Product Info</th>
                            {Object.keys(compareItems).map((key, index) => {
                              {
                                /* const cartItem = cartItems.filter(
                                (item) => item._id === compareItems[key]._id
                              )[0]; */
                              }
                              return (
                                <td className="product-image-title" key={index}>
                                  <div className="compare-remove">
                                    <button
                                      // onClick={() =>
                                      //   deleteFromCompare(compareItem, addToast)
                                      // }
                                      onClick={() =>
                                        onRemoveCompareItem(
                                          compareItems[key]._id
                                        )
                                      }
                                    >
                                      <i className="pe-7s-trash" />
                                    </button>
                                  </div>
                                  <Link
                                    to={`${process.env.PUBLIC_URL}/${compareItems[key].slug}/${compareItems[key]._id}/p`}
                                    className="image"
                                    onClick={() =>
                                      (window.location.href = `${process.env.PUBLIC_URL}/${compareItems[key].slug}/${compareItems[key]._id}/p`)
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={generatePublicUrl(
                                        compareItems[key].img
                                      )}
                                      alt=""
                                    />
                                  </Link>
                                  <div className="product-title">
                                    <Link
                                      to={`${process.env.PUBLIC_URL}/${compareItems[key].slug}/${compareItems[key]._id}/p`}
                                      onClick={() =>
                                        (window.location.href = `${process.env.PUBLIC_URL}/${compareItems[key].slug}/${compareItems[key]._id}/p`)
                                      }
                                    >
                                      {compareItems[key].name}
                                    </Link>
                                  </div>
                                  <div className="compare-btn">
                                    {compareItems[key].affiliateLink ? (
                                      <a
                                        href={compareItems[key].affiliateLink}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                      >
                                        {" "}
                                        Buy now{" "}
                                      </a>
                                    ) : compareItems[key].variation &&
                                      compareItems[key].variation.length >=
                                        1 ? (
                                      <Link
                                        to={`${process.env.PUBLIC_URL}/product/${compareItems[key]._id}`}
                                      >
                                        Select Option
                                      </Link>
                                    ) : compareItems[key].quantity &&
                                      compareItems[key].quantity > 0 ? (
                                      {
                                        /* <button
                                        onClick={() =>
                                          addToCart(compareItem, addToast)
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
                                          compareItem !== undefined
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
                                          compareItems[key] !== undefined
                                            ? "Added to cart"
                                            : "Add to cart"
                                        }
                                        onClick={() => {
                                          const { _id, name, price } =
                                            compareItems[key];
                                          const img = compareItems[key].img;
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
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <th className="title-column">Price</th>
                            {Object.keys(compareItems).map((key, index) => {
                              {
                                /* const discountedPrice = getDiscountPrice(
                                compareItem.price,
                                compareItem.discount
                              );
                              const finalProductPrice = (
                                compareItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2); */
                              }
                              return (
                                <td className="product-price" key={index}>
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
                                    {(+compareItems[key].price).toLocaleString(
                                      "vi",
                                      {
                                        style: "currency",
                                        currency: "VND",
                                      }
                                    )}
                                  </span>
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Description</th>
                            {Object.keys(compareItems).map((key, index) => {
                              return (
                                <td className="product-desc" key={index}>
                                  <p
                                    style={{
                                      whiteSpace: "pre-line",
                                    }}
                                  >
                                    {compareItems[key].description
                                      ? compareItems[key].description
                                      : "N/A"}
                                  </p>
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Rating</th>
                            {Object.keys(compareItems).map((key, index) => {
                              return (
                                <td className="product-rating" key={index}>
                                  <Rating ratingValue={4} />
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-shuffle"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in compare <br />{" "}
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

Compare.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteFromCompare: PropTypes.func,
};

// const mapStateToProps = (state) => {
//   return {
//     cartItems: state.cartData,
//     compareItems: state.compareData,
//     currency: state.currencyData,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (item, addToast, quantityCount) => {
//       dispatch(addToCart(item, addToast, quantityCount));
//     },

//     deleteFromCompare: (item, addToast) => {
//       dispatch(deleteFromCompare(item, addToast));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Compare);

export default Compare;
