var mongoose = require('mongoose');
var fs = require('fs-extra');
var path = require('path');
var Users = require('../datasets/users');

module.exports.updateProfile = function(req, res){
  console.log(req.body);
 console.log(req.files.file);
    var file = req.files.file;
    var userid = req.body.userid;
    var bio = req.body.bio;
    
    var datenow = new Date().toISOString();
    datenow = datenow.replace("-", ".");
     datenow = datenow.replace("-", ".");
    datenow = datenow.replace(":", ".");
     datenow = datenow.replace(":", ".");
    
    var tempPath = file.path;
    var targetPath = path.join(__dirname, "../../uploads/" + userid + datenow + file.name);
    var savePath = "/uploads/" + userid + datenow + file.name;
    
    fs.rename(tempPath, targetPath, function(err){
        if(err){
            res.error(err);
        }else{
           Users.findById(userid, function(err, user){
               if(err){
                   res.error(err);
               }else{
                   user.bio = bio;
                   user.profileImg = savePath;
                   user.save(function(err, result){
                       if(err){
                           res.error(err);
                       }else{
                           res.json(result);
                       }
                   });
                   
               }
           }); 
        }
    });
    
}


module.exports.getProfile = function(req, res){
    var userid = req.body.userid;
    Users.findById(userid, function(err, user){
        if(err){
            res.error(err);
        }else{
            res.json(user);
        }
    });
}