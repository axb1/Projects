const mongoose = require('mongoose');


const lookingForGameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    waitedForHowLong: Number
});

module.exports = mongoose.model('lookingForGame', lookingForGameSchema);