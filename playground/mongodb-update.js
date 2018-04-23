const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://120.77.46.197:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server!');
    }

    console.log('Connected to MongoDB server!');

    const db = client.db('ToDoApp');


    db.collection('User').findOneAndUpdate({ _id: new ObjectID("5adb83984a2d9c1a2625f130") }, {
        $set: {
            name: 'wangchongbei'
        }
    }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });

    client.close();


});