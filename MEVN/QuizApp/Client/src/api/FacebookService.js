import axios from 'axios';

const url = 'https://graph.facebook.com/v10.0/';

class FacebookService {
    static getFriendsThatHaveApp(accessToken) {
        axios.get(url + "me/" + "friends/" + "?access_token=" + accessToken)
        .then(function (response) {
        // handle success
        console.log(response);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .then(function () {
        // always executed
        });
    }
}



export default FacebookService;