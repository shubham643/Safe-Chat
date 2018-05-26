var db_tables = require('helpers/dbTables');
var mongo = require('mongodb');
var constants = require('helpers/constants');
var actions = require('helpers/actions');

var keysModel = {

    fetchKey: function(username, keyName, action, callback) {
        fetchKeyFromKeyName(keyName, function(err, result) {

            if(err) {
                callback({'message' : 'Error in mongoDB query'}, false);
            }
            if(result.length != 1) {
                console.log("length of result is " + result.length);
                callback({'message' : 'Invalid KeyName'}, false);
            }
            else {
                var found;
                if(action == actions.ENCRYPT) {
                    found = (result[0].encryptAccess).find(function(element) {
                        return element == username;
                    });
                }
                else if(action == actions.DECRYPT) {
                    found = (result[0].decryptAccess).find(function(element) {
                        return element == username;
                    });
                }
                else {
                    callback({message : 'invalid action performed'}, false);
                }
                if(found == username) {
                    result = {
                        keyName : keyName,
                        keyID : result[0].keyID
                    };
                    callback(false, result);
                }
                else {
                    callback({'message' : 'Username do not have access to perform this action using key: ' + keyName} , false);
                }
            }
        });
    },

    createKey: function(key, callback) {
        fetchKeyFromKeyName(key.keyName, function(err, result) {
            if (err) {
                callback({'message' : 'Error in mongoDB query'}, false);
            }
            else if(result.length != 0) {
                console.log("length of result is " + result.length);
                callback({'message' : 'this KeyName already exists'}, false);
            }
            else {
                createNewKey(key, function(err, result) {
                    callback(err, result);
                });
            }
        });
    }
};

function createNewKey(key, callback) {
    mongo.connect(constants.DATABASE_SAFE_CHAT_MONGODB_URL, function(err, db){
        const keys_table = db_tables.keys_table;
        if(err){
            console.log(err);
            callback(err, {});
        }

        // searching for required username in the database.
        var query = {
            keyName : key.keyName,
            owner : key.owner,
            creationDate : key.creationDate,
            keyID : key.keyID,
            encryptAccess : key.encryptAccess,
            decryptAccess : key.decryptAccess
        };

        console.log('newly created key is: %j', query);
        var cursor = db.collection(keys_table).insertOne(query, function(err, result){
            db.close();
            if(err) {
                callback({'message' : 'Error in mongoDB query'}, false);
            }
            else {
                res = {
                    keyName : key.keyName,
                    owner : key.owner
                }
                callback(err, res);
            }
        });
    });
}

function fetchKeyFromKeyName(keyName, callback) {
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
            db.close();
            callback(err, result);
        });
    });
}

module.exports = keysModel;