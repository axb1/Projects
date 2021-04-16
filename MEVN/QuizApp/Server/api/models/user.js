const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true},
    email: {type: String, unique: true},
    ongoingGames: [{
        player1: {
            username: String,
            correctAnswers: Array,
            goFirst: Boolean,
            dateOfLastTurn: Date,
            myTurn: Boolean,
            img: String,
            roundsPlayed: Number,
            token: String
        },
        player2: {
            username: String,
            correctAnswers: Array,
            goFirst: Boolean,
            dateOfLastTurn: Date,
            myTurn: Boolean,
            img: String,
            roundsPlayed: Number,
            token: String
        },
    }],
    previousGames: [{
        player1: {
            username: String,
            correctAnswers: Array,
            goFirst: Boolean,
            dateOfLastTurn: Date,
            myTurn: Boolean,
            img: String,
            roundsPlayed: Number,
        },
        player2: {
            username: String,
            correctAnswers: Array,
            goFirst: Boolean,
            dateOfLastTurn: Date,
            myTurn: Boolean,
            img: String,
            roundsPlayed: Number,
        },
    }],
    searchingForGame: Boolean,
    img: String,
    friends: [{
        username: String,
        img: String,
        token: String
    }],
    invites: [{
        username: String,
        img: String,
        inviteID: String,
        token: String
    }],
    token: String,
    previousQuestions: Array
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;