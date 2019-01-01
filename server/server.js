require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Create a POST route
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// Create a GET route
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });

});

// Create a GET/todos/:id route
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    // Validate id using isValid or respond with 404 and empty
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    };

    // find the todo associated with the Id
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

// Create a DELETE/todos/:id route
app.delete('/todos/:id', (req, res) => {
    
    var id = req.params.id; // Get the id from the URL

    if (!ObjectId.isValid(id)) {  // Validate the id or return a 404
        return res.status(404).send();
    }

    Todo.findByIdAndDelete(id).then((todo) => {  // Delete by ID
        if(!todo) {
            return res.status(404).send();
        }
    res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

// Create a PATCH (update) route
app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); // Pick allows you to choose which params to strip

    if (!ObjectId.isValid(id)) {  // Validate the id or return a 404
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    };
    
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
  
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
});

// A route requiring authentication (a Private Route)
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// POST /users/login {email, password} **********
    app.post('/users/login', (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);

        User.findByCredentials(body.email, body.password).then((user) => {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(user);
            });
        }).catch((e) => {
            res.status(400).send();
        });
    });

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};