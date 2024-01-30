import React, { useState, useEffect } from "react";
import "./styles.scss";
import ReactPaginate from "react-paginate";
import assets from "../../assets";

const Pagination = (props) => {
  const { totalPage = 0, pageChange } = props;
  const [color, setColor] = useState("");
  const [nextColor, setNextColor] = useState("");

  useEffect(() => {
    // if (totalPage === 2) {
    setNextColor("previous-text-black");
    setColor("next-text-blue");
    // }
  }, []);

  const handlePageChange = (page) => {
    pageChange(page);

    if (page === 1) {
      setColor("next-text-blue");
      setNextColor("previous-text-black");
    } else if (page === totalPage) {
      setNextColor("previous-text-blue");
      setColor("next-text-black");
    } else {
      setColor("next-text-blue");
      setNextColor("previous-text-blue");
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="custom-pagination-container">
          <ReactPaginate
            disableInitialCallback={true}
            previousLabel={
              <span className="">
                <img
                  src={`${
                    nextColor === "previous-text-blue"
                      ? assets.Icons.pagination_left_arrow_blue
                      : assets.Icons.pagination_left_arrow_black
                  }`}
                  alt="left-icon"
                  className="pagination-icon"
                />
                <span className={nextColor}> Previous </span>
              </span>
            }
            nextLabel={
              <span className="">
                <span className={color}> Next </span>
                <img
                  src={`${
                    color === "next-text-black"
                      ? assets.Icons.pagination_right_arrow_black
                      : assets.Icons.pagination_right_arrow_blue
                  }`}
                  alt="right-icon"
                  className="pagination-icon"
                />
              </span>
            }
            breakLabel={<span className="pagination-text">...</span>}
            breakClassName=" "
            pageCount={Math.ceil(totalPage)}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            onPageChange={(e) => handlePageChange(e.selected + 1)}
            containerClassName="pagination custom-pagination"
            pageClassName=" custom-page-item"
            pageLinkClassName="custom-page-link"
            activeClassName="pagination-active"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="custom-page-link"
            nextLinkClassName="custom-page-link"
            disabledClassName={"disabled"}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
