import React, { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
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
  const dataUser = useUser();
  const [question, setQuestion] = useState("Primera pregunta");
  const [answerInfo, setAnswerInfo] = useState();

  //Recibiendo la informacion de la pregunta
  useEffect(() => {
    socket.on("question", (data) => {
      let questionInfo = JSON.parse(data);

      //Validando si la pregunta va dirigida al usuario en cuestion
      if (questionInfo.user === dataUser.user) {
        setQuestion(questionInfo.question);
      }
    });
  }, [question, answerInfo]);

  const generateAnswer = async (answer, user, question) => {
    //Limpiando el campo de respuesta
    setAnswerInfo("");

    const fetch = new FetchData(`${getBACKENDurl}/answers`);

    try {
      //Guardando la respuesta en la db
      const dataUser = await fetch.FetchDataApi(
        {
          answer: answer,
          user: user,
          question: question,
        },
        "POST"
      );

      console.log(dataUser);

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
        <p>Hola, {dataUser.user} si sale tu nombre, estas logeado</p>
        {dataUser.login === "true" && (
          <>
            <h1>{question}</h1>
            <input
              type="text"
              value={answerInfo}
              onChange={(e) => setAnswerInfo(e.target.value)}
            />
            <button
              onClick={(e) =>
                generateAnswer(answerInfo, dataUser.user, question)
              }
            >
              Enviar respuesta
            </button>
          </>
        )}
      </div>
    </>
  );
};
export { Home };
