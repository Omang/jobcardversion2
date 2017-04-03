var mongoose = require('mongoose');
var Users = require('../datasets/users');
var Jobs = require('../datasets/jobs');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports.loginUser = function(req, res){
   var Username = req.body.username;
   var password = req.body.password;

 
        Users.findOne({username: Username}).exec(function(err, user){
           if(err){
               res.error(err);
           }else{
              if(user !== null){
                 var salt = user.salt;
                 var hash = user.hash;
                 var verifypass = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
                  if(verifypass === hash){
                    var token = jwt.sign({
                      userid: user._id,
                      username: user.username,
                      email: user.email,
                      }, "My_stuff");
                      res.json(token);
                      
                  }else{
                      res.json({ msg: 'wrong password'});
                  }
                  
              }else{
               console.log('user not found');
               res.json({msg: 'user not found'});
            }
           }
        });
    
    
    
}

module.exports.addCard = function(req, res){
    console.log(req.body);
   var currentUser = req.body.usercurrent;
   var cardid = req.body.addedCard;
   var cardtitle = req.body.title;
   var quilification = req.body.quli;
   var carddis = req.body.des;
   var closingdate = req.body.cloday;
   var district = req.body.dist;
    Users.findById(currentUser, function(err, results){
        if(err){
            res.status(500).json(err);
        }else{
            results.addedcards.push({
                jobid: cardid,
                title: cardtitle,
                qulification: quilification, Jdes: carddis, closing: closingdate, district: district
            });
            results.save();
        }
    });
    Jobs.findById(cardid, function(err, cardata){
        if(err){
            res.json(err);
        }else{
            cardata.cardviews.push({cardview: currentUser});
            cardata.save(function(err, card){
                if(err){
                    res.status(500).json(err);
                }else{
                    res.json(card);
                }
            });
        }
    });
    
}
module.exports.joBox = function(req, res){
   // var datafrom = [];
        // datafrom.push(req.body.userid);
         console.log(req.body);
     var jobid = req.body.userid;
   Jobs.findById(jobid, function(err, results){
       if(err){
           res.error(err);
       }else{
          res.json(results);
       }
   });
}

module.exports.getdash = function(req, res){
    var userid = req.body.userid;
    Users.findById(userid, function(err, user){
        if(err){
            res.error(err).status(500);
        }else{
            res.json(user);
        }
    });
}
