const express = require('express')

const app = express()
app.set('port', 3001 || process.env.PORT)
app.set('address','localhost')

//Midelwares para el manejo de recepcion de peticiones http  

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, authentication, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.json())

//obtencion de las rutas (controladores de los enpoints)
app.use(require('./routes/routes'))

//Creacion del servidor
app.listen(app.get('port'),()=>{
    console.log('server in the port ',app.get('port'))
})

