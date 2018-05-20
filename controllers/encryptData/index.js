var keysModel = require('models/keyDetails/keysModel');
var keysDetails = require('models/keyDetails')

var encryptData = {
    encrypt: function(req, res) {
        var username = req.query.username || '';
        var plainText = req.query.plainText || '';
        var keyName = req.query.keyName || '';

        if (username == '' || plainText == '' || keyName == '') {
            res.json({
                "success": false,
                "err_msg": 'Username/Data/KeyName is empty'
            });
            return;
        }

        encryptData.fetchKeyAndEncryptData(username, plainText, keyName, function(err, result){
            if(err) {
                res.json({
                    "success": false,
                    "err_msg": err.message
				});
				return;
            }
            else {
                res.json({
                    "success": true,
                    "encryptedResult": result
                });
                return;
            }
        });
    },

    fetchKeyAndEncryptData: function(username, plainText, keyName, callback) {

        // Fetch the key firstly, then encrypt the data with this.
        keysDetails.fetchKey(username, keyName, function(err, result) {
            if(err) {
                callback(err, result);
            }

            // Add logic to encrypt the data from the retrieved key.
            console.log("the result after fetching the key is: " + result);
            callback(false, 'encrypted data is: ' + plainText + ' and username is: ' + username);
        });
    }
};

module.exports = encryptData;
