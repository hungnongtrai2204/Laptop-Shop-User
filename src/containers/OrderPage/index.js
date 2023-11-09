import React, { useEffect, Fragment, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import { Breed } from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import { generatePublicUrl } from "../../urlConfig";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";

import "./style.css";
/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [currentData, setCurrentData] = useState([]);
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  // const [sortedProducts, setSortedProducts] = useState([
  //   user.orders.map((order) => {
  //     return order.items.map((item) => item);
  //   }),
  // ]);
  const [sortedProducts, setSortedProducts] = useState([]);
  console.log("Test", user.orders);
  const getOrderStatus = (orderStatus) => {
    let type = "ordered";
    for (const status of orderStatus) {
      if (status.isCompleted) {
        type = status.type;
      }
    }
    return type;
  };

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };
  const getSearchParams = (sortType, sortValue) => {
    setSearchType(sortType);
    setSearchValue(sortValue);
  };

  const pageLimit = 5;

  const getSortedProducts = (orders, sortType, sortValue) => {
    console.log("TYPE", sortType);
    console.log("VALUE", sortValue);

    // if (sortType === "search") {
    //   if (sortValue) {
    //     return orders.filter((order) =>
    //       // product.name.toLowerCase().includes(sortValue.toLowerCase())
    //       order.items.map(item=>item)
    //     );
    //   } else {
    //     return orders;
    //   }
    // }
    if (sortType === "category") {
      return orders.filter(
        (order) => getOrderStatus(order.orderStatus) === sortValue
      );
    }
    return orders;
  };

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    // let sortedProducts = getSortedProducts(user.orders, sortType, sortValue);
    let sortedProducts = getSortedProducts(user.orders, sortType, sortValue);
    const searchSortedProducts = getSortedProducts(
      sortedProducts,
      searchType,
      searchValue
    );
    sortedProducts = searchSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [searchType, searchValue, sortType, sortValue, offset, user]);

  return (
    <Fragment>
      <MetaTags>
        <title>Laptop Shop | Orders</title>
        <meta
          name="description"
          content="Order page of Laptop Shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/account/orders"}>
        Orders
      </BreadcrumbsItem>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <Breadcrumb />

        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9">
                <div className="ml-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPosts user={currentData} />
                  </div>

                  {/* blog pagination */}
                  <BlogPagination
                    sortedProducts={sortedProducts}
                    pageLimit={pageLimit}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                {/* blog sidebar */}
                <BlogSidebar
                  getSortParams={getSortParams}
                  getSearchParams={getSearchParams}
                />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default OrderPage;
