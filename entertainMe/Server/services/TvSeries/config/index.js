const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'entertainMe';

// Create a new MongoClient
const client = new MongoClient(url, {
    useUnifiedTopology: true
});

// Use connect method to connect to the Server
client.connect()
const db = client.db(dbName)
module.exports = db
