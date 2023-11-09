import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { generatePublicUrl } from "../../urlConfig";
// import Rating from "./sub-components/ProductRating";
import Rating from "@mui/material/Rating";

import ProductModal from "./ProductModal";
import { addToCart } from "../../actions/cart.action";
import { addToWish } from "../../actions/wish.action";
import { getWishItems } from "../../actions/wish.action";
import { getCartItems } from "../../actions/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const renderPercentDiscount = (salePrice, price) => {
  return ((+salePrice / +price) * 100).toFixed(0);
};
const ProductGridListSingle = ({
  product,
  currency,
  // addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const dispatch = useDispatch();
  const wish = useSelector((state) => state.wish);
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [modalShow, setModalShow] = useState(false);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [wishItems, setWishItems] = useState(wish.wishItems);
  // useEffect(() => {
  //   setWishItems(wish.wishItems);
  // }, [wish.wishItems]);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);
  // useEffect(() => {
  //   if (auth.authenticate) {
  //     dispatch(getWishItems());
  //   }
  // }, [auth.authenticate]);
  // useEffect(() => {
  //   if (auth.authenticate) {
  //     dispatch(getCartItems());
  //   }
  // }, [auth.authenticate]);
  const { addToast } = useToasts();

  const toDay = new Date();

  const renderNew = (productDate, salePrice, price) => {
    const date = new Date(productDate);
    if (date.getMonth() === toDay.getMonth()) {
      if (date.getDate() >= toDay.getDate() - 7) {
        return (
          <div className="product-img-badges">
            {salePrice > 0 ? (
              <span className="pink">
                -{renderPercentDiscount(salePrice, price)}%
              </span>
            ) : (
              ""
            )}
            <span className="purple">New</span>
          </div>
        );
      }
    } else {
      return (
        <div className="product-img-badges">
          {salePrice > 0 ? (
            <span className="pink">
              -{renderPercentDiscount(salePrice, price)}%
            </span>
          ) : (
            ""
          )}
        </div>
      );
    }
  };
  const renderRating = (rating) => {
    let num = 0;
    let sum = 0;
    rating.forEach((element) => {
      sum += element.rating;
      num++;
    });
    return (sum * 1.0) / num;
  };
  //   const discountedPrice = getDiscountPrice(product.price, product.discount);
  //   const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  //   const finalDiscountedPrice = +(
  //     discountedPrice * currency.currencyRate
  //   ).toFixed(2);

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link
              to={`${process.env.PUBLIC_URL}/${product.slug}/${product._id}/p`}
              onClick={() =>
                (window.location.href = `${process.env.PUBLIC_URL}/${product.slug}/${product._id}/p`)
              }
            >
              <img
                className="default-img"
                src={generatePublicUrl(product.productPictures[0].img)}
                alt=""
              />
              {product.productPictures.length > 1 ? (
                <img
                  className="hover-img"
                  src={generatePublicUrl(product.productPictures[1].img)}
                  alt=""
                />
              ) : (
                ""
              )}
            </Link>
            {/* {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )} */}
            {renderNew(product.createdAt, product.sale, product.price)}

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                  className={
                    wishItems[product._id] !== undefined ? "active" : ""
                  }
                  disabled={wishItems[product._id] !== undefined}
                  title={
                    wishItems[product._id] !== undefined
                      ? "Added to wishlist"
                      : "Add to wishlist"
                  }
                  //   onClick={() => addToWishlist(product, addToast)}
                  onClick={() => {
                    const { _id, name, price } = product;
                    const img = product.productPictures[0].img;
                    dispatch(addToWish({ _id, name, price, img }));
                    // navigate(`/cart`);
                    // addToCart(product, addToast)}a
                  }}
                >
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a
                    href={product.affiliateLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {" "}
                    Buy now{" "}
                  </a>
                ) : product.variation && product.variation.length >= 1 ? (
                  <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
                    Select Option
                  </Link>
                ) : product.quantity && product.quantity > 0 ? (
                  <button
                    onClick={() => {
                      // addToCart(product, addToast)
                      const { _id, name, price } = product;
                      const img = product.productPictures[0].img;
                      dispatch(addToCart({ _id, name, price, img }));
                    }}
                    className={
                      cartItems[product._id] !== undefined &&
                      cartItems[product._id].qty > 0
                        ? "active"
                        : ""
                    }
                    disabled={
                      cartItems[product._id] !== undefined &&
                      cartItems[product._id].qty > 0
                    }
                    title={
                      cartItems[product._id] !== undefined
                        ? "Added to cart"
                        : "Add to cart"
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItems[product._id] !== undefined &&
                    cartItems[product._id].qty > 0
                      ? "Added"
                      : "Add to cart"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {product.name}
              </Link>
            </h3>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="product-rating">
                {/* <Rating ratingValue={renderRating(product.reviews)} /> */}
                <Rating
                  name="read-only"
                  value={renderRating(product.reviews)}
                  readOnly
                  precision={0.5}
                />
              </div>
            ) : (
              <div className="product-rating">
                {/* <Rating ratingValue={0} /> */}
                <Rating name="read-only" value={0} readOnly />
              </div>
            )}
            <div className="product-price">
              {product.sale !== null && product.sale > 0 ? (
                <Fragment>
                  <span>
                    {(product.price - product.sale).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>{" "}
                  <span className="old">
                    {(+product.price).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </Fragment>
              ) : (
                <span>
                  {(+product.price).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              )}
              {/* <span>
                {(+product.price).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span> */}
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link
                    to={`${process.env.PUBLIC_URL}/${product.slug}/${product._id}/p`}
                    onClick={() =>
                      (window.location.href = `${process.env.PUBLIC_URL}/${product.slug}/${product._id}/p`)
                    }
                  >
                    <img
                      className="default-img img-fluid"
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                    {product.productPictures.length > 1 ? (
                      <img
                        className="hover-img img-fluid"
                        src={generatePublicUrl(product.productPictures[1].img)}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </Link>
                  {/* {product.discount || product.new ? (
                    <div className="product-img-badges">
                      {product.discount ? (
                        <span className="pink">-{product.discount}%</span>
                      ) : (
                        ""
                      )}
                      {product.new ? <span className="purple">New</span> : ""}
                    </div>
                  ) : (
                    ""
                  )} */}
                  {renderNew(product.createdAt, product.sale, product.price)}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link
                    to={`${process.env.PUBLIC_URL}/${product.slug}/${product._id}/p`}
                    onClick={() =>
                      (window.location.href = `${process.env.PUBLIC_URL}/${product.slug}/${product._id}/p`)
                    }
                  >
                    {product.name}
                  </Link>
                </h3>
                <div className="product-list-price">
                  {product.sale !== null && product.sale > 0 ? (
                    <Fragment>
                      <span>
                        {(product.price - product.sale).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>{" "}
                      <span className="old">
                        {(+product.price).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </Fragment>
                  ) : (
                    <span>
                      {(+product.price).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  )}
                  {/* <span>
                    {(+product.price).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span> */}
                </div>
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      {/* <Rating ratingValue={renderRating(product.reviews)} /> */}
                      <Rating
                        name="read-only"
                        value={renderRating(product.reviews)}
                        readOnly
                        precision={0.5}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="product-rating">
                    {/* <Rating ratingValue={0} /> */}
                    <Rating name="read-only" value={0} readOnly />
                  </div>
                )}
                {product.shortDescription ? (
                  <p>{product.shortDescription}</p>
                ) : (
                  <p
                    style={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {product.description}
                  </p>
                )}

                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {product.affiliateLink ? (
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {" "}
                        Buy now{" "}
                      </a>
                    ) : product.variation && product.variation.length >= 1 ? (
                      <Link
                        to={`${process.env.PUBLIC_URL}/product/${product.id}`}
                      >
                        Select Option
                      </Link>
                    ) : product.quantity && product.quantity > 0 ? (
                      <button
                        onClick={() => {
                          const { _id, name, price } = product;
                          const img = product.productPictures[0].img;
                          dispatch(addToCart({ _id, name, price, img }));
                        }}
                        className={
                          cartItems[product._id] !== undefined &&
                          cartItems[product._id].qty > 0
                            ? "active"
                            : ""
                        }
                        disabled={
                          cartItems[product._id] !== undefined &&
                          cartItems[product._id].qty > 0
                        }
                        title={
                          cartItems[product._id] !== undefined
                            ? "Added to cart"
                            : "Add to cart"
                        }
                      >
                        {" "}
                        <i className="pe-7s-cart"></i>{" "}
                        {cartItems[product._id] !== undefined &&
                        cartItems[product._id].qty > 0
                          ? "Added"
                          : "Add to cart"}
                      </button>
                    ) : (
                      <button disabled className="active">
                        Out of Stock
                      </button>
                    )}
                  </div>

                  <div className="shop-list-wishlist ml-10">
                    <button
                      className={
                        wishItems[product._id] !== undefined ? "active" : ""
                      }
                      disabled={wishItems[product._id] !== undefined}
                      title={
                        wishItems[product._id] !== undefined
                          ? "Added to wishlist"
                          : "Add to wishlist"
                      }
                      // onClick={() => addToWishlist(product, addToast)}
                      onClick={() => {
                        const { _id, name, price } = product;
                        const img = product.productPictures[0].img;
                        dispatch(addToWish({ _id, name, price, img }));
                        // navigate(`/cart`);
                        // addToCart(product, addToast)}a
                      }}
                    >
                      <i className="pe-7s-like" />
                    </button>
                  </div>
                  <div className="shop-list-compare ml-10">
                    <button
                      className={compareItem !== undefined ? "active" : ""}
                      disabled={compareItem !== undefined}
                      title={
                        compareItem !== undefined
                          ? "Added to compare"
                          : "Add to compare"
                      }
                      onClick={() => addToCompare(product, addToast)}
                    >
                      <i className="pe-7s-shuffle" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        // discountedprice={discountedPrice}
        // finalproductprice={finalProductPrice}
        // finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridListSingle;
