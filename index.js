const status = process.env.NODE_ENV;

if (status !== "production") {
    require('dotenv').config();
}
console.log('SERVER STATUS:', status);

// Declarations
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const port = process.env.PORT || 5000;
const SocketIO = require('socket.io');


console.log('port:', port)

const app = express();


// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Server Listening
const server = app.listen(port, () => console.log('Server listening on port:', port));


// Declarar Sockets con el server
const io = SocketIO(server);

// Configurar Sockets io.escucharevento(nombreevento, () => {})
// Escuchando el evento click del boton
io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.on('chat:message', (data) => {
        // console.log(data);
        io.sockets.emit('chat:message-server', data); // Emitiendo a todos incluyendome
    })

    // Escuchando el evento typing(cuando alguien está tecleando un mensaje)
    socket.on('chat:typing', data => {
        // console.log(data);
        socket.broadcast.emit('chat:typing-server', data) //Emitiendo a todos excepto a mí
    });

})