var userModel = require('models/user');
var secret = require('config/secret');
var constants = require('helpers/constants');
var jwt = require('jwt-simple');

var auth = {
    loginUser: function(req, res) {
        var username = req.query.username || '';
        var password = req.query.password || '';
        if (username == '' || password == '') {
            res.json({
                "success": false,
                "err_msg": 'Username or Password is empty' 
            });
            return;
        }
        auth.validate(username, password, function(err, dbUserObj){
            if(err) {
                console.log(err);
                res.json({
                    'success' : false,
                    'err_msg' : err.message
                });
                return;
            }
            console.log('result obtained is %j', dbUserObj);
            //res.json(dbUserObj);
            res.json(generateToken(dbUserObj));

        });
    },

    validate: function(username, password, callback) {
        userModel.validateUser(username, password, function(err, result){
            callback(err, result);
            return;
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