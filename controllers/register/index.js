var userModel = require('models/user');
var User = require('models/user/userModel')
var secret = require('config/secret');
var constants = require('helpers/constants');

var register = {

    registerUser: function(req, res){
        var username = req.query.username || '';
        var password = req.query.password || '';
        var firstName = req.query.firstName || '';
        var middleName = req.query.middleName || '';
        var lastName = req.query.lastName || '';
        var phone = req.query.phone || '';
        var email = req.query.email || '';

        // check if this username is already existing. If yes, then return success : false.
        // Else, register the user with this username.
        var user = new User(username, password, firstName, middleName, lastName, phone, email);
        if (user.checkRequiredFields() == false) {
            res.json({
                "success": false,
                "message": 'Username/Password/First Name/Phone is empty' 
            });
            return;
        }

        userModel.registerUser(user, function(err, result) {
            if (err == true) {
                res.json({
                    success : false,
                    message : err.message
                });
                return;
            }
            else {
                res.json({
                    success : true,
                });
                return;
            }
        })
    }
}

module.exports = register;