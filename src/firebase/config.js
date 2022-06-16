import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFFQwKk7iSW7rreABg-VzWBZz23j1zY_c",
  authDomain: "mymoney-290b8.firebaseapp.com",
  projectId: "mymoney-290b8",
  storageBucket: "mymoney-290b8.appspot.com",
  messagingSenderId: "942815265601",
  appId: "1:942815265601:web:0a0dab1cc67cebff6ed7c0"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }