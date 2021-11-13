// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import { getFirestore } from "@firebase/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID

  apiKey: "AIzaSyDJ9M4kOb1yaa-M0OMpQB1pcg8ZDgRTS_M",
  authDomain: "paymentor-developement.firebaseapp.com",
  projectId: "paymentor-developement",
  storageBucket: "paymentor-developement.appspot.com",
  messagingSenderId: "382425766727",
  appId: "1:382425766727:web:f2c9859420221b37738a62"

  // apiKey: "AIzaSyAAAxCfSIe4OZpDs_yN5ErTLnqmXZY3R1s",
  // authDomain: "login-b1ae6.firebaseapp.com",
  // databaseURL: "https://login-b1ae6-default-rtdb.firebaseio.com",
  // projectId: "login-b1ae6",
  // storageBucket: "login-b1ae6.appspot.com",
  // messagingSenderId: "570901830685",
  // appId: "1:570901830685:web:4eaff8500781895eb8baf4"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore(); //getFirestore(app);
export default app;


// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyAAAxCfSIe4OZpDs_yN5ErTLnqmXZY3R1s",
//   authDomain: "login-b1ae6.firebaseapp.com",
//   projectId: "login-b1ae6",
//   storageBucket: "login-b1ae6.appspot.com",
//   messagingSenderId: "570901830685",
//   appId: "1:570901830685:web:4eaff8500781895eb8baf4"
// };
// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const auth = app.auth();
// export const firestore = app.firestore();
//   export default app;