// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/FootballApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('FootballApp')

    // Insert Team

    // db.collection('Teams').insertOne({
    //     _id: 'Deke',
    //     name: 'Deke',
    //     password: 'pwd',
    //     bid: 48
    // }, (err, result) => {
    //      if(err) {
    //          return console.log('Unable to insert user.', err)
    //      }
    //      console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // Update Bid

    db.collection('Teams').findOneAndUpdate({
        name: 'Deke'
    }, {
        $set: {bid: 55}
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    // Get Bids

    db.collection('Teams').find().toArray().then((docs)=> {
        console.log(JSON.stringify(docs, undefined, 2));
     }, (err) => {
         console.log('Unable to fetch bids', err)
     });

     // Erase (Re-set) Bids

     db.collection('Teams').updateMany(
        {},
        { $set: { bid: null } },
        { $upsert: false}
     );


//    db.close();
});