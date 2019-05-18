import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";

var socket = io.connect('http://localhost:42069');
var message = document.getElementById('message');
var username = document.getElementById('username');
var button = document.getElementById('sendMessage');
var output = document.getElementById('output');
var roomName = document.getElementById('roomName');
document.getElementById('message').value = "";


socket.emit("join_room", {username:username.value, roomName:roomName.value});

button.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        username: username.value,
        roomName: roomName.value
    });
    document.getElementById('message').value = "";
});
socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>&nbsp;' + data.username + ': </strong>' + data.message + '</p>';
    if (data.sentiment >= 0)
    {
        output.style.backgroundColor = "#0000" + (256*data.sentiment).toString(16);
    }
    else
    {
        output.style.backgroundColor = "#" + (-256*data.sentiment).toString(16) + "0000";
    }
})

socket.on('newUser', (data) => {
    output.innerHTML += '<p> ' + data + '</p>';
})

socket.on('userLeft', (data) => {
    output.innerHTML += '<p> ' + data + '</p>';
})