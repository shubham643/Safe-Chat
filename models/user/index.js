var db = require('config/db');
var db_tables = require('helpers/db_tables');
var mongo = require('mongodb');
var constants = require('helpers/constants');

var userModel = {
    validateUser: function(username, password, callback) {
        console.log("in usermodel/validateuser validate");
        getUserById(username, function(err, row) {
            result = row;
            console.log("called usermodel/getuserbyid");
            console.log(row);
            if (err){
                callback({'message' : 'Error in MongoDB query'}, false);
            }
            else{
                if(result.length == 1) {
                    callback(err, row);
                }
                else {
                    callback({'message' : 'Invalid username or password'}, false);
                }
            }
        })
    }
};

function getUserById(username, callback) {
    
    console.log('url being hit is ' + constants.DATABASE_SAFE_CHAT_MONGODB_URL);
    mongo.connect(constants.DATABASE_SAFE_CHAT_MONGODB_URL, function(err, db){
        const user_table = db_tables.user_table;
        if(err){
            console.log(err);
            callback(err, {});
        }

        // searching for required username in the database.
        var query = { user_name : username };
        var cursor = db.collection(user_table).find(query).toArray(function(err, result){
            if(err){
                console.log(err);
                callback(err, result);
                return;
            }
            console.log(result);
            db.close();
            callback(false, result);
        })
    });
}

module.exports = userModel;