import axios from 'axios';

const url = 'https://arcane-sands-35103.herokuapp.com/notification/';

class NotificationService {
    // Send notification
    static sendNotification(title, body, token) {
        return axios.post(url, {
            title: title,
            body: body,
            token: token
        });
    }
}



export default NotificationService;