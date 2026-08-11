// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPzQp_jUgs7I4d80SvAL4krs8J8wffozQ",
  authDomain: "visiontrack-6be5e.firebaseapp.com",
  projectId: "visiontrack-6be5e",
  storageBucket: "visiontrack-6be5e.firebasestorage.app",
  messagingSenderId: "495813089191",
  appId: "1:495813089191:web:1ecc21f5a69b082aef8882",
  measurementId: "G-78TTE9QTLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);