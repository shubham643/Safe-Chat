var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/safe-chat";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

module.exports = MongoClient;
