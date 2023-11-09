import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../actions/cart.action";
import { addToWish } from "../../actions/wish.action";
import { addToCompare } from "../../actions/compare.action";
import Rating from "@mui/material/Rating";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const renderRating = (rating) => {
  let num = 0;
  let sum = 0;
  rating.forEach((element) => {
    sum += element.rating;
    num++;
  });
  console.log("SUM", sum);
  console.log("num", num);
  return (sum * 1.0) / num;
};

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  // addToCart,
  addToWishlist,
  // addToCompare,
}) => {
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
  const wish = useSelector((state) => state.wish);
  const compare = useSelector((state) => state.compare);
  const [wishItems, setWishItems] = useState(wish.wishItems);
  const [compareItems, setCompareItems] = useState(compare.compareItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const productCartQty = getProductCartQuantity(
  //   cartItems,
  //   product,
  //   selectedProductColor,
  //   selectedProductSize
  // );

  console.log("PRODUCTTTTTTTTTTTTT", product);

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {/* {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            <span className="old">
              {currency.currencySymbol + finalProductPrice}
            </span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalProductPrice} </span>
        )} */}
        <span>
          {(+product.price - product.sale).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </span>
        <span className="old">
          {(+product.price).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
      {/* {product.rating && product.rating > 0 ? (
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
      )} */}
      {product.reviews && product.reviews.length > 0 ? (
        <div className="product-rating">
          {/* <Rating ratingValue={renderRating(product.reviews)} />
          <div>{renderRating(product.reviews)}</div> */}
          <Rating
            name="read-only"
            value={renderRating(product.reviews)}
            readOnly
            precision={0.5}
          />
        </div>
      ) : (
        <div className="product-rating">
          <Rating name="read-only" value={0} readOnly />
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
                        single.color === selectedProductColor ? "checked" : ""
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
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
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
          <div className="pro-details-cart btn-hover ml-0">
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
          {/* <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
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
          </div> */}
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
            <button
              onClick={() => {
                {
                  const { _id, name, price } = product;
                  const img = product.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  navigate(`/cart`);
                }
              }}
            >
              {" "}
              Add To Cart{" "}
            </button>
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishItems[product._id] !== undefined ? "active" : ""}
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
                compareItems && compareItems[product._id] !== undefined
                  ? "active"
                  : ""
              }
              disabled={compareItems && compareItems[product._id] !== undefined}
              title={
                compareItems && compareItems[product._id] !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              // onClick={() => addToCompare(product, addToast)}
              onClick={() => {
                const { _id, name, price, description, slug } = product;
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
      {/* {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )} */}
      {/* {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )} */}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    // addToCart: (
    //   item,
    //   addToast,
    //   quantityCount,
    //   selectedProductColor,
    //   selectedProductSize
    // ) => {
    //   dispatch(
    //     addToCart(
    //       item,
    //       addToast,
    //       quantityCount,
    //       selectedProductColor,
    //       selectedProductSize
    //     )
    //   );
    // },
    // addToWishlist: (item, addToast) => {
    //   dispatch(addToWishlist(item, addToast));
    // },
    // addToCompare: (item, addToast) => {
    //   dispatch(addToCompare(item, addToast));
    // },
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
