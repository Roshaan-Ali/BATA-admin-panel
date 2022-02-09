importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDUGEQ2djuF7NNxkqj9kvO7sXxk6Q3HNBU",
  authDomain: "bata-14b76.firebaseapp.com",
  projectId: "bata-14b76",
  storageBucket: "bata-14b76.appspot.com",
  messagingSenderId: "385824149869",
  appId: "1:385824149869:web:a76bd096f8aef66c090a64",
  measurementId: "G-8DWEP0H486",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// foreground notification handler
// messaging.onMessage(messaging,(payload) => {
//   console.log(payload);
// });

// background notification handler will be written here
// messaging.onBackgroundMessage((payload) => {
//   // console.log("Notification recieved on background: ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     // body: payload.notification.body,
//     body:"test-------------------------",
//     icon: "assets/images/bata_logo_1.png",
//   };

//   return self.registration.showNotification({
//     notificationTitle,
//     notificationOptions,
//   });
// });
