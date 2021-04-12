import axios from 'axios';

const url = 'https://arcane-sands-35103.herokuapp.com/user/';

class UserService {
    // Get users
    static getUsers() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user,
                        createdAt: new Date(user.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    // Get guests
    static getGuests() {
        return new Promise ((resolve,reject) => {
            axios.get(url + "guest").then((res) => {
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user,
                        createdAt: new Date(user.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }


    // Get user by name
    static getUserByEmail(email) {
        return new Promise ((resolve,reject) => {
            axios.get(url + email).then((res) => {
                const data = res.data;
                resolve(
                    data.map(user => ({
                        ...user,
                        createdAt: new Date(user.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }

        // Get user by username
        static getUserByUsername(username) {
            return new Promise ((resolve,reject) => {
                axios.get(url + "username/" + username).then((res) => {
                    const data = res.data;
                    resolve(
                        data.map(user => ({
                            ...user,
                            createdAt: new Date(user.createdAt)
                        }))
                    );
                })
                .catch((err)=> {
                    reject(err);
                })
                
            });
        }

        // Get users searching for game
        static getUsersSearchingForGame() {
            return new Promise ((resolve,reject) => {
                axios.get(url + "search/searchingforgame").then((res) => {
                    const data = res.data;
                    resolve(
                        data.map(user => ({
                            ...user,
                            createdAt: new Date(user.createdAt)
                        }))
                    );
                })
                .catch((err)=> {
                    reject(err);
                })
                
            });
        }

    // Create user
    static createUser(username, email, img) {
        return axios.post(url, {
            username: username,
            email: email,
            allTimeStats: [],
            ongoingGames: [],
            previousGames: [],
            searchingForGame: false,
            img: img,
            token: "",
            previousQuestions: []
        });
    }

    // Update ongoing games
    static updateOngoingGames(username, ongoingGames) {
        return axios.put(url + 'ongoinggames', {
            username: username,
            ongoingGames: ongoingGames
        })
    }

    // Update previous games
    static updatePreviousGames(username, previousGames) {
        return axios.put(url + 'previousgames', {
            username: username,
            previousGames: previousGames
        })
    }

    // Update previous games
    static updatePreviousQuestions(username, previousQuestions) {
        return axios.put(url + 'previousquestions', {
            username: username,
            previousQuestions: previousQuestions
        })
    }

    // Update friends
    static updateFriends(username, friends) {
        return axios.put(url + 'friends', {
            username: username,
            friends: friends
        })
    }

    // Update invites
    static updateInvites(username, invites) {
        return axios.put(url + 'invites', {
            username: username,
            invites: invites
        })
    }

    // Update invites
    static updateToken(username, token) {
        return axios.put(url + 'token', {
            username: username,
            token: token
        })
    }
    

    static setSearchingForGame(username, searchingForGame) {
        return axios.put(url + "searchingforgame", {
            username: username,
            searchingForGame: searchingForGame
        })

    }
}

export default UserService;