var keyDetails = require('models/keyDetails')
var keysModel = require('models/keyDetails/keysModel')
var crypto = require('crypto');

var createKey = {
    create: function(req, res) {
        var keyName = req.query.keyName || '';
        var username = req.query.username || '';

        if (username == '' || keyName == '') {
            res.json({
                "success": false,
                "err_msg": 'Username/KeyName is empty'
            });
            return;
        }

        createKey.createKeyIDAndStore(username, keyName, function(err, result) {
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
                    "keyDetails": result
                });
                return;
            }
        });
    },

    createKeyIDAndStore: function(owner, keyName, callback) {

        // Create a keyID, by creating hash of keyName and then store it in database.

        const creationDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const encryptAccess = [owner];
        const decryptAccess = [owner];

        // create hash of keyName.
        const hash = crypto.createHash('sha256');
        hash.update(keyName);
        const keyID = hash.digest('hex');
        console.log('hash of keyName i.e. keyID is ' + keyID + ' and date is ' + creationDate);

        var key = new keysModel(keyName, keyID, owner, creationDate, encryptAccess, decryptAccess);
        keyDetails.createKey(key, function(err, result) {
            callback(err, result);
        });
    }
}

module.exports = createKey;