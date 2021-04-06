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
        isFull: Boolean,
        gameId: String,
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
        isFull: Boolean,
        gameId: String,
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
    token: String
    
});

const User = mongoose.model('User', userSchema);
module.exports = User;