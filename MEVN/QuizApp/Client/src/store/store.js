import {createStore} from 'vuex';
import UserService from '../api/UserService';
import GameService from '../api/GameService';

import firebase from 'firebase';

export default createStore({
    state: {
        ongoingGames: [],
        previousGames: [],
        lookingForRandomOpponent: false,
        currentGame: {},
        currentUser: {},
        friends: [],
        friendSearchResult: String,
        playerSearchResult: String,
        invites: []
    },
    mutations: {
        setOngoingGames(state, payload) {
            state.ongoingGames = payload;
        },
        setPreviousGames(state, payload) {
            state.previousGames = payload;
        },
        setLookingForRandomOpponent(state, payload) {
            state.lookingForRandomOpponent = payload;
        },
        setCurrentGame(state, payload) {
            state.currentGame = payload;
        },
        setCurrentUser(state, payload) {
            state.currentUser = payload;
        },
        setFriends(state, payload) {
            state.friends = payload;
        },
        setFriendSearchResult(state, payload) {
            state.friendSearchResult = payload;
        },
        setPlayerSearchResult(state, payload) {
            state.playerSearchResult = payload;
        },
        setInvites(state, payload) {
            state.invites = payload;
        },
    },
    actions: {
        async setOngoingGames(state) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            if (user[0].ongoingGames.length !=0) {
                var games = user[0].ongoingGames;
                state.commit('setOngoingGames', games);
            } else {
                state.commit('setOngoingGames', [])
            }
        },
        async setPreviousGames(state) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            if (user[0].previousGames.length !=0) {
                var games = user[0].previousGames;
                state.commit('setPreviousGames', games);
            } else {
                state.commit('setPreviousGames', [])
            }
        },
        async setCurrentUser(state) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            var actualUser = user[0];
            state.commit('setCurrentUser', actualUser);
        },

        async setFriends(state) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            var actualUser = user[0];
            state.commit('setFriends', actualUser.friends);
        },

        async setFriendSearchResult(state, input) {
            var searchResult = [];
            var usernameResult = await UserService.getUserByUsername(input);
            if (usernameResult.length != 0) {
                var user = {username: usernameResult[0].username, img: usernameResult[0].img}
                searchResult.push(user);
            }
            state.commit('setFriendSearchResult', searchResult);
        },

        async setPlayerSearchResult(state, input) {
            var searchResult = [];
            var usernameResult = await UserService.getUserByUsername(input);
            if (usernameResult.length != 0) {
                var user = {username: usernameResult[0].username, img: usernameResult[0].img}
                searchResult.push(user);
            }
            state.commit('setPlayerSearchResult', searchResult);
        },
        

        setLookingForRandomOpponent(state) {
            state.commit('setLookingForRandomOpponent', true);
        },

        setCurrentGame(state, game) {
            state.commit('setCurrentGame', game)
        },

        async setInvites(state) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            var actualUser = user[0];
            state.commit('setInvites', actualUser.invites);
        },

        async addFriendToFriendslist(state, friend) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            var actualUser = user[0];
            var friends = actualUser.friends;
            friends.push(friend);

            await UserService.updateFriends(actualUser.username, friends);
            state.commit('setFriends', friends);
        },

        async addInviteToPlayersInvites(state, invite) {
            var opponent = await UserService.getUserByUsername(invite.receiverUsername);
            var opponentInvites = opponent[0].invites;
            var inviteID = "id" + Math.random().toString(16).slice(2);
            var newInvite = {username: invite.requesterUsername, img: invite.requesterImg, inviteID: inviteID };
            opponentInvites.push(newInvite);
            await UserService.updateInvites(invite.receiverUsername, opponentInvites);
        },

        async removeInvite(state, inviteID) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            var actualUser = user[0];
            var currentInvites = actualUser.invites;

            for (var i = 0; i < currentInvites.length; i++) {
                if(currentInvites[i].inviteID == inviteID) {
                    currentInvites.splice(i, 1);
                } 
            }
            await UserService.updateInvites(actualUser.username, currentInvites);
            state.commit('setInvites');

        },

        async lookForGameAgainstRandomOpponent(state) {
            // Check if any games are available
            var games = await GameService.getAvailableGames();

            // Get user
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            var date = new Date();
            // If there is a game, set player2 and update game
            if (games.length != 0) {
                // Find and update available game
                var availableGame = games[0];
                var player2 = {username: user[0].username, correctAnswers: 0, goFirst: false, dateOfLastTurn: date, myTurn: false, img: user[0].img, roundsPlayed: 0};
                var update = {player2: player2, isFull: true};
                await GameService.updateGame(availableGame._id, update);
                availableGame.player2 = player2;
                availableGame.isFull = true;

                // Add game to users ongoing games
                var ongoingGames = user[0].ongoingGames;
                ongoingGames.push(availableGame);
                await UserService.updateOngoingGames(user[0].username, ongoingGames);

                // No longer looking for opponent
                await UserService.setSearchingForGame(user[0].username, false);
                
                // Updating ongoing games in app
                state.commit('setOngoingGames', ongoingGames);
                state.commit('setLookingForRandomOpponent', false);
            }
            // If there isn't a game, make one and wait for opponent
            else {
                var player1 = {
                    username: user[0].username,
                    correctAnswers: 0,
                    goFirst: true,
                    dateOfLastTurn: date,
                    myTurn: true,
                    img: user[0].img,
                    roundsPlayed: 0
                }

                var emptyPlayer2 = {
                    username: "",
                    correctAnswers: 0,
                    goFirst: false,
                    dateOfLastTurn: date,
                    myTurn: false,
                    img: "",
                    roundsPlayed: 0
                }

                // Create the new game
                var gameId = "id" + Math.random().toString(16).slice(2);
                var newGame = {player1: player1, player2: emptyPlayer2, gameIsOver: false, roundNumber: 1, isFull: false, gameId: gameId};
                await GameService.createGame(newGame);
                state.commit('setLookingForRandomOpponent', true);

                // Look to see if game has been updated every 5 seconds for a total of 60 seconds
                var timesRun = 0;
                var interval = setInterval(async function(){
                    var game = await GameService.getGameByGameId(gameId);
                    timesRun +=1;
                    
                    // If the game has been updated (ie an opponent has joined)
                    if(game[0].player2.username != "") {

                        // Add game to users ongoing games
                        ongoingGames.push(game[0]);
                        await UserService.updateOngoingGames(user[0].username, ongoingGames);

                        // No longer looking for opponent
                        await UserService.setSearchingForGame(user[0].username, false);
                
                        // Updating ongoing games in app
                        state.commit('setOngoingGames', ongoingGames);
                        state.commit('setLookingForRandomOpponent', false)

                        // Stop running
                        clearInterval(interval);
                    }
                    if(timesRun === 6) {
                        // If no opponent found, set admin as opponent
                        var player2 = {username: "QuizNordTeamet", correctAnswers: 0, goFirst: false, dateOfLastTurn: date, myTurn: false, img: 'https://cdn.bulbagarden.net/upload/0/02/009Blastoise.png', roundsPlayed: 0};
                        var update = {player2: player2, isFull: true};
                        await GameService.updateGame(gameId, update);


                        // Update and ddd game to users ongoing games
                        var ongoingGames = user[0].ongoingGames;
                        game[0].player2 = player2;
                        game[0].isFull = true;
                        ongoingGames.push(game[0]);
                        await UserService.updateOngoingGames(user[0].username, ongoingGames);
                        // No longer looking for opponent
                        await UserService.setSearchingForGame(user[0].username, false);


                        // Add game to opponent ongoing games
                        var opponent = await UserService.getUserByUsername('QuizNordTeamet');
                        var opponentOngoingGames = opponent[0].ongoingGames;
                        opponentOngoingGames.push(game[0]);

                        await UserService.updateOngoingGames(opponent[0].username, opponentOngoingGames);
                        
                        // Updating ongoing games in app
                        state.commit('setOngoingGames', ongoingGames);
                        state.commit('setLookingForRandomOpponent', false);
                        clearInterval(interval);
                    }
                }, 5000);
            }
        },

        async createGameAgainstFriend(state, invite) {
            // Get user
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            var date = new Date();
            // Create players
            var player1 = {
                username: user[0].username,
                correctAnswers: 0,
                goFirst: true,
                dateOfLastTurn: date,
                myTurn: true,
                img: user[0].img,
                roundsPlayed: 0
            }

            var player2 = {
                username: invite.username,
                correctAnswers: 0,
                goFirst: false,
                dateOfLastTurn: date,
                myTurn: false,
                img: invite.img,
                roundsPlayed: 0
            }

            // Create the new game
            var gameId = "id" + Math.random().toString(16).slice(2);
            var newGame = {player1: player1, player2: player2, gameIsOver: false, roundNumber: 1, isFull: true, gameId: gameId};
            await GameService.createGame(newGame);

            // Add game to users ongoing games
            var ongoingGames = user[0].ongoingGames;
            ongoingGames.push(newGame);
            await UserService.updateOngoingGames(user[0].username, ongoingGames);

            // Add game to opponent ongoing games
            var opponent = await UserService.getUserByUsername(invite.username);
            var opponentOngoingGames = opponent[0].ongoingGames;
            opponentOngoingGames.push(newGame);
            await UserService.updateOngoingGames(opponent[0].username, opponentOngoingGames);

             // Updating ongoing games in app
             state.commit('setOngoingGames', ongoingGames);
        },


        async updateOngoingGamesAfterRound(state, updatedGame) {
            // Get user
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);

            // Get opponent
            let opponent = {};
            if (updatedGame.player1.username == user[0].username) {
                opponent = await UserService.getUserByUsername(updatedGame.player2.username);
            }

            else {
                opponent = await UserService.getUserByUsername(updatedGame.player1.username);
            }

            // Set ongoing games for user and opponent
            var userOngoingGames = user[0].ongoingGames;
            var opponentOngoingGames = opponent[0].ongoingGames;

            // Set previous games for user and opponent
            var userPreviousGames = user[0].previousGames;
            var opponentPreviousGames = opponent[0].previousGames;

            // Check if game is over
            if (updatedGame.player1.roundsPlayed === 2 && updatedGame.player2.roundsPlayed === 2) {

                // Move game from on going to previous games
                for (var i = 0; i < userOngoingGames.length; i++) {
                    if (userOngoingGames[i].gameId == updatedGame.gameId) {
                        // Add game to previous games. Remove from on going games
                        userPreviousGames.push(updatedGame);
                        userOngoingGames.splice([i], 1);
                    }
                }

                // Move game from on going to previous games
                for (var j = 0; j < opponentOngoingGames.length; j++) {
                    if (opponentOngoingGames[j].gameId == updatedGame.gameId) {
                        // Add game to previous games. Remove from on going games
                        opponentPreviousGames.push(updatedGame);
                        opponentOngoingGames.splice(j, 1);
                    }
                }
                // Add to previous games for both
                await UserService.updatePreviousGames(user[0].username, userPreviousGames);
                await UserService.updatePreviousGames(opponent[0].username, opponentPreviousGames);

                // Remove from on going games for both
                await UserService.updateOngoingGames(user[0].username, userOngoingGames);
                await UserService.updateOngoingGames(opponent[0].username, opponentOngoingGames);

                // Updating previous games in app
                state.commit('setPreviousGames', userPreviousGames);
            }

            else {
            // Update ongoing games for user
                for (var k = 0; k < userOngoingGames.length; k++) {
                    if (userOngoingGames[k].gameId == updatedGame.gameId) {
                        userOngoingGames.splice(k, 1, updatedGame);
                    }
                }

                // Update ongoing games for opponent
                for (var l = 0; l < opponentOngoingGames.length; l++) {
                    if (opponentOngoingGames[l].gameId == updatedGame.gameId) {
                        opponentOngoingGames.splice(l, 1, updatedGame);
                    }
                }

                // Apply update changes for both user and opponent
                await UserService.updateOngoingGames(user[0].username, userOngoingGames);
                await UserService.updateOngoingGames(opponent[0].username, opponentOngoingGames);
            }

            // Update state of ongoing games in app
            state.commit('setOngoingGames', userOngoingGames);

        },


    },
    modules: {

    },
    getters: {
        getOngoingGames: state => state.ongoingGames,
        getPreviousGames: state => state.previousGames,
        getLookingForRandomOpponent: state => state.lookingForRandomOpponent,
        getCurrentUser: state => state.currentUser,
        getCurrentGame: state => state.currentGame,
        getFriends: state => state.friends,
        getFriendSearchResult: state => state.friendSearchResult,
        getPlayerSearchResult: state => state.playerSearchResult
    }
})


