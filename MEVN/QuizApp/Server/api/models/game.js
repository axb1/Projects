const mongoose = require('mongoose');


const gameSchema = mongoose.Schema({
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
    gameIsOver: Boolean,
    isFull: Boolean,
    gameId: String,
});

module.exports = mongoose.model('game', gameSchema);