var mongoose = require('mongoose');

module.exports = mongoose.model('Jobs', {
    jobid: String,
    title: String,
    qulification: String,
    Jdes: String,
    closing: String,
    education: String,
    district: String,
    cardviews: [{
        cardview: String
    }],
    likeusers: [{
        likes: String
    }],
    cvbox: [{
        cvid : String,
        userid : String,
        fname : String,
        lname : String,
        gender: String,
        proffesion: String,
        skill : String,
        experince: String,
        review: [{
            reviewone: String,
            jobid: String
        }],
        interview: String
    }]
});