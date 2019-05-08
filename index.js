'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const DBAbstraction = require('./DBAbstraction');
const db = new DBAbstraction('mongodb://localhost:27017');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({ secret: 'keyboard-cat', cookie: { maxAge: 600000 } }));

var numUsers = 0;

app.get('/', (req, res) => {
    res.render('chat')
})

io.on('connection', (socket) => {
    var addedUser = false;

    console.log('New user connected')

    socket.on('new message', (data) => {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message, data
        });
    });
});

app.use((req, res) => {
    res.status(404).send(`<h2>Oopsie daisy!</h2><p>Sorry ${req.url} cannot be found.</p>`);
});

db.init()
    .then(() => {
        app.listen(42069, () => console.log(`The server is up and running...`));
    })
    .catch(err => {
        console.log("Problem setting up the database.");
        console.log(err);
    });