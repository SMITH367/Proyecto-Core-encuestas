//Archivo con la configuracion para la conexion a la db
const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"proyectoencuestas"
})
conexion.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("conected to the database")
    }
})
module.exports = conexion