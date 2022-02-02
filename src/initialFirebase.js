// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrmso9DfTFLHDY60n3uYOgdczS-evl0WI",
  authDomain: "employee-management-syst-aa90e.firebaseapp.com",
  projectId: "employee-management-syst-aa90e",
  storageBucket: "employee-management-syst-aa90e.appspot.com",
  messagingSenderId: "736551914680",
  appId: "1:736551914680:web:ea713579b6c9372705784d",
  measurementId: "G-PR1FWGSTH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);