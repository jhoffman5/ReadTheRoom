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

            games = await db.collection('Users').find().toArray();
            client.close();
        } catch(err){
            console.log('There was a problem finding users');
            throw err;
        }

        return users;
    }

}
module.exports = DBAbstraction;