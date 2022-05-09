import './App.css';
//Funciones react
import {Route, Routes,  } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";

//Rutas
import SignIn from './SignIn';
import Home from './Home';
import Welcome from './Welcome';
import EditNote from './Funciones/EditNote'

function App() {
  return (
    <div>
<AuthProvider>
<Routes>
    <Route path="/" element={ <Welcome/> }/>
    <Route path="/SignIn" element={<SignIn/>} />
    <Route path="/Home" element={<Home/>} />
    <Route path="/EditNote/:id" element={<EditNote/>} />
 
    </Routes>
</AuthProvider>
 </div>    
    
  );
}

export default App;
