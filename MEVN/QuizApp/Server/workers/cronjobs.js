const LookingForGame = require('../api/models/lookingForGame.js');
const User = require('../api/models/user.js');


module.exports = {
    matchPlayers: async function() {
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
            console.log(noMatchArray);
            // Match against bot if they have waited for 30 seconds
            if(item.waitedForHowLong >=6) {
                let user = await User.findOne({username: item.username});
                let userOngoingGames = user.ongoingGames;
                
                let date = new Date();
                let player1 = {username: user.username, correctAnswers: [], goFirst: true, dateOfLastTurn: date, myTurn: true, img: user.img, roundsPlayed: 0, token: user.token};
                let player2 = {username: "Novicell", correctAnswers: [], goFirst: false, dateOfLastTurn: date, myTurn: false, img: "https://cdn2.bulbagarden.net/upload/0/02/009Blastoise.png", roundsPlayed: 0, token: "Token"};
                let newGame = {player1: player1, player2: player2, gameIsOver: false, roundNumber: 1};
                userOngoingGames.push(newGame);

                // Update users ongoing games
                const filter = {username: user.username};
                const update = {ongoingGames: userOngoingGames};
                await User.findOneAndUpdate(filter, update);

                // Update bots ongoing games
                let bot = await User.findOne({username: player2.username})
                let botOngoingGames = bot.ongoingGames;
                botOngoingGames.push(newGame);

                const botFilter = {username: player2.username};
                const botUpdate = {ongoingGames: botOngoingGames};
                await User.findOneAndUpdate(botFilter, botUpdate);

                // Remove looking for game
                await LookingForGame.findOneAndDelete({_id: item._id});
            }
            else {
                // Increase time waited
                await LookingForGame.findByIdAndUpdate({_id: item._id}, {$inc : {'waitedForHowLong': 1}}, {new: true})
            }
            
        }



    },
    sendNotificationAndUpdateGamesForBots: async function() {
        let bots = await User.find({isBot: true});
        for (const bot of bots) {
            var myTurnGames = bot.ongoingGames.filter(function(game) {
                return game.player2.myTurn == true;
            })
            for(const myTurnGame of myTurnGames) {
                let opponent = await User.findOne({username: myTurnGame.player1.username});
                console.log(opponent);
            }
        }
    }
}

