import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setActiveSort } from "../../helpers/product";

const BlogSidebar = ({ getSortParams, getSearchParams }) => {
  const categories = ["ordered", "packed", "shipped", "delivered", "canceled"];
  const [searchValue, setSearchValue] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    getSearchParams("search", searchValue);
  };
  return (
    <div className="sidebar-style">
      {/* <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Search </h4>
        <div className="pro-sidebar-search mb-55 mt-25">
          <form className="pro-sidebar-search-form" action="#">
            <input
              type="text"
              placeholder="Search here..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={searchHandler}>
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div> */}

      <div className="sidebar-widget mt-50">
        <h4 className="pro-sidebar-title">Tag </h4>
        <div className="sidebar-widget-tag mt-25">
          <ul>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        getSortParams("category", category);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
