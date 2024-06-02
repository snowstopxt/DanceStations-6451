import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCaBqTXR0IcD3qYuWdt3pwD_SeJFz0AbZQ",
    authDomain: "dancestations-d5b02.firebaseapp.com",
    projectId: "dancestations-d5b02",
    storageBucket: "dancestations-d5b02.appspot.com",
    messagingSenderId: "988002424763",
    appId: "1:988002424763:web:3bc00d2816f374ecba569e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig); 
  const auth = getAuth(app);
  const user = auth.currentUser;

  export{ app, auth, user};