var keyDetails = require('models/keyDetails')
var crypto = require('crypto');

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
        keyDetails.fetchKey(username, keyName, function(err, result) {
            if(err) {
                callback(err, result);
            }
            else {
                try {
                    // Add logic to encrypt the data from the retrieved key.
                    // @TODO: this is a sample code, correct it and handle exceptions too.
                    var mykey = crypto.createCipher('aes-128-cbc', result.keyID);
                    var mystr = mykey.update(plainText, 'utf8', 'hex')
                    mystr += mykey.final('hex');

                    console.log('after encryption: ' + mystr); //plainText

                    var mykeys = crypto.createDecipher('aes-128-cbc', result.keyID);
                    var mystrs = mykeys.update(mystr, 'hex', 'utf8')
                    mystrs += mykeys.final('utf8');

                    console.log('after decryption: ' + mystrs); //plainText

                    console.log("the result after fetching the key is: " + result);
                    callback(false, 'encrypted data is: ' + plainText + ' and username is: ' + username + ' encrypted string: ' + mystr + ' decrypted string: ' + mystrs);                
                } catch (exception) {
                    throw new Error("Exception thrown while encyption: " + exception.message);
                }
            }
        });
    }
};

module.exports = encryptData;
