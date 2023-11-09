import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopRating = ({ categories, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Đánh giá</h4>
      <div className="sidebar-widget-list mt-20">
        {categories ? (
          <ul>
            <li>
              {/* <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("category", "");
                    // setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div> */}
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        // getSortParams("category", category);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" />{" "}
                      {`Từ ${category} đến ${+category + 1} sao`}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopRating.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopRating;
