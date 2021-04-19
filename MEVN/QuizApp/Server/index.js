const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const LookingForGame = require('./api/models/lookingForGame');
const User = require('./api/models/user')

const app = express();


// Connect to DB
mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import routes
const questionRoutes = require('./api/routes/questions.js');
const adminRoutes = require('./api/routes/admins.js');
const userRoutes = require('./api/routes/users.js');
const lookingForGameRoutes = require('./api/routes/lookingForGames.js');
const notificationRoutes = require('./api/routes/notifications.js');

app.use('/question', questionRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/lookingForGame', lookingForGameRoutes);
app.use('/notification', notificationRoutes);

// Set to port 5000 and listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

async function matchPlayers() {
    // Get looking for games 
    let lookingForGames = await LookingForGame.find();
    let matchArray = [];
    let noMatchArray = [];

    // Matchmaking players
    for(let i = lookingForGames.length-1; i >=0; i--) {
        const potentialMatches = lookingForGames.filter(function(game) {
            return game.username != lookingForGames[i].username;
        })

        if (potentialMatches.length != 0) {
            // Add players to match array
            matchArray.push(lookingForGames[i]);
            matchArray.push(potentialMatches[0]);

            // Remove first player from array
            lookingForGames.splice(i, 1);

            // Remove second player from array
            lookingForGames.splice(lookingForGames.indexOf(potentialMatches[0]), 1);

            // Decrement index by 2 as we removed 2
            i = i -1;
        }
        else {
            noMatchArray.push(lookingForGames[i]);
        }
    }
        // Create games
        for(let i = 0; i < matchArray.length; i++) {
            // If odd
            if (i & 1) {
                let user = await User.findOne({username: matchArray[i].username});
                let opponent = await User.findOne({username: matchArray[i-1].username});
                let userOngoingGames = user.ongoingGames;
                
                let date = new Date();
                let player1 = {username: opponent.username, correctAnswers: [], goFirst: true, dateOfLastTurn: date, myTurn: true, img: opponent.img, roundsPlayed: 0, token: opponent.token};
                let player2 = {username: user.username, correctAnswers: [], goFirst: false, dateOfLastTurn: date, myTurn: false, img: user.img, roundsPlayed: 0, token: user.token};
                let newGame = {player1: player1, player2: player2, gameIsOver: false, roundNumber: 1};
                userOngoingGames.push(newGame);

                // Update users ongoing games
                const filter = {username: user.username};
                const update = {ongoingGames: userOngoingGames};
                await User.findOneAndUpdate(filter, update);

                
                // Remove looking for game
                await LookingForGame.findOneAndDelete({_id: matchArray[i]._id});
                
            }
            // If even
            else {
                let user = await User.findOne({username: matchArray[i].username});
                let opponent = await User.findOne({username: matchArray[i+1].username});
                let userOngoingGames = user.ongoingGames;
                
                let date = new Date();
                let player1 = {username: user.username, correctAnswers: [], goFirst: false, dateOfLastTurn: date, myTurn: false, img: user.img, roundsPlayed: 0, token: user.token};
                let player2 = {username: opponent.username, correctAnswers: [], goFirst: true, dateOfLastTurn: date, myTurn: true, img: opponent.img, roundsPlayed: 0, token: opponent.token};
                let newGame = {player1: player1, player2: player2, gameIsOver: false, roundNumber: 1};
                userOngoingGames.push(newGame);

                // Update users ongoing games
                const filter = {username: user.username};
                const update = {ongoingGames: userOngoingGames};
                await User.findOneAndUpdate(filter, update);

                // Remove looking for game
                await LookingForGame.findOneAndDelete({_id: matchArray[i]._id});
    
            }
        }

        // Increment time waited for no matches
        for(const item of noMatchArray) {
            // Match against bot if they have waited for 30 seconds
            if(item.waitedForHowLong >=6) {
                let user = await User.findOne({username: item.username});
                let userOngoingGames = user.ongoingGames;
                
                let date = new Date();
                let player1 = {username: user.username, correctAnswers: [], goFirst: true, dateOfLastTurn: date, myTurn: true, img: user.img, roundsPlayed: 0, token: user.token};
                let player2 = {username: "Bot60", correctAnswers: [], goFirst: false, dateOfLastTurn: date, myTurn: false, img: "https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png", roundsPlayed: 0, token: "Token"};
                let newGame = {player1: player1, player2: player2, gameIsOver: false, roundNumber: 1};
                userOngoingGames.push(newGame);

                // Update users ongoing games
                const filter = {username: user.username};
                const update = {ongoingGames: userOngoingGames};
                await User.findOneAndUpdate(filter, update);

                // Remove looking for game
                await LookingForGame.findOneAndDelete({_id: item._id});
            }
            else {
                // Increase time waited
                await LookingForGame.findByIdAndUpdate({_id: item._id}, {$inc : {'waitedForHowLong': 1}}, {new: true})
            }
            
        }



}
async function sendNotificationAndUpdateGamesFromBots() {
    let bots = await User.find({isBot: true});
    bots.forEach(bot => {
        bot.ongoingGames.forEach(game => {
            if(game.ongoingGames.player2.myTurn == true) {
                // Update game for opponent
                let opponent = await User.findOne({username: game.player1.username});
                let opponentGame = opponent.ongoingGames.filter(obj => {
                    return obj._id === game._id;
                  })
                console.log(opponentGame);
            }
            
        });
    });
}
setInterval(sendNotificationAndUpdateGamesFromBots, 5000);
setInterval(matchPlayers, 10000);

