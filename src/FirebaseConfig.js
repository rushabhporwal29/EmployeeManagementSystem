import { initializeApp } from "firebase/app";
import {getAuth} from'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const app=initializeApp({
  apiKey: "AIzaSyCrmso9DfTFLHDY60n3uYOgdczS-evl0WI",
  authDomain: "employee-management-syst-aa90e.firebaseapp.com",
  projectId: "employee-management-syst-aa90e",
  storageBucket: "employee-management-syst-aa90e.appspot.com",
  messagingSenderId: "736551914680",
  appId: "1:736551914680:web:ea713579b6c9372705784d",
  measurementId: "G-PR1FWGSTH4"
});

const auth=getAuth(app);
const db=getFirestore();

export {auth,db};