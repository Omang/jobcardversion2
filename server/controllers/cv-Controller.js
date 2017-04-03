var mongoose = require('mongoose');
var Cvs = require('../datasets/cvs');

module.exports.cvCreate = function(req, res){
    console.log(req.body);
    
    var cv = new Cvs();
    cv.firstName = req.body.firstname;
    cv.lastName = req.body.lastname;
    cv.gender = req.body.gender;
    cv.email = req.body.email;
    cv.proffesion = req.body.qulification;
    cv.education = req.body.education;
    cv.district = req.body.district;
    cv.userid =  req.body.userid;
    cv.skilldes = req.body.skilldes;
    cv.expedes = req.body.expdes; 
    
    cv.save(function(err, user){
        if(err){
           res.error(err); 
        }else{
            res.json(user);
        }
    });
}

module.exports.checkCv = function(req, res){
    var userid = req.body.userid;
   
    Cvs.findOne({userid: userid}, function(err, results){
        if(err){
            res.error(err);
        }else{
            res.json(results);
        }
    });
   
}

module.exports.getCv = function(req, res){
    var user_id = req.body.userid; 
    Cvs.findOne({userid: user_id}, function(err, result){
        if(err){
            res.error(err);
        }else{
            res.json(result);
        }
    });
   
}