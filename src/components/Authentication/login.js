import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/actions";
import LOGO from "../../assets/images/bata_logo_1.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ adminLogin, authReducer }) => {
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  console.log(authReducer, ".................");

  const _onPressLogin = async () => {
    if (email && password) {
      await adminLogin(email, password, _onLoginSuccess);
    } else {
      toast.info("Please Enter Credentials.");
    }
  };

  const _onLoginSuccess = () => {
    history.push("/layout");
  };
  return (
    <>
      <div className="pattern">
        <span className="red"></span>
        <span className="indigo"></span>
        <span className="blue"></span>
        <span className="green"></span>
        <span className="orange"></span>
      </div>

      <div className="auth-main particles_js">
        <div className="auth_div vivify popIn">
          <div className="auth_brand">
            <Link className="navbar-brand" to="/">
              <img
                src={LOGO}
                width="30"
                height="30"
                className="d-inline-block align-top mr-2"
                alt="Oculux logo"
              />
              Burmese American Translation Agency
            </Link>
          </div>

          <div className="card">
            <div className="body">
              <p className="lead">Admin Login</p>
              {/* <form className="form-auth-small m-t-20" action="/"> */}
              <div className="form-group">
                <label htmlFor="signin-email" className="control-label sr-only">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control round"
                  id="signin-email"
                  defaultValue="user@domain.com"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="signin-password"
                  className="control-label sr-only"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPasswrod(e.target.value)}
                  type="password"
                  className="form-control round"
                  id="signin-password"
                  defaultValue="thisisthepassword"
                  placeholder="Password"
                />
              </div>
              {/* <div className="form-group clearfix">
                  <label className="fancy-checkbox element-left">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                </div> */}
              <button
                type="button"
                //   type="submit"
                className="btn btn-primary btn-round btn-block"
                onClick={() => _onPressLogin()}
              >
                LOGIN
              </button>
              {/* <div className="bottom">
                  <span className="helper-text m-b-10">
                    <i className="fa fa-lock"></i>{" "}
                    <Link to="/forgotpassword">Forgot password?</Link>
                  </span>
                  <span>
                    Don't have an account? <Link to="/signup">Register</Link>
                  </span>
                </div> */}
              {/* </form> */}
            </div>
          </div>
        </div>
        <div id="particles-js"></div>
      </div>
    </>
  );
};
const mapStateToProps = ({ authReducer }) => {
  return { authReducer };
};
export default connect(mapStateToProps, actions)(Login);
