var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
    username: String,
    email: String,
    hash: String,
    salt: String,
    bio: String,
    profileImg: String,
    addedcards: [{
       jobid: String,
       title: String,
       qulification: String,
       Jdes: String,
       closing: String,
       education: String,
       district: String,
       reply: [{
           replyok: String
       }],
       interview: String,
       rejected: String
    }]
});