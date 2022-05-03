// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc  } from "firebase/firestore";

//import { collection, addDoc} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnTARKFgh7gb8ZOr8KS1fDSOavfH_Glzg",
  authDomain: "lab-notes-de03f.firebaseapp.com",
  projectId: "lab-notes-de03f",
  storageBucket: "lab-notes-de03f.appspot.com",
  messagingSenderId: "662165448537",
  appId: "1:662165448537:web:524c9f7691e8611438ce48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
 export const db = getFirestore()

//Obtener documentos

export const saveNote =(Title, Description) => 
  addDoc(collection(db,'Notes'), {Title, Description})

 //export const getNotes = () => getDocs(collection(db,"Notes"));

 