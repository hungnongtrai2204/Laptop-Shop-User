import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReview, getOrder } from "../../actions";
import { updateOrder, updateReviewOrder } from "../../actions/order.action";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";
import { generatePublicUrl } from "../../urlConfig";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import "./style.css";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

/**
 * @author
 * @function OrderDetails
 **/

const OrderDetailsPage = (props) => {
  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewValue, setReviewValue] = useState("");
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);
  console.log("OrderDetail", orderDetails);
  const params = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = (_id) => {
    setOpen(false);
    onOrderUpdate(_id);
  };
  useEffect(() => {
    console.log({ props });
    const payload = {
      orderId: params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type: "canceled",
    };
    dispatch(updateOrder(payload));
    window.location.reload(true);
  };

  const onUpdateReview = (orderId, productId, userId) => {
    const payload = {
      orderId,
      productId,
    };
    const payload1 = {
      productId,
      reviews: {
        userId,
        review: reviewValue,
        rating: ratingValue,
      },
    };
    dispatch(updateReviewOrder(payload));
    dispatch(addReview(payload1));
    window.location.reload(true);
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };
  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Laptop Shop | OrderDetails</title>
        <meta
          name="description"
          content="Order Details page of Laptop Shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/order_details"}>
        Order Detail
      </BreadcrumbsItem>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <Breadcrumb />

        <div
          style={{
            width: "1160px",
            margin: "10px auto",
          }}
        >
          <Card
            style={{
              margin: "10px 0",
            }}
          >
            <div className="delAdrContainer">
              <div className="delAdrDetails">
                <div className="delTitle">Delivery Address</div>
                <div className="delName">{orderDetails.address.name}</div>
                <div className="delAddress">{orderDetails.address.address}</div>
                <div className="delPhoneNumber">
                  Phone number {orderDetails.address.mobileNumber}
                </div>
              </div>
              <div className="delMoreActionContainer">
                <div className="delTitle">More Actions</div>
                <div className="delName">
                  Total products:{" "}
                  {orderDetails.totalAmount.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <div className="delAddress">
                  Discount:{" "}
                  {orderDetails.discountAmount
                    ? orderDetails.discountAmount.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "0"}
                </div>
                <div className="delPhoneNumber">
                  Grand Total:{" "}
                  {orderDetails.discountAmount
                    ? (
                        +orderDetails.totalAmount - orderDetails.discountAmount
                      ).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })
                    : orderDetails.totalAmount.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                </div>
              </div>
            </div>
          </Card>
          {orderDetails.items.map((item, index) => (
            <Card
              style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
            >
              <div className="flexRow" style={{ display: "flex" }}>
                <div className="delItemImgContainer">
                  <img
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                    alt="anh"
                  />
                </div>
                <div style={{ width: "250px" }}>
                  <div className="delItemName">{item.productId.name}</div>
                  {item.productId.sale && item.productId.sale > 0 ? (
                    <Price value={+item.payablePrice - item.productId.sale} />
                  ) : (
                    <Price value={item.payablePrice} />
                  )}
                  <div className="delItemName">
                    Quantity: {item.purchasedQty}
                  </div>
                </div>
              </div>
              <div style={{ padding: "25px 50px" }}>
                <div className="orderTrack">
                  {orderDetails.orderStatus.map((status) => (
                    <div
                      className={`orderStatus ${
                        status.isCompleted ? "active" : ""
                      }`}
                    >
                      <div
                        className={`point ${
                          status.isCompleted ? "active" : ""
                        }`}
                      ></div>
                      <div className="orderInfo">
                        <div className="status">{status.type}</div>
                        <div className="date">{formatDate(status.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontWeight: "500", fontSize: 14 }}>
                {orderDetails.orderStatus[3].isCompleted &&
                  `Delivered on ${formatDate2(
                    orderDetails.orderStatus[3].date
                  )}`}
              </div>
              <div style={{ padding: "25px 50px" }}>
                {orderDetails.orderStatus[3].isCompleted && !item.isReview ? (
                  <div className="ratting-form-wrapper pl-50">
                    <h3>Add a Review</h3>
                    <div className="ratting-form">
                      <form action="#">
                        <div className="star-box">
                          <span>Your rating:</span>
                          {/* <div className="ratting-star">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </div> */}
                          <Rating
                            name="simple-controlled"
                            value={ratingValue}
                            onChange={(event, newValue) => {
                              setRatingValue(newValue);
                            }}
                          />
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            {/* <div className="rating-form-style mb-10">
                              <input placeholder="Name" type="text" />
                            </div> */}
                          </div>
                          <div className="col-md-6">
                            {/* <div className="rating-form-style mb-10">
                              <input placeholder="Email" type="email" />
                            </div> */}
                          </div>
                          <div className="col-md-12">
                            <div className="rating-form-style form-submit">
                              <textarea
                                name="Your Review"
                                placeholder="Message"
                                defaultValue={""}
                                value={reviewValue}
                                onChange={(e) => setReviewValue(e.target.value)}
                              />
                              <input
                                type="submit"
                                defaultValue="Submit"
                                onClick={() =>
                                  onUpdateReview(
                                    orderDetails._id,
                                    item.productId._id,
                                    orderDetails.user
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontWeight: "500", fontSize: 14 }}>
                    {orderDetails.orderStatus[3].isCompleted
                      ? "Thank you for your review"
                      : ""}
                  </div>
                )}
              </div>
            </Card>
          ))}
          <div className="cart-shiping-update-wrapper">
            <div className="cart-shiping-update">
              {/* <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                Continue Shopping
              </Link> */}
            </div>
            <div className="cart-clear">
              <button onClick={handleClickOpen}>Cancel Order</button>
            </div>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Hủy đơn hàng"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có đồng ý hủy đơn hàng không?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button onClick={() => handleAgree(orderDetails._id)} autoFocus>
                Đồng ý
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default OrderDetailsPage;
