import React from "react";
import { Link } from "react-router-dom";

const Notice = ({ notice, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/notice/${notice._id}`}>{notice.title}</Link>
          </h5>
          <p className="card-text">{notice.content}</p>
          <Link
            to={`/notice/${notice._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notice;