const express = require('express')
const router = express.Router()

const conexionMysql = require('../database')
const query = require('./querys')


//End point para obtener todos los usuarios registrados
router.get('/users', (req, res) => {
    conexionMysql.query(query.select, (err, rows, fields) => {
        if (!err) {
            res.status(200).send(rows);
        } else {
            console.log(err)
        }
    })
})

//End point para obtener un usuario registrado
router.get('/users/:id', (req, res) => {
    let id = req.params.id
    conexionMysql.query(query.selectByid, [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err)
        }
    })
})

//Endm point para registrar usuarios
router.post('/user', (req, res) => {

    let data = {
        user: req.body.user,
        password: req.body.password
    }
    conexionMysql.query(query.save, [data], (err, rows, fields) => {
        if (err) res.send(err)
        else {
            res.json("User added");
        }
    })
})

//Endpoint para modificar un usuario
router.put('/users/:id', (req, res) => {
    let data = req.body
    let id = req.params.id
    conexionMysql.query(query.update, [data, id], (err, rows, fields) => {
        if (err) res.send(err);
        else {
            res.json("Update complete")
        }
    })
})

//Endpoint para eliminar un usuario
router.delete('/users/:id', (req, res) => {

    let data = req.params.id
    conexionMysql.query(query.clear, [data], (err, rows, fields) => {
        if (err) res.send(err)
        else {
            res.json("Product deleted");
        }
    })
})

// Basico Login sistem 
router.post('/login/:id', (req, res) => {

    let id = req.params.id
    conexionMysql.query(query.selectByid, [id], (err, rows, fields) => {
        if (!err) {
            // Si el user existe continua
            if (rows.length > 0) {
                if (rows[0].password === req.body.password) {
                    conexionMysql.query(query.setLogin, [1, id], (err, rows, fields) => {
                        if (err) console.log(err)
                    })
                    res.send({
                        user: rows[0].user
                    })
                } else {
                    res.send(403)
                }
            } else {
                res.sendStatus(403)
            }

        } else {
            res.sendStatus(500)
        }
    })

})


//Creacion y guardado de respuestas
router.post('/answers', (req, res) => {

    //Se reciben los datos enviados por el front con la siguiente informacion
    let data = {
        user: req.body.user,
        answer: req.body.answer,
        question: req.body.question
    }
    console.log(data)
    conexionMysql.query("select user, question from respuestas", [data], (err, rows, fields) => {

        if (err) res.send(err)

        else {
            let existence = false
            let updateQuery =""

            rows.forEach(element => {
                if (element.user === data.user && element.question === data.question){
                    existence = true
                    updateQuery = query.updateAnswer
                    console.log("Llegando 1")
                }
                else if(element.user === data.user && data.question.includes("Personalizada") === true && element.question.includes("Personalizada")===true){
                    existence = true
                    console.log(data.question.includes("Personalizada"), data.question)
                    updateQuery = query.updatePersonalizedAnswer
                    console.log("Llegando 2")
                }
            });

            if (existence) {
                conexionMysql.query(updateQuery, [data.answer, data.question, data.user], (err, rows, fields) => {
                    if (err) res.send(err)
                    else {
                        res.json("Answer updated");
                    }
                })
            } else {
                console.log("Creando nuevo")
                conexionMysql.query(query.saveAnswer, [data], (err, rows, fields) => {
                    if (err) res.send(err)
                    else {
                        res.json("Answer added");
                    }
                })
            }
        }
    })

})

//Obtencion de todas las respuestas 
router.get('/answers', (req, res) => {
    conexionMysql.query(query.selectAnswers, (err, rows, fields) => {
        if (!err) {
            res.status(200).send(rows);
        } else {
            console.log(err)
        }
    })
})

router.post('/logout/:id', (req, res) => {
    conexionMysql.query(query.setLogin, [0, req.params.id], (err, rows, fields) => {
        if (err) console.log(err)
        else {
            res.json("logged out")
        }
    })
})


module.exports = router