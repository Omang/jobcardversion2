var mongoose = require('mongoose');

module.exports = mongoose.model('Cvs', {
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    proffesion: String,
    education: String,
    district: String,
    userid: String,
    skilldes: String,
    expedes: String
});