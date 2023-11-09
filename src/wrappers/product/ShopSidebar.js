import PropTypes from "prop-types";
import React from "react";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopRating from "../../components/product/ShopRating";

const ShopSidebar = ({
  products,
  getSortParams,
  sideSpaceClass,
  product,
  getSearchParams,
}) => {
  //   const uniqueCategories = getIndividualCategories(products);
  const priceRange = product.priceRange;
  const uniqueCategories = [];
  Object.keys(product.productsByPrice).map((key, index) => {
    // const str = `Dưới ${(+priceRange[key]).toLocaleString("vi", {
    //   style: "currency",
    //   currency: "VND",
    // })}`;
    uniqueCategories.push(priceRange[key]);
  });
  // const uniqueColors = getIndividualColors(products);
  // const uniqueSizes = getProductsIndividualSizes(products);
  // const uniqueTags = getIndividualTags(products);
  // const uniqueRating = [0, 1, 2, 3, 4];
  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch getSearchParams={getSearchParams} />

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />
      {/* <ShopRating categories={uniqueRating} /> */}

      {/* filter by color */}
      {/* <ShopColor colors={uniqueColors} getSortParams={getSortParams} /> */}

      {/* filter by size */}
      {/* <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} /> */}

      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
