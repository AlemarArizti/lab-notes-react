import './Welcome.css';
import React, { useState } from 'react';
import {useAuth} from './context/AuthContext';
import {useNavigate} from 'react-router-dom';
//imagenes
import logo from './imagenes/logo.png';
import catlogo from './imagenes/catlogo.png';

function Welcome() {
  const [user, setUser] =useState({
    name: '',
    email:'',
    password: ''
  }); 
   
  const {login,  logingGoogle}= useAuth();
  const navigate = useNavigate();
  const [error, setError]= useState();

   const handleChange = ({target: {name,value}}) =>{
     setUser({...user,[name]: value})
   };

   const handleSubmit =  async e =>{
     e.preventDefault()
     try{
       await login( user.email, user.password)
       navigate('/Home')
     }catch(error){
       console.log(error.code);
       if(error.code === "auth/wrong-password"){
         setError("La contraseña es incorrecta");
       }else if(error.code === "auth/user-not-found"){
         setError("El correo es incorrecto");
       }else if(error.code === "auth/invalid-email"){
        setError("El correo es incorrecto");
       }}}

        const handleGoogle = async() =>{
        await  logingGoogle();
        navigate("/Home")
        }
        const handleSignIn = () =>{
          navigate("/SignIn")
          }
   return (
       //Imagen logo labNotes
     <div className="App">
        <section id="logoNoteSec">
      <img src={logo} alt="Logo" id="logo"></img>
      </section>
        
        <section>
          <section id="errorSec">
          {error && <p className="error">{error}</p>}
          </section>
       <form id="inputSingIn" onSubmit={handleSubmit}>
       <input type="text" className="input" id="mail" name="email" placeholder='E-mail' onChange={handleChange}></input>
       <input type="password" className="input" id="passwordLogin" name="password" placeholder='Password' onChange={handleChange}></input>
       <section id="buttonSect">
       <button className="buttonHome" id="login">Login</button>
       </section>
       </form>
       </section>
 
        <section id="buttonSect">
        <button className="buttonHome" id="singIn" onClick={handleSignIn}>Sing In</button>
        </section>
 
        <section id="googleAndFace">
        <img src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" alt="go" id="google" type="button"
        onClick={handleGoogle}
        ></img>
        </section>
 
        <section id="foter">
          <p id="copy">&copy;CopyRight Alemar Arizti</p>
          <img src={catlogo} alt="catLogo" id="catlogo"></img>
         </section>
        
     </div>
   );
   }
 
 export default Welcome;
 