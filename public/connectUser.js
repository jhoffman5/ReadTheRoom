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
    output.innerHTML += '<p style="background-color:rgb('+ data.redVal +','+data.greenVal+','+data.blueVal+'); padding=0"><strong>&nbsp;' + data.username + ': </strong>' + data.message + '</p>';
})

socket.on('newUser', (data) => {
    output.innerHTML += '<p> ' + data + '</p>';
})

socket.on('userLeft', (data) => {
    output.innerHTML += '<p> ' + data + '</p>';
})