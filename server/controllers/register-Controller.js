var mongoose = require('mongoose');
var Users = require('../datasets/users');
var crypto = require('crypto');

module.exports.registerUser = function(req, res){
    
    
    var userName = req.body.username;
    var theMail = req.body.email;
    
    var Password = req.body.password;
    
    Users.findOne({username: userName}).exec(function(err, user){
        if(err){
            res.error(err);
        }
        if(user !== null){
            res.json({
                stuff: 'name found'
            });
        }else{
            
                var setPassword = function(password){
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
        return {
            Salt: salt,
            Hash: hash
        };
    }
    
    var passresult = setPassword(Password);
    
    var regUser = new Users();
    
    regUser.username = userName;
    regUser.email = theMail;
    regUser.salt = passresult.Salt;
    regUser.hash = passresult.Hash
    regUser.save(function(err, results){
        if(err){
            res.error(err);
        }else{
            res.json(results);
        }
    });
            
        }
    });
    
    //var Password = req.body.password;
    
    

}