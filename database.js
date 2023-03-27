const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function connect(){
const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
database = client.db('tdtblog');
}

function getDb(){
    if(!database){
        throw{message: 'database connection not established'};
    }
    return database;
}

module.exports={
    connectToDatabase: connect,
    getDb:getDb
};

