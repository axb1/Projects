import {createStore} from 'vuex';
import UserService from '../api/UserService';
import LookingForGameService from '../api/LookingForGameService';

import firebase from 'firebase';

export default createStore({
    state: {
        ongoingGames: [],
        previousGames: [],
        lookingForRandomOpponent: 0,
        currentGame: {},
        currentUser: {},
        friends: [],
        friendSearchResult: String,
        playerSearchResult: String,
        invites: [],
        token: String,
        didRegisterForNotifications: false,
        currentTime: Date,
        FBAccessToken: String,
        categories: []
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
        setToken(state, payload) {
            state.token = payload;
        },
        setDidRegisterForNotifications(state, payload) {
            state.didRegisterForNotifications = payload;
        },
        setCurrentTime(state, payload) {
            state.currentTime = payload;
        },
        setFBAccessToken(state, payload) {
            state.FBAccessToken = payload
        },
        setCategories(state, payload) {
            state.categories = payload;
        }
    },
    actions: {
        async setOngoingGames(state, obj) {
            var firebaseUser = firebase.auth().currentUser;

            var user = await UserService.getUserByEmail(firebaseUser.email);
            if (user[0].ongoingGames.length !=0) {
                var games = user[0].ongoingGames;
                state.commit('setOngoingGames', games);
            } else {
                state.commit('setOngoingGames', [])
            }

            if(obj != undefined) {
                console.log(obj);
                if(user[0].ongoingGames.length != obj.ongoingGamesLength) {
                    let newValue = obj.lookingForRandomOpponent - (user[0].ongoingGames.length-obj.ongoingGamesLength)
                    console.log(newValue);
                    state.commit('setLookingForRandomOpponent', newValue)
                }
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
            var user = [];
            var counter = 0;
            while(user.length == 0) {
                user = await UserService.getUserByEmail(firebaseUser.email);
                counter = counter +1;

                if (counter == 10) {
                    break;
                }
            }
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
                var user = {username: usernameResult[0].username, img: usernameResult[0].img, token: usernameResult[0].token}
                searchResult.push(user);
            }
            state.commit('setPlayerSearchResult', searchResult);
        },
        
        setCurrentGame(state, game) {
            state.commit('setCurrentGame', game)
        },

        setCurrentTime(state) {
            var time = new Date();
            state.commit('setCurrentTime', time);
        },

        async setInvites(state) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            var actualUser = user[0];
            state.commit('setInvites', actualUser.invites);
        },

        async setToken(state, token) {
            state.commit('setToken', token);
        },

        async setDidRegisterForNotifications(state, didRegisterForNotifications) {
            state.commit('setDidRegisterForNotifications', didRegisterForNotifications);
        },

        setFBAccessToken(state, token) {
            state.commit('setFBAccessToken', token);
        },
        
        setCategories(state, categories) {
            state.commit('setCategories', categories);
        },

        async addFriendToFriendslist(state, friend) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            var actualUser = user[0];
            var friends = actualUser.friends;
            var alreadyAFriend = false;
            

            friends.forEach(element => {
                if(element.username == friend.username) {
                    alreadyAFriend = true
                }
            });

            if (alreadyAFriend == false && friend.username != actualUser.username) {
                friends.push(friend);
            } 
            await UserService.updateFriends(actualUser.username, friends);
            state.commit('setFriends', friends);
        },

        async addInviteToPlayersInvites(state, invite) {
            var opponent = await UserService.getUserByUsername(invite.receiverUsername);
            var opponentInvites = opponent[0].invites;
            var inviteID = "id" + Math.random().toString(16).slice(2);
            var newInvite = {username: invite.requesterUsername, img: invite.requesterImg, inviteID: inviteID, token: invite.token };
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
            state.commit('setInvites', currentInvites);

        },

        async lookForGameAgainstRandomOpponent(state, currentLookingForGameAgainstRandomOpponent) {
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            await LookingForGameService.createLookingForGame(user[0].username);
            let newValue = currentLookingForGameAgainstRandomOpponent + 1;
            state.commit("setLookingForRandomOpponent", newValue);
        },

        async createGameAgainstFriend() {


        },

        async updatePreviousQuestionsAfterRound(state, updatedPreviousQuestions) {
            // Get user
            var firebaseUser = firebase.auth().currentUser;
            var user = await UserService.getUserByEmail(firebaseUser.email);
            await UserService.updatePreviousQuestions(user[0].username, updatedPreviousQuestions);
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
            console.log(user);
            console.log(opponent);

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
                    if (userOngoingGames[i]._id == updatedGame._id) {
                        // Add game to previous games. Remove from on going games
                        userPreviousGames.push(updatedGame);
                        userOngoingGames.splice([i], 1);
                    }
                }

                // Move game from on going to previous games
                for (var j = 0; j < opponentOngoingGames.length; j++) {
                    if (opponentOngoingGames[j]._id == updatedGame._id) {
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
                    if (userOngoingGames[k]._id == updatedGame._id) {
                        userOngoingGames.splice(k, 1, updatedGame);
                    }
                }

                // Update ongoing games for opponent
                for (var l = 0; l < opponentOngoingGames.length; l++) {
                    if (opponentOngoingGames[l]._id == updatedGame._id) {
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
        getPlayerSearchResult: state => state.playerSearchResult,
        getToken: state => state.token,
        getDidRegisterForNotifications: state => state.didRegisterForNotifications,
        getCurrentTime: state => state.currentTime,
        getFBAccessToken: state => state.FBAccessToken,
        getCategories: state => state.categories
    }
})


