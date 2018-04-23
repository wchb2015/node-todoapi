const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://120.77.46.197:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server!');
    }

    console.log('Connected to MongoDB server!');

    const db = client.db('ToDoApp');

    db.collection('Todos').find(
        { _id: new ObjectID('5adb7835c72367171220d0a5') }
    ).toArray().then(docs => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });


    client.close();
});