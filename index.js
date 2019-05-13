'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const DBAbstraction = require('./DBAbstraction');
const db = new DBAbstraction('mongodb://localhost:27017');

const app = express();

const server = app.listen(42069, function() {
    console.log("Listening at port 42069.");
});

app.use(express.static('public'));

const io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(session({ secret: 'keyboard-cat', cookie: { maxAge: 600000 } }));

var numUsers = 0;

app.get('/', (req, res) => {
    res.render('index');
})

var people = {};
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on("join", function(name){
		people[socket.id] = name;
		io.sockets.emit("update", name + " has joined the server.")
		io.sockets.emit("update-people", people);
    });
    
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

    socket.on('disconnect', () => {
        console.log(people[socket.id] + ' disconnected');
        io.sockets.emit('user left', {
            username: people[socket.id]
        });
    });
});

app.use((req, res) => {
    res.status(404).send(`<h2>Oopsie daisy!</h2><p>Sorry ${req.url} cannot be found.</p>`);
});



// db.init()
//     .then(() => {
//         app.listen(42069, () => console.log(`The server is up and running...`));
//     })
//     .catch(err => {
//         console.log("Problem setting up the database.");
//         console.log(err);
//     });