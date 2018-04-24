const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });


Todo.findOneAndRemove({ _id: '5add4c04f08f8e0014a84ab9' }).then((todo) => {
    console.log(todo);
});


Todo.findByIdAndRemove('5add4c03f08f8e0014a84ab8').then((todo) => {
    console.log(todo);
});
