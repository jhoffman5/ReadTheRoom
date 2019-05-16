var socket = io.connect('http://localhost:42069');
var message = document.getElementById('message');
var username = document.getElementById('username');
var button = document.getElementById('sendMessage');
var output = document.getElementById('output');
var roomName = document.getElementById('roomName');


socket.emit("joinRoom", {username:username.value, roomName:roomName.value});

button.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        username: username.value,
        roomName: roomName.value
    });
});
socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.username + ':</strong>' + data.message + '</p>';
})

socket.on('newUser', (data) => {
    output.innerHTML += '<p> ' + data + '</p>';
})