// library imports
var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

//local imports 
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
const future = require('./future/future.js');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send(todos);
    })
}, (e) => {
    res.status(400).send(e);
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (todo) {
            return res.send({ todo });
        } else {
            return res.status(404).send();
        }
    }, (e) => { return res.status(400).send() }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/future/:code', (req, res) => {
    var code = req.params.code;
    if (!code) {
        console.log('code is empty ', code);
        return res.status(404).send({ msg: 'code should not be empty' });
    }
    future.getPriceInfo(code).then((info) => {
        if (info) {
            return res.send(info);
        } else {
            return res.status(404).send();
        }
    });
});

app.listen(port, () => {
    console.log(`Started on port: ${port}!`);
});
