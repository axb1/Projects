const express = require('express');
const router = express.Router();
const Game = require('../models/game');

// Get available games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);

    } catch(err) {
        res.json({message: err})
    }
});

// Get games that aren't full
router.get('/available', async (req, res) => {
    Game.find({isFull: false})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})

// Get game by gameId
router.get('/gameid/:gameid', async (req, res) => {
    const gameId = req.params.gameid;
    Game.find({gameId: gameId})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
})

// Add game
router.post('/', async (req, res) => {
    const game = new Game({
        player1: req.body.player1,
        player2: req.body.player2,
        gameIsOver: req.body.gameIsOver,
        isFull: req.body.isFull,
        gameId: req.body.gameId
    });

    try {
        const savedGame = await game.save()
        res.json(savedGame);
    } catch(err){
        res.json({message: err})
    }
});

// Update game
router.put('/', async (req, res) => {
    const filter = {gameId: req.body.id};
    const update = {player2: req.body.player2, isFull: req.body.isFull};
    console.log(filter);
    console.log(update);
    try {
        const updatedGame = await Game.findOneAndUpdate(filter, update);
        res.json(updatedGame);
    } catch(err){
        res.json({message: err})
    }
});


module.exports = router;