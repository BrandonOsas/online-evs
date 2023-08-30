// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtVFWpJ63P1rnp0g4u8-LJ3tDvZ21Gw-U",
  authDomain: "online-evs-portal.firebaseapp.com",
  databaseURL: "https://online-evs-portal-default-rtdb.firebaseio.com",
  projectId: "online-evs-portal",
  storageBucket: "online-evs-portal.appspot.com",
  messagingSenderId: "491839476983",
  appId: "1:491839476983:web:bc16374ffdc82cff98eff2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export const auth = getAuth(app);
