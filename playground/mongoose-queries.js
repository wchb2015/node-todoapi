const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

var id = '6adbb71925efc51d2e4bf17a111';

if (!ObjectID.isValid(id)) {
    return console.log(' id is not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});
console.log('------------------');
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});
console.log('------------------');
Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found!');
    }
    console.log('Todo', todo);
}).catch((e) => {
    console.log(e);
});