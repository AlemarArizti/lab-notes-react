 

 import { db} from '../firebase.js';
 import {  deleteDoc, doc,} from "firebase/firestore";
 import Swal from "sweetalert2";//Borrar Notas

 export const deleteNote = (id) =>{
    Swal.fire({
      title: "Do you want to delete the note?",
      icon: "warning",
      showCancelButton: true,
      showconfirmButton: true,
      confirmButtonColor: "#0994D5",
      cancelButtonColor: "#8f2b00",
      confirmButtonText: "Yes",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const noteDoc = doc(db, "Notes", id )
        await deleteDoc(noteDoc);
      }
    });
  }


  
 