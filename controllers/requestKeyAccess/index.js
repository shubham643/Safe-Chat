var keyDetails = require('models/keyDetails');
var actions = require('helpers/actions');

var requestKeyAccess = {
    requestAccess: function(req, res) {
        var keyName = req.query.keyName || '';
        var username = req.query.username || '';

        if (username == '' || keyName == '') {
            if(username == '' || keyName == '') {
                res.json({
                    "success": false,
                    "err_msg": 'Username/KeyName is empty'
                });
            }
            else {
                res.json({
                    "success": false,
                    "err_msg": 'Please enter what type of access you want (encrypt/decrypt or both)'
                });
            }
            return;
        }

        requestKeyAccess.findKeyCheckAccessOrFindOwner(username, keyName, function(err, result) {
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
                    "accessDetails": result
                });
                return;
            }
        });
    },

    // this method checks whether username mentioned has access to given keyName, if not then 
    // the owner of that keyName is searched and requested.
    findKeyCheckAccessOrFindOwner: function(username, keyName, callback) {

        keyDetails.fetchKey(username, keyName, actions.REQUEST_KEY_ACCESS, function(err, result) {
            callback(err, result);
            return;
        });
    }
}

module.exports = requestKeyAccess;