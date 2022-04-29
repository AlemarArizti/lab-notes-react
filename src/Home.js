import './Home.css';
import {useAuth} from  './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { saveNote} from './firebase.js';

//imagenes
import catlogo from './imagenes/catlogo.png';
import letras from './imagenes/letras.png';
import logoutB from './imagenes/logout.png';

export default function Home() {
    

   const {logout}=useAuth()
   const navigate = useNavigate();

   const handleLogout = async() =>{
     await logout()
     navigate("/")
   };

   const noteForm = document.getElementById('imputNotes')
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
     <form id="imputNotes">
         <input type="text" placeholder='Title'id="Title"></input>
         <input type="text" placeholder='Note'id="Description"></input>
         <button onClick={handleSubmit}>Save</button>
       </form>
     </section>
      
      
      
      <section id="foter">
         <p id="copy">&copy;CopyRight Alemar Arizti</p>
         <img src={catlogo} alt="catLogo" id="catlogo"></img>
        </section>
       
    </div>
  );
}