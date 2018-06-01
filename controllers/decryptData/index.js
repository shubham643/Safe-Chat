var keyDetails = require('models/keyDetails');
var crypto = require('crypto');
var actions = require('helpers/actions');

var decryptData = {
    decrypt: function(req, res) {
        var username = req.query.username || '';
        var encryptedText = req.query.encryptedText || '';
        var keyName = req.query.keyName || '';

        if (username == '' || encryptedText == '' || keyName == '') {
            res.json({
                "success": false,
                "err_msg": 'Username/Encrypted Text/Key Name is empty'
            });
            return;
        }

        decryptData.fetchKeyAndDecryptData(username, encryptedText, keyName, function(err, result){
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
                    "decryptedResult": result
                });
                return;
            }
        });
    },

    fetchKeyAndDecryptData: function(username, encryptedText, keyName, callback) {

        // Fetch the key firstly, then decrypt the data with this.
        keyDetails.fetchKey(username, keyName, actions.DECRYPT, function(err, result) {
            if(err) {
                callback(err, result);
                return;
            }
            else {
                try {
                    // logic to decrypt the data from the retrieved key.
                
                    var mykey = crypto.createDecipher('aes-128-cbc', result.keyID);
                    var mystr = mykey.update(encryptedText, 'hex', 'utf8')
                    mystr += mykey.final('utf8');

                    console.log('after decryption: ' + mystr); //plainText

                    console.log("the result after fetching the key is: " + result);
                    callback(false, 'encrypted data is: ' + encryptedText + ' and username is: ' + username + 'decrypted string: ' + mystr);
                    return;            
                } catch (exception) {
                    throw new Error("Exception thrown while encyption: " + exception.message);
                }
            }
        });
    }
};

module.exports = decryptData;
