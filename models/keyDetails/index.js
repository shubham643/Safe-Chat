var db_tables = require('helpers/dbTables');
var mongo = require('mongodb');
var constants = require('helpers/constants');

var keysModel = {

    fetchKey: function(username, keyName, callback) {
        fetchKeyFromKeyName(username, keyName, function(err, result) {
            callback(err, result);
        });
    }
}

function fetchKeyFromKeyName(username, keyName, callback) {
    mongo.connect(constants.DATABASE_SAFE_CHAT_MONGODB_URL, function(err, db){
        const keys_table = db_tables.keys_table;
        if(err){
            console.log(err);
            callback(err, {});
        }

        // searching for required username in the database.
        var query = {
            keyName : keyName,
        };
        var cursor = db.collection(keys_table).find(query).toArray(function(err, result){
            if(err || result.length != 1) {
                db.close();
                callback({'message' : 'Invalid KeyName'}, false);
                return;
            }
            var found = (result[0].encryptAccess).find(function(element) {
                return element == username;
            });
            if(found == username) {
                result = {
                    keyName : keyName,
                    keyID : result[0].keyID
                };
                callback(false, result);
            }
            callback({'message' : 'Username do not have access to encrypt using key: ' + keyName} , false);
        });
    });
}

module.exports = keysModel;