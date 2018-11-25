// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/FootballApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('FootballApp')

    db.collection('Teams').insertOne({
        _id: 'Deke',
        password: 'pwd',
        bid: 48
    }, (err, result) => {
         if(err) {
             return console.log('Unable to insert user.', err)
         }
         console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});