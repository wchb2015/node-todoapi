// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://120.77.46.197:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server!');
    }

    console.log('Connected to MongoDB server!');

    const db = client.db('ToDoApp');

    // db.collection('Todos').insertOne({ text: 'Something to do', completed: false },
    //     (err, result) => {
    //         if (err) {
    //             return console.log('Unable to insert todo', err);
    //         }
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //     });

    // Insert new doc into Users(name,age,location);

    db.collection('User').insertMany([{ name: 'zhangsan', age: 18, location: 'shanghai' },
    { name: 'zhangsan2', age: 28, location: 'shanghai2' }], (err, result) => {

        if (err) {
            return console.log('Unable to insert user', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});