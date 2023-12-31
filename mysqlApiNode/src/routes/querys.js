//Archivo con las consultas sql que se haran a la DB

const select = "SELECT * FROM usuarios";
const selectAnswers = "SELECT RespuestasConNumeros.*, usuarios.user AS usuario FROM ( SELECT respuestas.*, ROW_NUMBER() OVER (PARTITION BY usuarios.user ORDER BY date DESC) AS numero_respuesta FROM respuestas INNER JOIN usuarios ON usuarios.user = respuestas.user WHERE usuarios.login = 1 ) AS RespuestasConNumeros JOIN usuarios ON RespuestasConNumeros.user = usuarios.user WHERE numero_respuesta <= 5 ORDER BY date DESC;";
const selectByid = "SELECT * FROM usuarios WHERE user = ?";
const save = "INSERT INTO usuarios SET ?";
const saveAnswer = "INSERT INTO respuestas SET ?";
const updateAnswer = "UPDATE respuestas SET answer = ?, date = CURRENT_TIMESTAMP WHERE  question = ? AND  user = ? "
const updatePersonalizedAnswer = "UPDATE respuestas SET answer = ?, date = CURRENT_TIMESTAMP, question=? WHERE user = ? AND question LIKE '%Personalizada%'"
const update = "UPDATE usuarios SET ? WHERE user = ? ";
const setLogin = "UPDATE usuarios SET login=? WHERE user = ? ";
const clear = "DELETE FROM usuarios WHERE user = ?";

module.exports = {
    select,
    selectAnswers,
    selectByid,
    save,
    saveAnswer,
    updateAnswer,
    updatePersonalizedAnswer,
    update,
    clear,
    setLogin,
    

}