import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import "react-phone-number-input/style.css";
import Layout from "./components/Shared/Layout";
import Login from "./components/Authentication/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/Bata.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, app } from "../src/init-firebase";
import { getMessaging, getToken } from "firebase/messaging";
import * as actions from "./actions/actions";

const App = (props) => {
  const {
    themeColor,
    sendFirebaseTokenToDatabase,
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

  const TOPIC = "bata_admin";
  const [registrationToken, setRegistrationToken] = useState("");
  const LoggedInRoutes = [<Route component={Layout} />];
  const LoggedOutRoutes = [<Route exact path="/" component={Login} />];
  const messaging = getMessaging(app);

  const firebaseNotificationInit = async () => {
    await getToken(messaging, {
      vapidKey:
        "BNm7ws2iauUNH7kevjdwI4Gi1FtFc65eXsMqNWB-ij_dyJoruPt95MYZvur0T-goNlOiEK5v5j_bB7WcHzm_UIo",
    })
      .then(async (currentToken) => {
        if (currentToken) {
          console.log("Current Token: ", currentToken);
          setRegistrationToken(currentToken);
          // await messaging
          // .subscribeToTopic(currentToken, "bata_admin")
          // .then((response) => {
          //   console.log("Successfully subscribed to topic:", response);
          // })
          // .catch((error) => {
          //   console.log("Error subscribing to topic:", error);
          // });
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });

  };

  useEffect(() => {
    firebaseNotificationInit();
  }, []);

  useEffect(() => {
    if (authReducer?.isLogin) {
      sendFirebaseTokenToDatabase(registrationToken, authReducer?.accessToken);
    }
  }, [registrationToken]);
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

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(mapStateToProps, actions)(App);
