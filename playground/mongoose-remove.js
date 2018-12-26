const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.deleteMany({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndDelete - matches the very first document and removes and gives object back
// Todo.findByIdAndDelete - matches the ID and reviews the doc; gives back the doc.

Todo.findByIdAndDelete('5c22b887150ea5095b26648e').then((todo) => {
    console.log(todo);
});