var userModel = require('models/user');
var secret = require('config/secret');
var constants = require('helpers/constants');
var jwt = require('jwt-simple');

var auth = {
    login_user: function(req, res) {
        var username = 'shubham';
        var password = 'bansal';
        //var username = req.query.username || '';
        //var password = req.query.password || '';
        if (username == '' || password == '') {
            res.json({
                "success": false,
                "err_msg": 'Username or Password is empty' 
            });
            return;
        }
        auth.validate(username, password, function(err, dbUserObj){
            console.log("called validate");
            if(err == true) {
                console.log(err);
                res.json({
                    'success' : false,
                    'err_msg' : err.message
                });
                return;
            }

            if (!dbUserObj) { // If authentication fails, we send a 401 back
				res.json({
                    "success": false,
                    "err_msg": err.message
				});
				return;
            }
            //res.json(dbUserObj);
            res.json(generateToken(dbUserObj));

        });
    },

    validate: function(username, password, callback) {
        console.log("in validate");
        userModel.validateUser(username, password, function(err, result){
            callback(err, result);
        })
    }
};

/*
*generating the jwt(json web token) for the user authentication(this is subsitute of the cookies used in mis web app)
*secret key is used defined in config/secret.js
*set the expiry time for the token 
*token consist of three parts (a.b.c)
*(a) base64encode({'typ':'jwt','alg':'ALGO_USED_TO_GEN_TOKEN'})
*(b) base64encode({user})
*(c) base64encode(hash(a+b+secret)) for checksum
*/

function generateToken(user) {
    delete user.password;
    console.log(user);
    var expires = expiresIn(constants.TOKEN_EXPIRE_TIME);
    
    var token = jwt.encode({
		exp: expires,
		user: user
    }, require('config/secret.js')());
    
    return {
        'success' : true,
        'token' : token,
        'expires' : expires
    };
}

function expiresIn(numDays) {
	var dateObj = new Date();
	return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;