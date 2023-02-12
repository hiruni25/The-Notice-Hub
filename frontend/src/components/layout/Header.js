import React, { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "../../App.css";
import { useHistory } from "react-router-dom";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();


  const { user, loading } = useSelector((state) => state.auth);

  const logOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    history.push("/");
  }

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link>
              <img src="" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                classname="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.email}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-lablledby="dropDownMenuButton"
              >
                <Link className="dropdown-item text-danger" >
                  <span onClick={logOut}>Logout</span>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;