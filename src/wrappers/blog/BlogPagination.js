import React from "react";
import Paginator from "react-hooks-paginator";

const BlogPagination = (props) => {
  const { sortedProducts, pageLimit, setOffset, currentPage, setCurrentPage } =
    props;
  return (
    <div className="pro-pagination-style text-center mt-20">
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
  );
};

export default BlogPagination;
