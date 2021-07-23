import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDLXRgGwlig4XarFZLfJzB6BmC4rMlDMvI",
    authDomain: "fileupload-89d50.firebaseapp.com",
    projectId: "fileupload-89d50",
    storageBucket: "fileupload-89d50.appspot.com",
    messagingSenderId: "775908793476",
    appId: "1:775908793476:web:1005449a0cbe6d6369f6d1",
    measurementId: "G-JSM5BV1LGL"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };