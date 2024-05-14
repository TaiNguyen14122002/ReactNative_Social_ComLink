// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4NZnrtrGu_vBEeTx-w00l0bjTEpgvGpA",
  authDomain: "chatvideocall-15d1f.firebaseapp.com",
  projectId: "chatvideocall-15d1f",
  storageBucket: "chatvideocall-15d1f.appspot.com",
  messagingSenderId: "1074926492690",
  appId: "1:1074926492690:web:d4fdd1beb6539a27ef8ccb",
  measurementId: "G-HXMDHFMFVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);