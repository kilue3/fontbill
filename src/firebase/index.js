import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAPi30Tlx32SeigEM5mhJYQR956x2tGSKA",
    authDomain: "bill-2f6c3.firebaseapp.com",
    projectId: "bill-2f6c3",
    storageBucket: "bill-2f6c3.appspot.com",
    messagingSenderId: "673300650502",
    appId: "1:673300650502:web:357814969b325cc49d8187",
    measurementId: "G-9GY374WQQ5"
  };
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };