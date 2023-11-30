//Conexion al servidor de comunicacion en tiempo real
import io from "socket.io-client";
// Si estas haciendo solicitudes desde un servidor http: usar el protocolo ws, 
//si estas haciendolas desde un servidor https usar wss
const socket = io("ws://localhost:8080");


export default socket