import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Notice from "./notice/Notice";
import { getNotice } from "../actions/noticeActions";
import { Link } from "react-router-dom";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    notices,
    error,
    noticesCount,
    resPerPage,
    filteredNoticeCount,
  } = useSelector((state) => state.notices);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getNotice(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = noticesCount;
  if (keyword) {
    count = filteredNoticeCount;
  }

  return (
    <Fragment>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <Fragment>
          <h1 id="products_heading">Notices</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {notices &&
                notices.map((notice) => (
                  <Notice key={notice._id} notice={notice} col={3} />
                ))}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={noticesCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
      <Link to="/create-notice" className="float-right mt-3">
        New Notice?
      </Link>
    </Fragment>
  );
};

export default Home;