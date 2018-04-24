var db = require('config/db');
var db_tables = require('helpers/db_tables');

const user_table = db_tables.get('user_table');

var userModel = {
    validateUser: function(username, passwork, callback) {
        row = getUserById(username, function(err, row) {
            console.log(row);
            if (err){
                callback({'message' : 'Error in MongoDB query'}, false);
            }
            else{
                if(row.length == 1) {
                    // Add logic for returning back the fetched data.
                }
                else {
                    callback({'message' : 'Invalid username or password'}, false);
                }
            }
        })
    }
};