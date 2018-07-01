var jwt = require('jwt-simple');
var url = require('url');

module.exports = function(req, res, next) {

    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe. 
    
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
    
    if (token || key) {
        try {
            var decoded = jwt.decode(token, require('config/secret.js')());
            console.log(decoded);
        
            if (decoded.exp <= Date.now()) {
                res.json({
                    "success":false,
                    "message": "Token Expired"
                });
                next();
                return;
            }
            else {
                next();
                return;
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong", 
                "error": "Unauthorized access"
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token or Key"
        });
        return;
    }
};