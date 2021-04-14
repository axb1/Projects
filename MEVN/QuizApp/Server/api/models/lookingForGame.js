const mongoose = require('mongoose');


const lookingForGameSchema = mongoose.Schema({
    username: String
});

module.exports = mongoose.model('lookingForGame', lookingForGameSchema);