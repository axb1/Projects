const mongoose = require('mongoose');


const lookingForGameSchema = mongoose.Schema({
    username: String,
    waitedForHowLong: Number
});

const LookingForGame = mongoose.model('LookingForGame', lookingForGameSchema);
module.exports = LookingForGame;