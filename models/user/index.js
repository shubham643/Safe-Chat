var db_tables = require('helpers/dbTables');
var mongo = require('mongodb');
var constants = require('helpers/constants');

var userModel = {
    validateUser: function(username, password, callback) {
        getUserByUsername(username, function(err, result) {
            if (err){
                callback({'message' : 'Error in MongoDB query'}, false);
            }
            else {
                if(result.length != 1 || result[0].password != password) {
                    callback({'message' : 'Invalid username or password'}, false);
                }
                else {
                    callback(false, result[0]);
                }
            }
        })
    },

    // register the user if provided username is not present,
    // otherwise in result, set success: false;

    registerUser: function(user, callback) {
        getUserByUsername(user.username, function(err, result) {
            if (err){
                callback({'message' : 'Error in MongoDB query'}, false);
            }
            else if(result.length != 0) {
                callback({'message' : 'This username is not available'}, false);
            }
            else {
                // now put the values in the table.
                putUserDetailsInTable(user, function(err, res) {
                    callback(err, res);
                })
            }
        })
    }
};

function getUserByUsername(username, callback) {
    mongo.connect(constants.DATABASE_SAFE_CHAT_MONGODB_URL, function(err, db){
        const user_table = db_tables.user_table;
        if(err){
            console.log(err);
            callback(err, {});
        }

        // searching for required username in the database.
        var query = { userName : username };
        var cursor = db.collection(user_table).find(query).toArray(function(err, result){
            if(err){
                callback(err, result);
                return;
            }
            db.close();
            callback(false, result);
        })
    });
}

function putUserDetailsInTable(user, callback) {
    mongo.connect(constants.DATABASE_SAFE_CHAT_MONGODB_URL, function(err, db){
        const user_table = db_tables.user_table;
        if(err){
            callback(err, {});
        }

        // searching for required username in the database.
        var obj = { 
            userName : user.username,
            password : user.password,
            firstName : user.firstName,
            middleName : user.middleName,
            lastName : user.lastName,
            phone : user.phone,
            email : user.email
        };
        var cursor = db.collection(user_table).insertOne(obj, function(err, result){
            if(err){
                console.log(err);
                callback(err, result);
                return;
            }
            db.close();
            callback(false, result);
        })
    });
}

module.exports = userModel;