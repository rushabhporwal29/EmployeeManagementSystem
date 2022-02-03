import { initializeApp } from "firebase/app";
import {getAuth} from'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const app=initializeApp({
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_ID
});

const auth=getAuth(app);
const db=getFirestore();

export {auth,db};