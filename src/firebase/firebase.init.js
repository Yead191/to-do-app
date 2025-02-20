// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
=======
  apiKey: "AIzaSyB9CtJAfl47Bodf7wk8fcgxY7MqyJ0KEZ4",
  authDomain: "to-do-app-ec631.firebaseapp.com",
  projectId: "to-do-app-ec631",
  storageBucket: "to-do-app-ec631.firebasestorage.app",
  messagingSenderId: "1002080284322",
  appId: "1:1002080284322:web:1c5de99cab7d8c3b8a71fb"
>>>>>>> 4198fbb844981cbb4afcd84374e215b4fea1f557
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth