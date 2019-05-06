'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const session = require('express-session');

const DBAbstraction = require('./DBAbstraction');
const db = new DBAbstraction('mongodb://localhost:27017');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({ secret: 'keyboard-cat', cookie: { maxAge: 600000 } }));

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