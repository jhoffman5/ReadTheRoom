'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const session = require('express-session');
const passwordHash = require('password-hash');

const DBAbstraction = require('./DBAbstraction');
const db = new DBAbstraction('mongodb://localhost:27017');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({ secret: 'keyboard-cat', cookie: { maxAge: 600000 } }));

app.get('/', async (req, res) => {
    res.sendFile('public/login.html', {root: __dirname});
});

app.get('/home', async (req, res) => {
    res.sendFile('public/home.html', {root: __dirname});
});

app.post('/newUser', async (req, res) => {
    try{
        var username = req.body.NewUsername;
        var password = req.body.NewPassword;
        password = passwordHash.generate(password);

        db.findUser(username)
            .then(async function(user){
                if(!user){ //if no user with than name exists. put this user into the db
                    await db.createUser(username, password);
                    //assign username/user's id to session
                }
                else{
                    //dont add user
                    //redirect to /
                }
                res.send(user);
        }).catch(function(err) {
            res.send({error: err});
        })

    } catch(err) {
        console.log(err);
    }
});

app.post('/loginUser', async (req, res) => {
    try{
        var username = req.body.loginUsername;
        var password = req.body.loginPassword;


        db.findUserWithPass(username, password) 
            .then(async (user) =>{
                if(user){
                    //login
                    if(passwordHash.verify(password, user.password)){
                        console.log(`Successful login with user: ${user.username}`);
                        //set session username to the user.username
                        //res.render('public/home.html');
                        res.sendFile('public/home.html', {root: __dirname});
                    } else{
                        //go back to /
                        res.redirect("/");
                    }
                }
                else{
                    //failed login
                    console.log(`Failed to login with user: ${user.username}`);
                }
        }).catch((err) => {
            res.send({error: err});
        })

    } catch (err) {
        console.log(err);
    }
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