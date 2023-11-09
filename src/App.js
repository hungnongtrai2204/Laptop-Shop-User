import PropTypes from "prop-types";
import React, { useEffect, Suspense } from "react";
import ScrollToTop from "./helpers/scroll-top";
// import "./App.css";
import HomePage from "./containers/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
// import { multilanguage, loadLanguages } from "redux-multilanguage";
// import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import ProductListPage from "./containers/ProductListPage";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, updateCart } from "./actions";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CartPage from "./containers/CartPage";
import CheckoutPage from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
import LoginRegister from "./containers/other/LoginRegister";
import MyAccount from "./containers/other/MyAccount";
import About from "./containers/other/About";
import Wishlist from "./containers/other/Wishlist";
import Compare from "./containers/other/Compare";
function App(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //   props.dispatch(
  //     loadLanguages({
  //       languages: {
  //         en: require("./translations/english.json"),
  //         fn: require("./translations/french.json"),
  //         de: require("./translations/germany.json"),
  //       },
  //     })
  //   );
  // }, []);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <ToastProvider placement="bottom-left">
        <BreadcrumbsProvider>
          <Router>
            <ScrollToTop>
              <Suspense
                fallback={
                  <div className="flone-preloader-wrapper">
                    <div className="flone-preloader">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                }
              >
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route
                    exact
                    path="/login-register"
                    element={<LoginRegister />}
                  />
                  <Route exact path="/my-account" element={<MyAccount />} />
                  <Route exact path="/cart" element={<CartPage />} />
                  <Route exact path="/checkout" element={<CheckoutPage />} />
                  <Route exact path="/account/orders" element={<OrderPage />} />
                  <Route
                    exact
                    path="/order_details/:orderId"
                    element={<OrderDetailsPage />}
                  />
                  <Route
                    exact
                    path="/:productSlug/:productId/p"
                    element={<ProductDetailsPage />}
                  />
                  <Route exact path="/:slug" element={<ProductListPage />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/wishlist" element={<Wishlist />} />
                  <Route exact path="/compare" element={<Compare />} />
                </Routes>
              </Suspense>
            </ScrollToTop>
          </Router>
        </BreadcrumbsProvider>
      </ToastProvider>
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func,
};

export default App;

// export default connect()(multilanguage(App));
