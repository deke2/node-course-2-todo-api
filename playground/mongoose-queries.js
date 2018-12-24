const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5c2010a291e37c0f06dea51911';

// if (!ObjectId.isValid(id)) {
//     console.log('ID not valid.');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found.');
//     }
//     console.log('Todo by ID:', todo);
// }).catch((e) => console.log(e));

var goodID = '5c071d8569547b0ed2cf5bbf';
var noID = '6c071d8569547b0ed2cf5bbf';

User.findById(goodID).then((user) => {
    if(!user) {
        return console.log('User not found.');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));

User.findById(noID).then((user) => {
    if(!user) {
        return console.log('User not found.');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));