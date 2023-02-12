import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createNotice, clearErrors } from "../../actions/noticeActions";


const CreateNotice = ({ history }) => {
  const [notice, setNotice] = useState({
    title: "",
    content: ""
  });

  const { title, content } = notice;

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(title, content)
    let notice = {
      'title': title,
      'content': content
    }
    dispatch(createNotice(title, content));
  };

  const onChange = (e) => {
      setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <h5>New Notice</h5>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">New Notice</h1>

            <div className="form-group">
              <label htmlFor="title_field">Title</label>
              <input
                type="text"
                id="title_field"
                className="form-control"
                name="title"
                value={title}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content_field">Content</label>
              <textarea
                type="txt"
                id="content_field"
                className="form-control"
                name="content"
                value={content}
                onChange={onChange}
              />
            </div>
            <button
              id="create_new_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Add New Notice
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNotice;
