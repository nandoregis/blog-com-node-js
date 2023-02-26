const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://root:dOIYtNr76h2Gf786@projeto-danki.lkavnie.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

module.exports = client;