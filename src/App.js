import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import Layout from "./components/Shared/Layout";
import Login from "./components/Authentication/login";
import SignUp from "./components/Authentication/signup";
import ForgotPassword from "./components/Authentication/forgotpassword";
import NotFound from "./components/Authentication/404";
import Maintenance from "./components/Authentication/maintenance";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/Bata.css";
import AllLanguages from "./components/AllLanguages/AllLanguages";
import AllUsers from "./components/AllUsers/AllUsers";

const App = (props) => {
  const {
    themeColor,
    fontStyle,
    lightVersion,
    RtlVersion,
    offcanvas,
    miniSidebar,
    horizontalMenu,
    miniHover,
    authReducer,
  } = props;
  document.getElementsByTagName(
    "body"
  )[0].className = `${themeColor} ${fontStyle}${
    lightVersion ? " light_version" : ""
  }${RtlVersion ? " rtl" : ""}${offcanvas ? " offcanvas-active" : ""}${
    horizontalMenu ? " h-menu" : ""
  }${miniSidebar ? " mini_sidebar" : ""}${miniHover ? " mini_hover" : ""}`;

  const LoggedInRoutes = [
    <Route  component={Layout} />,
  ];

  const LoggedOutRoutes = [
    <Route exact path="/" component={Login} />,
    // <Route path="/signup" component={SignUp} />,
    // <Route path="/notfound" component={NotFound} />,
    // <Route path="/maintenance" component={Maintenance} />,
    // <Route path="/forgotpassword" component={ForgotPassword} />,
  ];

  return (
    <>
      <ToastContainer />
      <div
        ref={(leftSidebar) => {
          leftSidebar = leftSidebar;
        }}
      >
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Router>
          <Switch>
            {!authReducer?.isLogin ? LoggedOutRoutes : LoggedInRoutes}
            {/* {LoggedInRoutes[0]} */}
            {/* <Route exact  path="/" component={Layout} /> */}
          </Switch>
        </Router>
        {/* </PersistGate> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  themeColor: state?.settings?.themeColor,
  fontStyle: state?.settings?.fontStyle,
  lightVersion: state?.settings?.lightVersion,
  RtlVersion: state?.settings?.RtlVersion,
  offcanvas: state?.settings?.offcanvas,
  horizontalMenu: state?.settings?.horizontalMenu,
  miniSidebar: state?.settings?.miniSidebar,
  miniHover: state?.settings?.miniHover,
  authReducer: state?.authReducer,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
