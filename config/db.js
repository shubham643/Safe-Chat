var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/safe-chat";

mongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

module.exports = mongoClient;
