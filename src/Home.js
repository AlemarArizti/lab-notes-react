import './Home.css';
import {useAuth} from  './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveNote, getNotes} from './firebase.js';

//imagenes
import catlogo from './imagenes/catlogo.png';
import letras from './imagenes/letras.png';
import logoutB from './imagenes/logout.png';

//Obtener datos de Firestore
const NotesContainer = document.getElementById('noteContainer');

window.addEventListener('DOMContentLoaded', async() =>{
  const querySnapshot = await getNotes()
  var html =" ";

  querySnapshot.forEach(doc => {
    const note = doc.data()
    html +=`
    <div> 
    <h3>${note.Title}</h3>
    <p>${note.Decription}<p>
    </div>
    `
  })
  NotesContainer.dangerouslySetInnerHTML = html
})

export default function Home() {

   const {logout}=useAuth()
   const navigate = useNavigate();

   const handleLogout = async() =>{
     await logout()
     navigate("/")
   };

   const noteForm = document.getElementById('imputNotesForm')
    function handleSubmit(e) {
      e.preventDefault();

      const title = noteForm['Title'];
      const description= noteForm['Description'];

    saveNote(title.value, description.value)

    noteForm.reset();
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
         <input type="text" placeholder='Title'id="Title"></input>
         <input type="text" placeholder='Note'id="Description"></input>
         <button id="saveNoteB"onClick={handleSubmit}>Save</button>
       </form>
     </section>
      
      <section id="noteContainer">
      </section>
      
      
      <section id="foter">
         <p id="copy">&copy;CopyRight Alemar Arizti</p>
         <img src={catlogo} alt="catLogo" id="catlogo"></img>
        </section>
       
    </div>
  );
}