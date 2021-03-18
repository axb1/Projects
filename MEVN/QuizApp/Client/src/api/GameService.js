import axios from 'axios';

const url = 'https://arcane-sands-35103.herokuapp.com/game/';

class GameService {
    // Get all games
    static getGames() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                const data = res.data;
                resolve(
                    data.map(games => ({
                        ...games,
                        createdAt: new Date(games.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }

        // Get users searching for game
    static getAvailableGames() {
        return new Promise ((resolve,reject) => {
            axios.get(url + "available").then((res) => {
                const data = res.data;
                resolve(
                    data.map(games => ({
                        ...games,
                        createdAt: new Date(games.createdAt)
                    }))
                );
            })
            .catch((err)=> {
                reject(err);
            })
                
        });
    }

        // Get game by gameid
        static getGameByGameId(gameId) {
            return new Promise ((resolve,reject) => {
                axios.get(url + "gameid/" + gameId).then((res) => {
                    const data = res.data;
                    resolve(
                        data.map(game => ({
                            ...game,
                            createdAt: new Date(game.createdAt)
                        }))
                    );
                })
                .catch((err)=> {
                    reject(err);
                })
                
            });
        }

    // Create game
    static createGame(game) {
        return axios.post(url, {
            player1: game.player1,
            player2: game.player2,
            gameIsOver: false,
            roundNumber: 1,
            isFull: false,
            gameId: game.gameId
        });
    }
    // Update game
    static updateGame(id, update) {
        return axios.put(url, {
            id: id,
            player2: update.player2,
            isFull: update.isFull
        })

    }
}



export default GameService;