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
  appId: "1:491839476983:web:a92caa7e452c872d98eff2",
};


// Initialize Firebase, Realtime Database and Auth for app
export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
