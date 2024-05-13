
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDAltSF1ZaiyyLi0tL67QWXhZA9JqRGFA0",
  authDomain: "movie-ticket-booking-412e8.firebaseapp.com",
  projectId: "movie-ticket-booking-412e8",
  storageBucket: "movie-ticket-booking-412e8.appspot.com",
  messagingSenderId: "921565438516",
  appId: "1:921565438516:web:d5857613cf1bd747506061"
};


const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
export const auth= getAuth(app)
export const provider= new GoogleAuthProvider()