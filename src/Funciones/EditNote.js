
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc, collection, getDocs } from "firebase/firestore";
import catlogo from '../imagenes/catlogo.png';
import letras from '../imagenes/letras.png';
import '../Estilos/EditNote.css';
export const db = getFirestore()

export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateTittle, setUpdateTittle] = useState("");
  const [updateDescription, setUpdateNote] = useState("");

  const [setNote] = useState([]);

  const getDoc = async () => {
    const docRef = collection(db, "Notes");
    const docS = await getDocs(docRef);
    //setNote(docS);
  };

  const updateNotes = async (id, Title, Description) => {
    
    const userDoc = doc(db, "Notes", id);
    await updateDoc(userDoc, {
      Title: updateTittle,
      Description: updateDescription,
    });
    navigate("/Home");
  };

  useEffect(() => {
    getDoc();
  }, []);
 
  return (
    <div id="container_edit_notes">

      <section id="header">
      <img src={letras} alt="letras" id="letras"></img>
      </section>
      
      <section id="editContainerSec" >
        <section className="editContainer">
      {}
        <input
          id= "editTitle"
          className="titleEdit"
          placeholder="Edit Title"
          onChange={(event) => {
            setUpdateTittle(event.target.value);
          }}
        />
        <input
          id= "editDescription"
          className="noteEdit"
          placeholder="Edite Note"
          onChange={(event) => {
            setUpdateNote(event.target.value);
          }}
        />
          <section id="editBS">
          <button className="saveB" onClick={() => {updateNotes(id); }} >Save</button>
          <button className="cancel" onClick={() => navigate("/Home")}>Cancelar </button>
          </section>
         </section>
        </section>

        <section id="foter">
          <p id="copy">&copy;CopyRight Alemar Arizti</p>
          <img src={catlogo} alt="catLogo" id="catlogo"></img>
         </section>
      
      {}
    </div>
  );
}
 