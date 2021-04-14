import axios from 'axios';

const url = 'https://arcane-sands-35103.herokuapp.com/lookingforgame/';

class LookingForGameService {
        // Create looking for game
        static createLookingForGame(username) {
            return axios.post(url, {
                username: username
            });
        }
}



export default LookingForGameService;