const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

// Controlador de conexiones en tiempo real para usuarios y administrador. 

io.on('connection', (socket) => {

    console.log('a user connected' + socket.id.substr(0, 2));

    //Notifica al administrador cuando un usuario se ha logeado 
    socket.on('message', (message) => {
        console.log(`${message}`);
        io.emit('message', `${message}`);
    });

    //Envia la preguta al respectivo usuario
    socket.on('question', (message) => {
        console.log(`${socket.id.substr(0,2)} said ${message}`);
        io.emit('question', `${message}`);
    });

    //Envia las respuestas al administrador
    socket.on('answer', (message) => {
        console.log(`${socket.id.substr(0,2)} said ${message}`);
        io.emit('answer', `${message}`);
    });



});

http.listen( process.env.PORT || 8080, () => console.log('listening on http://localhost:8080'));

