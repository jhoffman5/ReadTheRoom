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
        var col = Math.floor(25.6*data.sentiment).toString(16);
        while (col.length < 2)
        {
            col = "0"+col;
        }
        output.style.backgroundColor = "#0000" + col;
    }
    else
    {
        var col = Math.floor(-25.6*data.sentiment).toString(16);
        while (col.length < 2)
        {
            col = "0"+col;
        }
        output.style.backgroundColor = "#" + col + "0000";
    }
    console.log(data);
})

socket.on('newUser', (data) => {
    output.innerHTML += '<p> ' + data + '</p>';
})

socket.on('userLeft', (data) => {
    output.innerHTML += '<p> ' + data + '</p>';
})