import React, { Component, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import ThemeSetting from "./ThemeSetting";
import Searchbar from "./Searchbar";
import Rightbar from "./Rightbar";
import Megamenu from "./Megamenu";
import Routes from "../Route";
// import { getToken } from "firebase/messaging";
import { getMessaging, getToken,  } from "firebase/messaging";


export default class Layout extends Component {
  
constructor(props){
  super(props)
  this.state = {

  }

}



 componentDidMount(){
      getToken(getMessaging(), {
        vapidKey:
          "BNm7ws2iauUNH7kevjdwI4Gi1FtFc65eXsMqNWB-ij_dyJoruPt95MYZvur0T-goNlOiEK5v5j_bB7WcHzm_UIo",
      })
        .then( async (currentToken) => {
          if (currentToken) {
            console.log("Current Token: ", currentToken);
            // setRegistrationToken(currentToken);
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
 }
  // const messaging = getMessaging();

  // const firebaseNotificationInit = async () => {
  //   await getToken(messaging, {
  //     vapidKey:
  //       "BNm7ws2iauUNH7kevjdwI4Gi1FtFc65eXsMqNWB-ij_dyJoruPt95MYZvur0T-goNlOiEK5v5j_bB7WcHzm_UIo",
  //   })
  //     .then( async (currentToken) => {
  //       if (currentToken) {
  //         console.log("Current Token: ", currentToken);
  //         // setRegistrationToken(currentToken);
  //         // await messaging
  //         // .subscribeToTopic(currentToken, "bata_admin")
  //         // .then((response) => {
  //         //   console.log("Successfully subscribed to topic:", response);
  //         // })
  //         // .catch((error) => {
  //         //   console.log("Error subscribing to topic:", error);
  //         // });

  //       } else {
  //         console.log(
  //           "No registration token available. Request permission to generate one."
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("An error occurred while retrieving token. ", err);
  //     });

  //   // Subscribe To Notifications

  
  // };

  // useEffect(() => {
  //   firebaseNotificationInit();
  // }, []);
render(){
    return (
      <>
        <ThemeSetting />
        <div className="overlay" />
        <div id="wrapper">
          <Header />
          <Searchbar />
          <Megamenu />
          <Rightbar />
          <Menu {...this.props} />
          <div id="main-content">
            {/* <Switch> */}
            {Routes.map((layout, i) => {
              // console.log(`${layout.path}`);
              return (
                <Route
                  key={`r${i}`}
                  exact={layout.exact}
                  path={`/layout${layout.path}`}
                  component={layout.component}
                ></Route>
              );
            })}
            {/* </Switch> */}
          </div>
        </div>
      </>
    );
   }
}


