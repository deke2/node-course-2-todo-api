// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp')
    

    // db.collection('Users').deleteMany({name: 'Deke'}).then((result) => {
        //  console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5bfafeede1b3fecbaed12c02')}).then((result) => {
         console.log(JSON.stringify(result, undefined, 2));
    });

//    db.close();
});