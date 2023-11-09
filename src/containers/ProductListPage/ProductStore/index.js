import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { Link, useLocation } from "react-router-dom";
import Card from "../../../components/UI/Card";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";
import { MaterialButton } from "../../../components/MaterialUI";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../../layouts/LayoutOne";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../../wrappers/product/ShopTopbar";
import ShopProducts from "../../../wrappers/product/ShopProducts";
/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const location = useLocation();

  // console.log(product);
  const products = product.products;
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const pageLimit = 9;
  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  const getSearchParams = (sortType, sortValue) => {
    console.log("TTTT", sortType);
    console.log("VVV", sortValue);
    setSearchType(sortType);
    setSearchValue(sortValue);
  };

  // const [priceRange, setPriceRange] = useState({
  //   under2000k: 2,
  //   under5000k: 5,
  //   under10000k: 10,
  //   under15000k: 15,
  //   under20000k: 20,
  //   under30000k: 30,
  //   under50000k: 50,
  // });
  const priceRange = product.priceRange;
  // console.log("Price Range", priceRange);
  const dispatch = useDispatch();
  const renderRating = (rating) => {
    let num = 0;
    let sum = 0;
    rating.forEach((element) => {
      sum += element.rating;
      num++;
    });
    return (sum * 1.0) / num;
  };
  const getRatingProduct = (rating) => {
    if (rating.length > 0) {
      return renderRating(rating);
    } else {
      return 0;
    }
  };

  const getSortedProducts = (products, sortType, sortValue) => {
    console.log("TYPE", sortType);
    console.log("VALUE", sortValue);
    if (sortType === "filterSort") {
      if (sortValue === "priceHighToLow") {
        return products.sort((a, b) => b.price - a.price);
      } else if (sortValue === "priceLowToHigh") {
        return products.sort((a, b) => a.price - b.price);
      } else if (sortValue === "ratingHighToLow") {
        return products.sort(
          (a, b) => getRatingProduct(b.reviews) - getRatingProduct(a.reviews)
        );
      } else if (sortValue === "ratingLowToHigh") {
        return products.sort(
          (a, b) => getRatingProduct(a.reviews) - getRatingProduct(b.reviews)
        );
      } else {
        return products;
      }
    } else if (sortType === "category") {
      return products.filter((product) => product.price <= sortValue);
    } else if (sortType === "search") {
      if (sortValue) {
        return products.filter((product) =>
          product.name.toLowerCase().includes(sortValue.toLowerCase())
        );
      } else {
        return products;
      }
    }
    return products;
  };
  // Code khác trong video do làm như video không còn được hỗ trợ
  useEffect(() => {
    console.log("LOCATION", window.location.search);
    if (window.location.pathname === "/search") {
      dispatch(getProduct());
      setSearchType("search");
      setSearchValue(window.location.search.slice(1));
    } else {
      dispatch(getProductsBySlug(window.location.pathname));
    }
  }, [location.pathname, window.location.search]);

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    const searchSortedProducts = getSortedProducts(
      sortedProducts,
      searchType,
      searchValue
    );
    sortedProducts = searchSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [
    offset,
    product,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    searchType,
    searchValue,
  ]);
  return (
    <Fragment>
      <MetaTags>
        <title>Laptop Shop | Shop Page</title>
        <meta
          name="description"
          content="Shop page of Laptop Shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "shop"}>
        Shop
      </BreadcrumbsItem>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  products={product.products}
                  getSortParams={getSortParams}
                  getSearchParams={getSearchParams}
                  sideSpaceClass="mr-30"
                  product={product}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ProductStore;
