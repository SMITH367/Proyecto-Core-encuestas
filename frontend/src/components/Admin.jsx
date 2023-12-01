import React, { useState, useEffect } from "react";
import socket from "../hooks/useSocket";
import { FetchData } from "./services/fetchData";
import { getBACKENDurl } from "./services/getBACKENDurl";
import "./styles/home.css";

//Enviando pregunta hacia el usuario que le corresponde
const emitQuestion = (question, user, personalized = false) => {
  const data = JSON.stringify({
    question: question,
    user: user,
    personalized: personalized,
  });

  socket.emit("question", data);
};

const Admin = () => {
  const [usersLoggedIn, setusersLoggedIn] = useState([]);
  const [answers, setAnswers] = useState([]);

  //Funcion para actualizar la informacion de usuarios activos y sus respectivas respuestas
  const getLogedUsersAndAnswers = async () => {
    try {
      const fetch = new FetchData(`${getBACKENDurl}/answers`);
      const data = await fetch.FetchDataApiGet();
      const users = data.map((el) => el.user);
      let usersCleaned = Array.from(new Set(users));
      setusersLoggedIn(usersCleaned);
      setAnswers(data);
    } catch {
      alert("Ha ocurrido un error");
    }
  };

  //Recibiendo la informacion de los usuarios que se vayan logeando
  useEffect(() => {
    socket.on("message", (text) => {
      getLogedUsersAndAnswers();
    });
  }, [usersLoggedIn]);

  //Recibiendo las respuestas en tiempo real de los usuarios
  useEffect(() => {
    socket.on("answer", async (data) => {
      //Obteniendo las respuestas de los usuarios para mostrarlas.
      getLogedUsersAndAnswers();
    });
  }, []);

  //Obteniendo informacion de respuestas al cargar la pagina
  useEffect(() => {
    getLogedUsersAndAnswers();
  }, []);

  //Mostrando la informacion de usuarios logeados y de sus respectivas respuestas
  //NOTA: Las respuestas pueden ser mostradas como estan (es decir se recibe y se muestra) o se pueden mostrar las que se solicitan al back

  //Pregunta personalizada
  const personalizedQuestion = (user) => {
    //Agregar medio personalizado para recibir las preguntas
    const question = prompt("Ingrese la pregunta personalizada");
    emitQuestion(question, user, true);
  };

  return (
    <>
      <p>.</p>
      <div className="container-home">
        <p>Probando</p>
        <section className="main-admin-panel">
          <article className="main-admin-panel-element">
            <h1 className="center">Usuarios activos</h1>
            {usersLoggedIn.map((el) => (
              <div key={el}>
                <div  className="element-cont">
                  <div className="el">
                    <p>{el}</p>
                    <button onClick={(e) => emitQuestion("Pregunta 1", el)}>
                      pregunta 1
                    </button>
                    <button onClick={(e) => emitQuestion("Pregunta 2", el)}>
                      pregunta 2
                    </button>
                    <button onClick={(e) => emitQuestion("Pregunta 3", el)}>
                      pregunta 3
                    </button>
                    <button onClick={(e) => emitQuestion("Pregunta 4", el)}>
                      pregunta 4
                    </button>
                    <button onClick={(e) => personalizedQuestion(el)}>
                      Pregunta personalizada
                    </button>
                  </div>
                  <div className="el">
                    <h2 className="center">Respuestas</h2>
                    <section className="answers-cont">
                      {answers.map(
                        (answer, id) =>
                          answer.user === el &&
                          answer.question === "Pregunta 1" && (
                            <div key={id} className="answer">
                              {`${answer.question}:  ${answer.answer}`} <br />
                            </div>
                          )
                      )}
                      {answers.map(
                        (answer,id) =>
                          answer.user === el &&
                          answer.question === "Pregunta 2" && (
                            <div key={id} className="answer">
                              {`${answer.question}:  ${answer.answer}`} <br />
                            </div>
                          )
                      )}
                      {answers.map(
                        (answer,id) =>
                          answer.user === el &&
                          answer.question === "Pregunta 3" && (
                            <div key={id} className="answer">
                              {`${answer.question}:  ${answer.answer}`} <br />
                            </div>
                          )
                      )}
                      {answers.map(
                        (answer, id) =>
                          answer.user === el &&
                          answer.question === "Pregunta 4" && (
                            <div key={id} className="answer">
                              {`${answer.question}:  ${answer.answer}`} <br />
                            </div>
                          )
                      )}
                      {answers.map(
                        (answer,id) =>
                          answer.user === el &&
                          answer.question.includes("Personalizada") ===
                            true && (
                            <div key={id} className="answer">
                              {`${answer.question}:  ${answer.answer}`} <br />
                            </div>
                          )
                      )}
                    </section>
                  </div>
                </div>
              </div>
            ))}
          </article>
        </section>
      </div>
    </>
  );
};
export { Admin };
