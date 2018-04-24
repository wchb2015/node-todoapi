// library imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

//local imports 
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo) {
            return res.send({ todo });
        } else {
            return res.status(404).send();
        }
    }, (e) => { return res.status(400).send() }).catch((e) => {
        res.status(400).send();
    });
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completed = true;
        body.completedAt = new Date().getTime();
    }

    if (_.isBoolean(body.completed) && !body.completed) {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(401).send();
        }

        res.send({ todo });
    }).catch((e) => {
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


app.post('/users', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);

    // var user = new User({
    //     email: body.email,
    //     password: body.password
    // });

    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        console.log(e);
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started on port: ${port}!`);
});
