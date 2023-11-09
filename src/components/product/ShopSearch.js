import React, { useState } from "react";

const ShopSearch = ({ getSearchParams }) => {
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (e) => {
    console.log("CLICKKKKKKK", searchValue);
    e.preventDefault();
    getSearchParams("search", searchValue);
  };
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form">
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
    </div>
  );
};

export default ShopSearch;
