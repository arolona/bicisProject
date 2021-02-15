import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBryUeq0Ot-KHbrKvb6YGreEZMxFnxQO-Q",
  authDomain: "bicisproject-51bd3.firebaseapp.com",
  projectId: "bicisproject-51bd3",
  storageBucket: "bicisproject-51bd3.appspot.com",
  messagingSenderId: "197407961246",
  appId: "1:197407961246:web:8f8df88f8c06f2c8884b8f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db
}
