import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getNoticeDetails,
  updateNotice,
} from "../../actions/noticeActions";

const NoticeDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const noticeDetails = useSelector((state) => state.noticeDetails);
  const [updateNoticeData, setUpdateNoticeData] = useState({
    updateTitle: "",
    updateContent: "",
  });

  useEffect(() => {
    dispatch(getNoticeDetails(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (noticeDetails.error) {
      alert.error(noticeDetails.error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, noticeDetails.error]);

  useEffect(() => {
    if (noticeDetails.notice) {
      setUpdateNoticeData({
        updateTitle: noticeDetails.notice.title,
        updateContent: noticeDetails.notice.content,
      });
    }
  }, [noticeDetails.notice]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateNotice(updateNoticeData.updateTitle, updateNoticeData.updateContent)
    );
  };

  const onChange = (e) => {
    setUpdateNoticeData({
      ...updateNoticeData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      {noticeDetails.loading ? (
        <div className="loader"></div>
      ) : (
        <Fragment>
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 mt-5">
              <h1>{noticeDetails.notice.title}</h1>
              <p id="noticet_id">Notice # {noticeDetails.notice._id}</p>
              <hr />
              <p>{noticeDetails.notice.content}</p>
              <hr />

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Edit
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Edit Notice
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={submitHandler}>
                            <div className="form-group">
                              <label htmlFor="title">Title</label>
                              <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="updateTitle"
                                value={updateNoticeData.updateTitle}
                                onChange={onChange}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="content">Content</label>
                              <textarea
                                className="form-control"
                                id="content"
                                rows="3"
                                name="updateContent"
                                value={updateNoticeData.updateContent}
                                onChange={onChange}
                              ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Update
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default NoticeDetails;