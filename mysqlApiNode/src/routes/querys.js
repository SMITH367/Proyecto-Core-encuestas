//Archivo con las consultas sql que se haran a la DB

const select = "SELECT * FROM usuarios";
const selectAnswers = "SELECT * FROM respuestas ORDER BY date desc";
const selectByid = "SELECT * FROM usuarios WHERE user = ?";
const save = "INSERT INTO usuarios SET ?";
const saveAnswer = "INSERT INTO respuestas SET ?";
const update = "UPDATE usuarios SET ? WHERE code = ? ";
const clear = "DELETE FROM usuarios WHERE code = ?";

module.exports = {
    select,
    selectAnswers,
    selectByid,
    save,
    saveAnswer,
    update,
    clear

}