// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')
    
    // db.collection('Todos').findOneAndUpdate({
    //     text: 'Eat lunch'
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // });

    db.collection('Users').findOneAndUpdate({
        name: 'Deke'
    }, {
        $set: {name: 'Milo'},
        $inc: {age: 1},
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });


//    db.close();
});