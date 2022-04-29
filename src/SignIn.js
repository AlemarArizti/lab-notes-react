import './SignIn.css';
import React, { useState } from 'react';
import {useAuth} from './context/AuthContext';
import {useNavigate} from 'react-router-dom';
//imagenes
import logo from './imagenes/logo.png';
import catlogo from './imagenes/catlogo.png';


export default function SignIn() {
  
   const [user, setUser] =useState({
     name: '',
     email:'',
     password: ''
   }); 
    
   const {signup}= useAuth();
   const navigate = useNavigate();
   const [error, setError]= useState();

    const handleChange = ({target: {name,value}}) =>{
      setUser({...user,[name]: value})
    };

    const handleSubmit =  async e =>{
      e.preventDefault()
      try{
        await signup( user.email, user.password)
        navigate('/Home')
      }catch(error){
        console.log(error.code);
        if(error.code === "auth/weak-password"){
          setError("La contraseña debe tener al menos 6 caracteres");
        }else if(error.code === "auth/invalid-email"){
          setError("El correo es invalido");
        }else if(error.code === "auth/email-already-in-use"){
          setError("Ese correo ya esta registrado");
        }}}

  return (
    <div className="App">
      <section id="logoNoteSec">
      <img src={logo} alt="Logo" id="logo"></img>
      </section>

       <section>
       <section className="errorSec">
          {error && <p className="error">{error}</p>}
          </section>
      
       <form id="inputSingIn" onSubmit={handleSubmit}>
       <input type="text" className="input" id="nameS" name="name" placeholder='Name' onChange={handleChange}></input>
       <input type="text" className="input" id="mailS" name="email" placeholder='E-mail' onChange={handleChange}></input>
       <input type="password" className="input" id="passwordS" name="password" placeholder='Password' onChange={handleChange}></input>
       <section id="buttonSect">
       <button className="buttonHome" id="singIn">Sing In</button>
       </section>
       </form>
       </section>
       
       <section id="foter">
         <p id="copy">&copy;CopyRight Alemar Arizti</p>
         <img src={catlogo} alt="catLogo" id="catlogo"></img>
        </section>
       
    </div>
  );
}
 


