import './Estilos/Home.css';
import React, {useEffect, useState} from "react";
import {useAuth} from  './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db, saveNote } from './firebase.js';
import { collection, onSnapshot } from "firebase/firestore";
import {deleteNote} from "./Funciones/Delete"

//imagenes
import letras from './imagenes/letras.png';
import logoutB from './imagenes/logout.png';
import deleteB from './imagenes/eliminar.png';
import editB from './imagenes/editar.png';


export default function Home() {

  //Guardar texto de notas
  const noteForm = document.getElementById('imputNotesForm')
  function handleSubmit(e) {
    e.preventDefault();

    const title = noteForm['Title'];
    const description= noteForm['Description'];

  saveNote(title.value, description.value)
  noteForm.reset();
  }

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

 //Edit

  const edit = (note) =>{

    const titleEdit = document.getElementById("noteTitle")//.value = note.Title 
    const descriptionEdit = document.getElementById("noteDescription")//.value = note.Description
    navigate(`/EditNote/${note.id}`)
    console.log(titleEdit, descriptionEdit);
  }

  
  return (
    <div className="Home">
      <section id="header">
      <img src={letras} alt="letras" id="letras"></img>
      </section>
      <section id="logout">
      <img src={logoutB} alt="logOutB" id="logOutB" onClick={handleLogout}></img>
      </section>
       

      <section id="imputNoteSec">
     <form id="imputNotesForm">
         <input type="text" placeholder='Title' id="Title"></input>
         <input type="text" placeholder='Note' id="Description"></input> 
         <section id="saveNoteBSec">
       <button id="saveNoteB"onClick={handleSubmit}>Save</button>
       </section>
       </form>
       
     </section>
 
     <section id="NotesSec">
      
     {note.map((note)=>{
         return (<section className="noteContainer" key={note.id}>
           
           <div id="noteTitle" className="noteTitle"><h3 className="noteTitle"> {note.Title}</h3></div>     
           <div id="noteDescription" className="noteDescription"> {note.Description}</div>
           
           <img src={deleteB} alt="Delete" id="delete" onClick={() => deleteNote(note.id)}></img>
           <img src={editB} alt="Edit" id="edit" onClick={() => edit(note)}></img>       
           </section>);
        })}
     </section>
  
    </div>
  );
  }