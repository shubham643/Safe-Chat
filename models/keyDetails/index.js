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

        // @TODO: remove this part of code, this is for testing only.
        // var encryptAccess = ['shubham', 'simran'];
        // var decryptAccess = ['shubham', 'simran']
        // var temp = {
        //     keyName : "hahaKeyName",
        //     owner : "shubham",
        //     keyID : "tempKeyID",
        //     creationDate : "01/01/2018",
        //     encryptAccess : encryptAccess,
        //     decryptAccess : decryptAccess,
        // };
        // var cursor = db.collection(keys_table).insertOne(temp, function(err, result){
        //     if(err){
        //         console.log(err);
        //         callback(err, result);
        //     }
        // });



        // searching for required username in the database.
        var query = {
            keyName : keyName,
        };
        var cursor = db.collection(keys_table).find(query).toArray(function(err, result){
            if(err) {
                db.close();
                callback({'message' : 'Invalid KeyName'}, false);
            }
            if(result.length != 1) {
                console.log("length of result is " + result.length);
                db.close();
                callback({'message' : 'from second Invalid KeyName'}, false);
            }
            else {
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
                else {
                    callback({'message' : 'Username do not have access to encrypt using key: ' + keyName} , false);
                }
            }
        });
    });
}

module.exports = keysModel;