import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Notice from "./notice/Notice";
import { getNotice } from "../actions/noticeActions";
import { Link } from "react-router-dom";


const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);

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


  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getNotice(currentPage));
  }, [dispatch, alert, error, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = noticesCount;

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