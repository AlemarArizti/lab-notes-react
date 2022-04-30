// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc  } from "firebase/firestore";

//import { collection, addDoc} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFrPHR8QhyoHUF7jqohytz2SdlZUgfeAo",
  authDomain: "labtes-ec82b.firebaseapp.com",
  projectId: "labtes-ec82b",
  storageBucket: "labtes-ec82b.appspot.com",
  messagingSenderId: "40206590591",
  appId: "1:40206590591:web:85d80b548092043f85154a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore()

//Obtener documentos

export const saveNote =(Title, Description) => 
  addDoc(collection(db,'Notes'), {Title, Description})

  export const getNotes = () => getDocs(collection(db,"Notes"));
