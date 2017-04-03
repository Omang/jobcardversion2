var mongoose = require('mongoose');
var Jobs = require('../datasets/jobs');
var Users = require('../datasets/users');


module.exports.jobCreate = function(req, res){
     console.log(req.body);
   var job_userid = req.body.userid;
   var job_title = req.body.jobtitle;
   var job_qulification = req.body.qulification;
   var job_description = req.body.aboutjob;
    
   var job_expdate = req.body.jobdate;
    job_expdate = job_expdate.replace(':','.');
    job_expdate = job_expdate.replace(':','.');
    job_expdate = job_expdate.replace(':','.');
    job_expdate = job_expdate.replace(':','.');
    
   var job_education = req.body.education;
   var job_district = req.body.district;
    
    var jobs = new Jobs();
        jobs.jobid = job_userid;
        jobs.title = job_title;
        jobs.qulification = job_qulification;
        jobs.Jdes = job_description;
        jobs.closing = job_expdate;
        jobs.education = job_education;
        jobs.district = job_district;
        
        jobs.save(function(err, results){
            if(err){
                res.error(err);
            }else{
                res.json(results);
            }
        });
    
}
module.exports.checkJob = function(req, res){
    var userid = req.body.userid;
    Jobs.find({jobid: userid}, function(err, results){
        if(err){
            res.error(err);
        }else{
            res.json(results);
        }
    });
}

module.exports.getCard = function(req, res){
    
    Jobs.find({}, function(err, results){
        if(err){
            res.error(error);
        }else{
            res.json(results).status(200);
        }
    });
}

module.exports.addLike = function(req, res){
   var jobid = req.body.jobid;
   var likeuser = req.body.currentUser;
    
    Jobs.findById(jobid, function(err, results){
        if(err){
            res.error(err);
        }else{
          results.likeusers.push({likes: likeuser});
          results.save(function(err, user){
              if(err){
                  res.error(err);
              }else{
                  res.json(user);
              }
          });
        }
    });
}

module.exports.likeBox = function(req, res){
     var jobid = req.body.jobId;
   Jobs.findById(jobid, function(err, results){
       if(err){
           res.error(err);
       }else{
          res.json(results);
       }
   });
}
module.exports.postCv = function(req, res){
    var jobid = req.body.job_id;
    console.log(jobid);
    var cvid = req.body.cvid;
    var user_id = req.body.userid;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var gender = req.body.gender;
    var proffesion = req.body.proffesion;
    var skills = req.body.skills;
    var experince = req.body.experince;
    
    Jobs.findById(jobid, function(err, results){
        if(err){
            res.error(err).status(500);
        }else{
            console.log(results);
            results.cvbox.push({
               cvid: cvid,
               userid : user_id,
               fname: fname,
               lname: lname,
               gender: gender,
               proffesion: proffesion,
               skill: skills,
               experince: experince
            });
            results.save(function(err, card){
                if(err){
                    res.error(err).status(500);
                }else{
                    res.json({card: "successfully saved",
                              cvid: cvid}).status(200);
                }
            });
        }
    });
}

module.exports.checkPost = function(req, res){
    var job_id = req.body.jobid;
    Jobs.findById(job_id, function(err, results){
        if(err){
            res.error(err).status(500);
        }else{
            res.json(results).status(200);
        }
    });
}
module.exports.getJob = function(req, res){
    var job_id = req.body.jobid;
    Jobs.find({jobid: job_id}, function(err, results){
        if(err){
           res.error(err).status(500);
        }else{
            res.json(results).status(200);
        }
    });
}
module.exports.cvReview = function(req, res){
    var user = req.body.cvdata;
    var jobid = req.body.job_id;
    Users.findById(user, function(err, userdata){
        if(err){
            res.error(err).status(500);
        }else{
            if(userdata !== null){
                var cards = userdata.addedcards;
                for(var i = 0; i < cards.length; i++){
                    if(jobid == cards[i].jobid){
                        var reply = cards[i].reply;
                        var replyone = "on the second step";
                         reply.push({replyok: replyone});
                        userdata.save(function(err, user){
                            if(err){
                                res.error(err).status(500);
                            }else{
                                res.json(user);
                            }
                        });
                    }
                }
            }
            
        }
    });
    Jobs.findById(jobid, function(err, results){
        if(err){
            res.status(500);
            console.log(err);
        }else{
            if(results !== null){
                var cvbox = results.cvbox;
                for(var j = 0; j < cvbox.length; j++){
                    if(user == cvbox[j].userid){
                        var review = cvbox[j].review;
                        var reviewdata = "waiting review";
                        review.push({reviewone: reviewdata});
                        results.save();
                    }
                }
            }
        }
    });
}
module.exports.reviewCheck = function(req, res){
    var job_id = req.body.jobid;
    Jobs.findById(job_id, function(err, jobcard){
       if(err){
           res.error(err).status(500);
       }else{
           res.json(jobcard);
       }
    });
}
