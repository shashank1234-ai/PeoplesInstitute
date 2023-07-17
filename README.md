# Modernize-Angular-pro
Modernize Angular Admin Dashboard

https://tabler-icons.io/

npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYJ-7re7KUVeADFxprI9qN95TCSc2MYKo",
  authDomain: "people-s-institue.firebaseapp.com",
  projectId: "people-s-institue",
  storageBucket: "people-s-institue.appspot.com",
  messagingSenderId: "963672762213",
  appId: "1:963672762213:web:d6f6ac614abb074772238c",
  measurementId: "G-QVHBYKDY1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



Cred:

raoshashank967@gmail.com
nU3c6xDXz2CkuJ5



Find the coords of top left corner of question and top right corner
bottom left of options and extract it as a block-> check for Images -> if no of Imges in that block == > 4 -> possibility that options are also images -> Else if no of images == 1 then -> check for watermark -> if not watermark then its a match  


gsutil cors set cors.json gs://people-s-institue.appspot.com