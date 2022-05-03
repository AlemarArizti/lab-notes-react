import './Home.css';
import React, {useEffect, useState} from "react";
import {useAuth} from  './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveNote, db } from './firebase.js';
import { collection, deleteDoc, doc, onSnapshot, } from "firebase/firestore";

//imagenes
import catlogo from './imagenes/catlogo.png';
import letras from './imagenes/letras.png';
import logoutB from './imagenes/logout.png';
import deleteB from './imagenes/eliminar.png';
import editB from './imagenes/editar.png';

export default function Home() {

  //Imprimir notas
  const [ note, setNote] = useState([]);
  
  const printNote = async () => {
      onSnapshot(collection( db, 'Notes'), (QuerySnapshot) => {
          const notas = []
          QuerySnapshot.forEach(doc =>{
              notas.push({ ...doc.data(), id: doc.id})
          })
          setNote(notas)
      })
  }
  useEffect(()=> {
      printNote()
  },[])
  
  //Autentificación 

   const {logout}=useAuth()
   const navigate = useNavigate();

   const handleLogout = async() =>{
     await logout()
     navigate("/")
   };

   //Guardar texto de notas
   const noteForm = document.getElementById('imputNotesForm')
    function handleSubmit(e) {
      e.preventDefault();

      const title = noteForm['Title'];
      const description= noteForm['Description'];

    saveNote(title.value, description.value)
    noteForm.reset();
    }

    //Borrar Notas

    const deleteNote = async (id) =>{
      const noteDoc = doc(db, "Notes", id )
      await deleteDoc(noteDoc);
    }

    //Editar notas
    
  
  return (
    <div className="Home">
      <section id="header">
      <img src={letras} alt="letras" id="letras"></img>
      </section>
      <section id="logout">
      <img src={logoutB} alt="logOutB" id="logOutB" onClick={handleLogout}></img>
      </section>
       
     <section id="saveAndNotes">

     <section id="imputNoteSec">
     <form id="imputNotesForm">
         <input type="text" placeholder='Title'id="Title"></input>
         <input type="text" placeholder='Note'id="Description"></input>
         <button id="saveNoteB"onClick={handleSubmit}>Save</button>
       </form>
     </section>
      
     {note.map((note)=>{
         return (<section className="noteContainer">
           
           <h3 className="noteTitle"> {note.Title}</h3>          
           <p className="noteDescription"> {note.Description}</p>
           <img src={deleteB} alt="Delete" id="delete" onClick={() =>deleteNote(note.id)}></img>
           <img src={editB} alt="Edit" id="edit"></img>
         
           </section>);
        })}

     
     </section>
      
      
      <section id="foter">
         <p id="copy">&copy;CopyRight Alemar Arizti</p>
         <img src={catlogo} alt="catLogo" id="catlogo"></img>
        </section>
       
    </div>
  );
  }