'use strict';

// Variable que envia el evento al servidor
const socket = io();


// Elementos del DOM
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');


// Código 1 y 2 son iguales
// Código 1
// btn.addEventListener('click', () => console.log({
//     username: username.value,
//     message: message.value
// }));

// Código 2
// btn.addEventListener('click', () => console.log(username.value, message.value));

// Emite un evento al servidor, en este caso el click del botón y lleva los datos
btn.addEventListener('click', () => {
    console.log(username.value, message.value);
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    });
});

// Emite un evento al servidor cuando alguien está tecleando un mensaje del chat.
message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);

});


// Escuchando la respuesta al evento click (viene del servidor)
socket.on('chat:message-server', (data) => {
    // console.log(data);
    actions.innerHTML = ''; // Limpia lo del usuario está typing a message
    output.innerHTML += `
        <p>
            <strong>${data.username}</strong>: ${data.message}
        </p>
    `;
})

// Escuchando la respuesta al evento typing (viene del servidor)
socket.on('chat:typing-server', (data) => {
    // console.log(data);
    actions.innerHTML = `
        <p><em>
            ${data} is typing a message
        </em></p>
    `
})