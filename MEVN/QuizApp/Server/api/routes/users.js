const express = require('express');
const router = express.Router();
const User = require('../models/user');
     
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        ongoingGames: req.body.ongoingGames,
        previousGames: req.body.previousGames,
        searchingForGame: req.body.searchingForGame,
        img: req.body.img,
        friends: req.body.friends,
        invites: req.body.invites
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err){
        res.json({message: err})
    }
});

//Update ongoing games
router.put('/ongoinggames', async (req, res) => {
    const filter = {username: req.body.username};
    const update = {ongoingGames: req.body.ongoingGames};
    try {
        const updatedUser = await User.findOneAndUpdate(filter, update);
        res.json(updatedUser);
    } catch(err){
        res.json({message: err})
    }
});

// Update previous games
router.put('/previousgames', async (req, res) => {
    const filter = {username: req.body.username};
    const update = {previousGames: req.body.previousGames};
    try {
        const updatedUser = await User.findOneAndUpdate(filter, update);
        res.json(updatedUser);
    } catch(err){
        res.json({message: err})
    }
});

// Update user (set looking for game to false)
router.put('/searchingforgame', async (req, res) => {
    const filter = {username: req.body.username};
    const update = {searchingForGame: req.body.searchingForGame};
    try {
        const updatedUser = await User.findOneAndUpdate(filter, update);
        res.json(updatedUser);
    } catch(err){
        res.json({message: err})
    }
});


// Update user (add friend)
router.put('/friends', async (req, res) => {
    const filter = {username: req.body.username};
    const update = {friends: req.body.friends};
    try {
        const updatedUser = await User.findOneAndUpdate(filter, update);
        res.json(updatedUser);
    } catch(err){
        res.json({message: err})
    }
});

// Update user (add invite)
router.put('/invites', async (req, res) => {
    const filter = {username: req.body.username};
    const update = {invites: req.body.invites};
    try {
        const updatedUser = await User.findOneAndUpdate(filter, update);
        res.json(updatedUser);
    } catch(err){
        res.json({message: err})
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch(err) {
        res.json({message: err})
    }
});

// Get user by username
router.get('/username/:username', async (req, res) => {
    const username = req.params.username;
    User.find({username: username})
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

// Get user by email
router.get('/:email', async (req, res) => {
    const email = req.params.email;
    User.find({email: email})
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
// Get users that are searching for game
router.get('/search/searchingforgame', async (req, res) => {
    User.find({searchingForGame: true})
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


module.exports = router;