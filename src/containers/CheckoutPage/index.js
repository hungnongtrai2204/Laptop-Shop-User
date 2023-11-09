import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import Layout from "../../components/Layout";
import {
  MaterialButton,
  MaterialInput,
  Anchor,
} from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import CardPage from "../CartPage";
import AddressForm from "./AddressForm";
import PriceDetails from "../../components/PriceDetails";
import { io } from "socket.io-client";

import "./style.css";

/**
 * @author
 * @function CheckoutPage
 **/

const socket = io("http://localhost:2000/");

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer" style={{ display: "flex" }}>
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);

  console.log({ user });

  const auth = useSelector((state) => state.auth);
  const discount = useSelector((state) => state.discount);
  const cart = useSelector((state) => state.cart);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [cartItems, setCartItems] = useState(cart.cartItems);

  const dispatch = useDispatch();

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalPrice = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty, sale } = cart.cartItems[key];
      return totalPrice + (price - sale) * qty;
    }, 0);
    let discountPrice = 0;
    if (
      discount.discounts.percent > 0 &&
      new Date() < new Date(discount.discounts.endDate)
    ) {
      discountPrice = (totalPrice * discount.discounts.percent) / 100;
    }
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount: totalPrice,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
      discountAmount: discountPrice,
    };

    dispatch(addOrder(payload)).then((res) => {
      if (res) {
        socket.emit("new-order", {
          customer: selectedAddress.name,
          id: res.data.order._id,
        });
        setConfirmOrder(true);
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //user.address.length === 0 && setNewAddress(true);
  }, [user.address]);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  if (confirmOrder) {
    return (
      <Fragment>
        <LayoutOne
          headerContainerClass="container-fluid"
          headerPaddingClass="header-padding-1"
        >
          {" "}
          <div>Thank you</div>
        </LayoutOne>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Laptop Shop | Checkout</title>
        <meta
          name="description"
          content="Checkout page of Laptop Shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "checkout"}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <Breadcrumb />
        <div className="container">
          <div className="cartContainer" style={{ alignItems: "flex-start" }}>
            <div className="checkoutContainer">
              {/* check if user logged in or not */}
              <CheckoutStep
                stepNumber={"1"}
                title={"LOGIN"}
                active={!auth.authenticate}
                body={
                  auth.authenticate ? (
                    <div className="loggedInId">
                      <span style={{ fontWeight: 500 }}>
                        {auth.user.fullName}
                      </span>
                      <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                    </div>
                  ) : (
                    <div>
                      <MaterialInput label="Email" />
                    </div>
                  )
                }
              />
              <CheckoutStep
                stepNumber={"2"}
                title={"DELIVERY ADDRESS"}
                active={!confirmAddress && auth.authenticate}
                body={
                  <>
                    {confirmAddress ? (
                      <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                    ) : (
                      address.map((adr) => (
                        <Address
                          selectAddress={selectAddress}
                          enableAddressEditForm={enableAddressEditForm}
                          confirmDeliveryAddress={confirmDeliveryAddress}
                          onAddressSubmit={onAddressSubmit}
                          adr={adr}
                        />
                      ))
                    )}
                  </>
                }
              />

              {/* AddressForm */}
              {confirmAddress ? null : newAddress ? (
                <AddressForm
                  onSubmitForm={onAddressSubmit}
                  onCancel={() => {}}
                />
              ) : auth.authenticate ? (
                <CheckoutStep
                  stepNumber={"+"}
                  title={"ADD NEW ADDRESS"}
                  active={false}
                  onClick={() => setNewAddress(true)}
                />
              ) : null}

              <CheckoutStep
                stepNumber={"3"}
                title={"ORDER SUMMARY"}
                active={orderSummary}
                body={
                  orderSummary ? (
                    <CardPage onlyCartItems={true} />
                  ) : orderConfirmation ? (
                    <div className="stepCompleted">
                      {Object.keys(cartItems).length} items
                    </div>
                  ) : null
                }
              />
              {orderSummary && (
                <Card
                  style={{
                    margin: "10px 0",
                  }}
                >
                  <div
                    className="flexRow sb"
                    style={{
                      padding: "20px",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "12px" }}>
                      Order confirmation will be sent to{" "}
                      <strong>{auth.user.email}</strong>
                    </p>
                    <MaterialButton
                      title="CONTINUE"
                      onClick={userOrderConfirmation}
                      style={{ width: "200px" }}
                    />
                  </div>
                </Card>
              )}

              <CheckoutStep
                stepNumber={"4"}
                title={"PAYMENT OPTIONS"}
                active={paymentOption}
                body={
                  paymentOption && (
                    <div className="stepCompleted">
                      <div
                        className="flexRow"
                        style={{
                          alignItems: "center",
                          padding: "20px",
                          display: "flex",
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentOption"
                          value="cod"
                          id="paymentOption"
                          style={{
                            width: "10%",
                          }}
                        />
                        <div>Cash on delivery</div>
                      </div>
                      <MaterialButton
                        title="CONFIRM ORDER"
                        onClick={onConfirmOrder}
                        style={{ width: "200px", margin: "0 0 20px 20px" }}
                      />
                    </div>
                  )
                }
              />
            </div>

            <PriceDetails
              totalItem={Object.keys(cart.cartItems).reduce(function (
                qty,
                key
              ) {
                return qty + cart.cartItems[key].qty;
              },
              0)}
              totalPrice={Object.keys(cart.cartItems).reduce(
                (totalPrice, key) => {
                  const { price, qty, sale } = cart.cartItems[key];
                  return totalPrice + (price - sale) * qty;
                },
                0
              )}
              totalDiscount={
                new Date() < new Date(discount.discounts.endDate)
                  ? (Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                      const { price, qty, sale } = cart.cartItems[key];
                      return totalPrice + (price - sale) * qty;
                    }, 0) *
                      discount.discounts.percent) /
                    100
                  : 0
              }
            />
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default CheckoutPage;
