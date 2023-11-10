import React, { useState, useEffect, useRef } from "react";
import socket from "../hooks/useSocket";
import {FetchData} from "./services/fetchData"
import { getBACKENDurl } from "./services/getBACKENDurl";
import "./styles/home.css";

//Enviando pregunta hacia el usuario que le corresponde
const emitQuestion = (question, user) => {
  const data = JSON.stringify({ question: question, user: user });
  socket.emit("question", data);
};

const Admin = () => {

  //Obteniendo los usuarios que se han logeado del localstorage, de no hacer, se inicializa un array Vacio
  let usersLoggedSaved =
    localStorage.getItem("sesions") !== null
      ? localStorage.getItem("sesions").split(",")
      : [];
  
  const [loggedUsers, setLoggedUsers] = useState(usersLoggedSaved);
  let answer = []
  //Referencia al elemento al cual se le van a ir agregando la informacion de las respuestas
  const reference = useRef()

  //Recibiendo la informacion de los usuarios que se vayan logeando
  useEffect(() => {
    socket.on("message", (text) => {
      setLoggedUsers([...loggedUsers, text]);
      localStorage.setItem("sesions", [...loggedUsers, text]);
      let data = localStorage.getItem("sesions");
      console.log(data);
    });
    
  }, [loggedUsers]);

  //Recibiendo las respuestas de los usuarios
  useEffect(()=>{
    socket.on("answer", async (data) => {
      //Anexando la ultima respuesta que llego. 
      let answerInfo = JSON.parse(data);

      let answerData = `El usuario ${answerInfo.user} ha respondido la pregunta ${answerInfo.question} : ${answerInfo.answer} <br/>`

      answer.push(answerData)
      localStorage.setItem("answers", answer)
      let element =  document.createElement("div")
      element.innerHTML = answerData
      reference.current.appendChild(element)

      console.log(data.answer)

      //Obteniendo las respuestas de la db ordendas por fecha reciente a mas antigua
      //El desarrollador frontend puede usar la informacion como guste para mostrar la informacion
      try{
        const fetch = new FetchData(`${getBACKENDurl}/answers`);
        const data = await fetch.FetchDataApiGet()
        console.log(data)
    
      } catch {
        alert("Ha ocurrido un error")
      }

    },[answer]);
  })
  
//Mostrando la informacion de usuarios logeados y de sus respectivas respuestas
//NOTA: Las respuestas pueden ser mostradas como estan (es decir se recibe y se muestra) o se pueden mostrar las que se solicitan al back 
  return (
    <>
      <p>.</p>
      <div className="container-home">
        <p>Probando</p>
        <section className="main-admin-panel">
          <article className="main-admin-panel-element">
            <h1 className="center">Usuarios activos</h1>
            {loggedUsers.length > 0 && (
              <article className="element-container-users center">
                {loggedUsers.map((el, id) => (
                  <div key={id} className="element">
                    <p>{el}</p>
                    <button onClick={(e) => emitQuestion(1, el)}>
                      pregunta 1
                    </button>
                    <button onClick={(e) => emitQuestion(2, el)}>
                      pregunta 2
                    </button>
                    <button onClick={(e) => emitQuestion(3, el)}>
                      pregunta 3
                    </button>
                  </div>
                ))}
              </article>
            )}
          </article>
          <article  >
            <h1>Respuestas a las preguntas</h1>
            
              <article ref={reference} className="element-container reverse">
                
              </article>
           
          </article>
     
        </section>
      </div>
    </>
  );
};
export { Admin };
