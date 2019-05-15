'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passwordHash = require('password-hash');

const DBAbstraction = require('./DBAbstraction');
const db = new DBAbstraction('mongodb://localhost:27017');

const app = express();

const server = app.listen(42069, function() {
    console.log("Listening at port 42069.");
});

app.use(express.static('public'));

const io = require('socket.io')(server);
const handlebars = require('express-handlebars').create({defaultLayout : 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var numUsers = 0;

// app.get('/', (req, res) => {
//     res.render('socket');
// })

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });
});

app.use(session({ secret: 'keyboard-cat', cookie: { maxAge: 600000 } }));


app.get('/', async (req, res) => {
    res.render('login');
});

app.get('/home', async (req, res) => {
    const username = req.session.username;
    const allRooms = await db.getAllRooms();
    res.render('home', {username:username, allRooms:allRooms});
});

app.get('/room', async (req, res) => {
    console.log('Entering room...');
    const currentRoom = req.session.currentRoom;
    res.render('socket', {roomName: currentRoom});

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
                    req.session.username = username;
                    res.redirect('/home');
                }
                else{
                    //dont add user
                    //redirect to /
                    res.redirect('/');
                }
                //res.send(user);
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
                        req.session.username = user.username;
                        res.redirect('/home');
                    } else{
                        //go back to /
                        res.redirect('/');
                    }
                }
                else{
                    //failed login
                    console.log(`Failed to login with user: ${user.username}`);
                    res.redirect('/');
                }
            }).catch((err) => {
                res.send({error: err});
            })

    } catch (err) {
        console.log(err);
    }
});

app.post('/newRoom', async (req, res) => {
    try {
        const roomName = req.body.roomName;
        //console.log(roomName);
        db.getThisRoom(roomName)
            .then(async function(room){
                if(!room){
                    await db.createRoom(roomName);
                    req.session.currentRoom = roomName;
                    console.log(req.session.currentRoom);
                    res.redirect('/room');
                } 
                else{
                    req.session.currentRoom = roomName;
                    console.log(req.session.currentRoom);
                    console.log('Room Already Existed... Redirecting...');
                    //alert('Room Already Existed... Redirecting...');
                    res.redirect('/room');
                }
            }).catch(function(err) {
                res.send({error:err});
            })
            
    } catch (err) {
        console.log(err);
    }
});

app.post('/existingRoom', async (req, res) => {
    try {
        const roomName = req.body.roomName;
        req.session.currentRoom = roomName;
        res.redirect('/room');
    } catch (err) {
        console.log(err);
    }
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