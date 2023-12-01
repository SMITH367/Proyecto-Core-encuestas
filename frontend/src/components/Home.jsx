import React, { useState, useEffect, useRef } from "react";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router";
import socket from "../hooks/useSocket";
import { FetchData } from "./services/fetchData";
import { getBACKENDurl } from "../components/services/getBACKENDurl";
import "./styles/home.css";

//Enviando la respectiva respuesta al administrador
const emitAnswer = (answer, user, question) => {
  const data = JSON.stringify({
    answer: answer,
    user: user,
    question: question,
  });
  socket.emit("answer", data);
};

const Home = () => {
  const dataUser = useUser(null);
  const [question, setQuestion] = useState("Pregunta 1");
  const [answerInfo, setAnswerInfo] = useState("");
  const [personalized, setPersonalized] = useState(false);

  //referencia que se encarga de controlar el estado del boton
  const buttonAnswer = useRef();

  //Estado del mensaje de espera a la siguiente pregunta
  const [questionState, setQuestionState] = useState(true);

  //Recibiendo la informacion de la pregunta
  useEffect(() => {
    socket.on("question", (data) => {
      let questionInfo = JSON.parse(data);
      //Validando si la pregunta va dirigida al usuario en cuestion
      if (questionInfo.user === dataUser.user) {
        setQuestion(questionInfo.question);
        setPersonalized(questionInfo.personalized);
        //mostrando el boton
        if (buttonAnswer.current !== null) buttonAnswer.current.hidden = false;
        //ocultando mensaje de espera
        setQuestionState(true);
      }
    });
  }, [dataUser.user, question]);

  const generateAnswer = async (e, answer, user, question, personalized) => {
    e.preventDefault();
    const fetch = new FetchData(`${getBACKENDurl}/answers`);
    //ocultando el boton
    if (buttonAnswer.current != null) buttonAnswer.current.hidden = true;
    // mostrando el mensaje de espera
    setQuestionState(false);
    //Limpiando el campo de respuesta
    setAnswerInfo("");
    try {
     
      if (personalized) question = `Personalizada ${question}`;
      //Guardando la respuesta en la db
      
      // eslint-disable-next-line
      const dataAnswers = await fetch.FetchDataApi(
        {
          answer: answer,
          user: user,
          question: question,
        },
        "POST"
      );
      
      //Enviando la informacion de la respuesta al administrador
      emitAnswer(answer, user, question);
    } catch {
      alert("Ha ocurrido un error");
    }
  };

  return (
    <>
      <p>.</p>
      <div className="container-home">
      {dataUser.login !== "true" && <Navigate to="/"></Navigate>}
        <p>Hola, {dataUser.user} si sale tu nombre, estas logeado</p>
        {dataUser.login === "true" && (
          <form>
            <h1>{question}</h1>
            <input
              type="text"
              value={answerInfo}
              onChange={(e) => setAnswerInfo(e.target.value)}
            />
            {questionState !== true && (
              <div>Esperando la siguiente pregunta...</div>
            )}
            <button
              ref={buttonAnswer}
              onClick={(e) =>
                generateAnswer(
                  e,
                  answerInfo,
                  dataUser.user,
                  question,
                  personalized
                )
              }
            >
              Enviar respuesta
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export { Home };
