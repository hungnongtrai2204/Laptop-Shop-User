import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import { getProductCartQuantity } from "../../helpers/product";
import { generatePublicUrl } from "../../urlConfig";
import { Modal } from "react-bootstrap";
import Rating from "./sub-components/ProductRating";
import { connect, useDispatch, useSelector } from "react-redux";
import { getWishItems } from "../../actions/wish.action";
import { getCompareItems } from "../../actions/compare.action";

import { getCartItems } from "../../actions/cart.action";
import { addToCart } from "../../actions/cart.action";
import { addToWish } from "../../actions/wish.action";
import { addToCompare } from "../../actions/compare.action";

function ProductModal(props) {
  const { product } = props;
  // const { currency } = props;
  // const { discountedprice } = props;
  // const { finalproductprice } = props;
  // const { finaldiscountedprice } = props;
  const wish = useSelector((state) => state.wish);
  const compare = useSelector((state) => state.compare);

  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [wishItems, setWishItems] = useState(wish.wishItems);
  const [compareItems, setCompareItems] = useState(compare.compareItems);

  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  // const [productStock, setProductStock] = useState(
  //   product.variation ? product.variation[0].size[0].stock : product.stock
  // );
  const [productStock, setProductStock] = useState(product.quantity);
  const [quantityCount, setQuantityCount] = useState(1);

  // const wishlistItem = props.wishlistitem;
  // const compareItem = props.compareitem;

  // const addToCart = props.addtocart;
  // const addToWishlist = props.addtowishlist;
  // const addToCompare = props.addtocompare;

  const addToast = props.addtoast;
  const dispatch = useDispatch();

  // const cartItems = props.cartitems;

  // const productCartQty = getProductCartQuantity(
  //   cartItems,
  //   product,
  //   selectedProductColor,
  //   selectedProductSize
  // );
  // useEffect(() => {
  //   setWishItems(wish.wishItems);
  // }, [wish.wishItems]);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);
  // useEffect(() => {
  //   setCompareItems(compare.CompareItems);
  // }, [compare.compareItems]);
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

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {product.productPictures &&
                    product.productPictures.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={generatePublicUrl(single.img)}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {product.productPictures &&
                    product.productPictures.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={generatePublicUrl(single.img)}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  {/* {discountedprice !== null ? (
                    <Fragment>
                      <span>
                        {currency.currencySymbol + finaldiscountedprice}
                      </span>{" "}
                      <span className="old">
                        {currency.currencySymbol + finalproductprice}
                      </span>
                    </Fragment>
                  ) : (
                    <span>{currency.currencySymbol + finalproductprice} </span>
                  )} */}
                  <span>
                    {(+product.price).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                      <Rating ratingValue={4} />
                    </div>
                  </div>
                )}
                <div className="pro-details-list">
                  <p
                    style={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {product.description}
                  </p>
                </div>

                {product.variation ? (
                  <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                      <span>Color</span>
                      <div className="pro-details-color-content">
                        {product.variation.map((single, key) => {
                          return (
                            <label
                              className={`pro-details-color-content--single ${single.color}`}
                              key={key}
                            >
                              <input
                                type="radio"
                                value={single.color}
                                name="product-color"
                                checked={
                                  single.color === selectedProductColor
                                    ? "checked"
                                    : ""
                                }
                                onChange={() => {
                                  setSelectedProductColor(single.color);
                                  setSelectedProductSize(single.size[0].name);
                                  setProductStock(single.size[0].stock);
                                  setQuantityCount(1);
                                }}
                              />
                              <span className="checkmark"></span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className="pro-details-size">
                      <span>Size</span>
                      <div className="pro-details-size-content">
                        {product.variation &&
                          product.variation.map((single) => {
                            return single.color === selectedProductColor
                              ? single.size.map((singleSize, key) => {
                                  return (
                                    <label
                                      className={`pro-details-size-content--single`}
                                      key={key}
                                    >
                                      <input
                                        type="radio"
                                        value={singleSize.name}
                                        checked={
                                          singleSize.name ===
                                          selectedProductSize
                                            ? "checked"
                                            : ""
                                        }
                                        onChange={() => {
                                          setSelectedProductSize(
                                            singleSize.name
                                          );
                                          setProductStock(singleSize.stock);
                                          setQuantityCount(1);
                                        }}
                                      />
                                      <span className="size-name">
                                        {singleSize.name}
                                      </span>
                                    </label>
                                  );
                                })
                              : "";
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {product.affiliateLink ? (
                  <div className="pro-details-quality">
                    <div className="pro-details-cart btn-hover">
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="pro-details-quality">
                    <div className="cart-plus-minus">
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount > 1 ? quantityCount - 1 : 1
                          )
                        }
                        className="dec qtybutton"
                      >
                        -
                      </button>
                      <input
                        className="cart-plus-minus-box"
                        type="text"
                        value={quantityCount}
                        readOnly
                      />
                      <button
                        onClick={() =>
                          // setQuantityCount(
                          //   quantityCount < productStock - productCartQty
                          //     ? quantityCount + 1
                          //     : quantityCount
                          // )
                          setQuantityCount(
                            quantityCount < productStock
                              ? quantityCount + 1
                              : quantityCount
                          )
                        }
                        className="inc qtybutton"
                      >
                        +
                      </button>
                    </div>
                    <div className="pro-details-cart btn-hover">
                      {/* {productStock && productStock > 0 ? (
                        <button
                        onClick={() =>
                          addToCart(
                            product,
                            addToast,
                            quantityCount,
                            selectedProductColor,
                            selectedProductSize
                          )
                        }
                        disabled={productCartQty >= productStock}
                        >
                          {" "}
                          Add To Cart{" "}
                        </button>
                      ) : (
                        <button disabled>Out of Stock</button>
                      )} */}
                      {/* <button> Add To Cart </button> */}
                      <button
                        onClick={() => {
                          const { _id, name, price } = product;
                          const img = product.productPictures[0].img;
                          dispatch(addToCart({ _id, name, price, img }));
                          // navigate(`/cart`);
                          // addToCart(product, addToast)}a
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
                    </div>
                    <div className="pro-details-wishlist">
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
                    <div className="pro-details-compare">
                      <button
                        className={
                          compareItems &&
                          compareItems[product._id] !== undefined
                            ? "active"
                            : ""
                        }
                        disabled={
                          compareItems &&
                          compareItems[product._id] !== undefined
                        }
                        title={
                          compareItems &&
                          compareItems[product._id] !== undefined
                            ? "Added to compare"
                            : "Add to compare"
                        }
                        onClick={() => {
                          const { _id, name, price, description, slug } =
                            product;
                          const img = product.productPictures[0].img;
                          dispatch(
                            addToCompare({
                              _id,
                              name,
                              price,
                              img,
                              description,
                              slug,
                            })
                          );
                        }}
                      >
                        <i className="pe-7s-shuffle" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  addtocompare: PropTypes.func,
  addtowishlist: PropTypes.func,
  cartitems: PropTypes.array,
  compareitem: PropTypes.object,
  currency: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object,
};

const mapStateToProps = (state) => {
  // return {
  //   cartitems: state.cartData,
  // };
};

export default connect(mapStateToProps)(ProductModal);
