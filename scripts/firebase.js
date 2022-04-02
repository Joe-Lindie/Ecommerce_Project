// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";

import { firestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD811voiwiBMoudE947rarhpTFOIsjxciI",

  authDomain: "ecommerce-9e714.firebaseapp.com",

  projectId: "ecommerce-9e714",

  storageBucket: "ecommerce-9e714.appspot.com",

  messagingSenderId: "191473325062",

  appId: "1:191473325062:web:e2b3988d0dac530f3e5f87",

  measurementId: "G-5ES7LSYQ85",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

console.log(firestore);
