const MongoClient = require('mongodb').MongoClient;

class DBAbstraction {
    constructor(dbUrl) {
        this.dbUrl = dbUrl;
    }

    init() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.dbUrl, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    reject(err);
                } else {
                    client.close();
                    resolve();
                }
            });
        });
    }

    async createUser(username, password){
        try{
            const newUser = {
                username : username,
                password : password
            };

            const client = await MongoClient.connect(this.dbUrl, {useNewUrlParser: true});
            const db = client.db('ReadTheRoomDB');
               
            await db.collection('Users').insertOne(newUser);
            client.close();
        }
        catch(err){
            console.log('There was a problem inserting into Users collection');
            throw err;
        }
    }

    async getAllUsers(){
        let users = [];
        try{
            const client = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true });
            const db = client.db('ReadTheRoomDB');

            users = await db.collection('Users').find().toArray();
            client.close();
        } catch(err){
            console.log('There was a problem finding users');
            throw err;
        }

        return users;
    }

    async findUser(findThisUsername){
        let user = null;
        try{
            const client = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true });
            const db = client.db('ReadTheRoomDB');

            user = await db.collection('Users').findOne({"username": findThisUsername});
            client.close();
        } catch(err){
            console.log('There was a problem finding this user');
            throw err;
        }
        return user;
    }

    async findUserWithPass(username, password){
        let user = null;
        try{
            const client = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true });
            const db = client.db('ReadTheRoomDB');

            user = await db.collection('Users').findOne({"username": username});
            client.close();
        } catch(err){
            console.log('There was an error with the database while logging in');
            throw err;
        }
        return user;
    }

    async createRoom(roomName) {
        try{
            const newRoom ={
                roomName: roomName
            };

            const client = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true });
            const db = client.db('ReadTheRoomDB');

            await db.collection('Rooms').insertOne(newRoom);
            client.close();
        } catch (err) {
            console.log('There was an error creating a new room');
            throw err;
        }
    }

    async getAllRooms() {
        let allRooms = [];
        try {
            const client = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true });
            const db = client.db('ReadTheRoomDB');

            allRooms = await db.collection('Rooms').find().toArray();
            //console.log(allRooms);
            client.close();
        } catch (err) {
            console.log('There was an error getting all rooms');
            throw err;
        }

        return allRooms;
    }

    async getAllRoomNames() {
        let allRoomNames = [];
        let result = [];
        try {
            const client = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true });
            const db = client.db('ReadTheRoomDB');
            allRoomNames = await db.collection('Rooms').find({},{projection:{ _id: 0 }}).toArray();
            result = await allRoomNames.map(({ roomName }) => roomName);
            client.close();
        } catch (err) {
            console.log('There was an error getting all rooms');
            throw err;
        }

        return result;
    }

    async getThisRoom(roomName) {
        let room = null;
        try {
            const client = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true });
            const db = client.db('ReadTheRoomDB');

            room = await db.collection('Rooms').findOne({'roomName':roomName});
            client.close();
        } catch (err) {
            console.log(`There was a problem getting room: ${roomName}`);
            throw err;
        }
        return room;
    }
}
module.exports = DBAbstraction;