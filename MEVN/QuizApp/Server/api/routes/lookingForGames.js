const express = require('express');
const router = express.Router();
const LookingForGame = require('../models/lookingForGame');

// Get looking for games
router.get('/', async (req, res) => {
    try {
        const lookingForGames = await LookingForGame.find();
        res.json(lookingForGames);

    } catch(err) {
        res.json({message: err})
    }
});

// Add looking for game
router.post('/', async (req, res) => {
    const lookingForGame = new LookingForGame({
        username: req.body.username,
        waitedForHowLong: 0
    });

    try {
        const savedLookingForGame = await lookingForGame.save()
        res.json(savedLookingForGame);
    } catch(err){
        res.json({message: err})
    }
});




module.exports = router;