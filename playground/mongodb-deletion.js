const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://120.77.46.197:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server!');
    }

    console.log('Connected to MongoDB server!');

    const db = client.db('ToDoApp');
    //deleteMany
    // db.collection('User').deleteMany({ name: 'zhangsan' }).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('User').deleteOne({ name: 'zhangsan2' }).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete.
    db.collection('User').findOneAndDelete({ name: 'zhangsan2' }).then((result) => {
        console.log(result);
    });


    client.close();


});