import { createContext } from "react";
// Creacion del contexto para gestionar la sesion del usuario
const Usercontext = createContext({
    
    login: false,
    user: null,


})  

export {
    Usercontext
}