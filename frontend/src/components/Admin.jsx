import React, { useState, useEffect, useRef } from "react";
import socket from "../hooks/useSocket";
import { FetchData } from "./services/fetchData";
import { getBACKENDurl } from "./services/getBACKENDurl";
import "./styles/home.css";

//Enviando pregunta hacia el usuario que le corresponde
const emitQuestion = (question, user) => {
  const data = JSON.stringify({ question: question, user: user });
  socket.emit("question", data);
};

const Admin = () => {

  const [usersLoggedIn, setusersLoggedIn] = useState([]);
  const [answers, setAnswers] = useState([]);
 
  //Recibiendo la informacion de los usuarios que se vayan logeando
  useEffect(() => {
    socket.on("message", (text) => {
      const getLogedUsers = async () =>{
        try {
          const fetch = new FetchData(`${getBACKENDurl}/answers`);
          const data = await fetch.FetchDataApiGet();
          const users = data.map((el) => el.user);
          let usersCleaned = Array.from(new Set(users));
    
          console.log(usersCleaned);
          setusersLoggedIn(usersCleaned);
          setAnswers(data);
        } catch {
          alert("Ha ocurrido un error");
        }
    
      }
      getLogedUsers()
    });

   
      }, [usersLoggedIn]);

  useEffect( () => {
    const loadMessages = async () => {
      try {
        const fetch = new FetchData(`${getBACKENDurl}/answers`);
        const data = await fetch.FetchDataApiGet();
        const users = data.map((el) => el.user);
        let usersCleaned = Array.from(new Set(users));
  
        console.log(usersCleaned);
        setusersLoggedIn(usersCleaned);
        setAnswers(data)
      
      } catch {
        alert("Ha ocurrido un error");
      }
    }
    loadMessages()
  }, []);

  //Recibiendo las respuestas de los usuarios
  useEffect(() => {
    socket.on("answer", async (data) => {

      //Obteniendo las respuestas de los usuarios para mostrarlas.
      try {
        const fetch = new FetchData(`${getBACKENDurl}/answers`);
        const data = await fetch.FetchDataApiGet();
        const users = data.map((el) => el.user);
        let usersCleaned = Array.from(new Set(users));

        console.log(usersCleaned);
        setusersLoggedIn(usersCleaned);
        setAnswers(data);
      } catch {
        alert("Ha ocurrido un error");
      }
    });
  }, []);

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
            {usersLoggedIn.map((el, id) => (
              <>
                <div key={id} className="element-cont">
                  <div className="el">
                    <p>{el}</p>
                    <button onClick={(e) => emitQuestion("Pregunta 2", el)}>
                      pregunta 2
                    </button>
                    <button onClick={(e) => emitQuestion("Pregunta 3", el)}>
                      pregunta 3
                    </button>
                    <button onClick={(e) => emitQuestion("Pregunta 4", el)}>
                      pregunta 4
                    </button>
                    
                  </div>
                  <div className="el">
                      <h2 className="center">Respuestas</h2>
                      {answers.map(
                        (answer) =>
                          answer.user === el &&
                        <div>{`${answer.question} :  ${answer.answer}`} <br /></div>                          
                      )}
                    </div>
                </div>
              </>
            ))}
          </article>

          {/* <article  >
            <h1>Respuestas a las preguntas</h1>
            
              <article ref={reference} className="element-container reverse">
                
              </article>
           
          </article> */}
        </section>
      </div>
    </>
  );
};
export { Admin };
