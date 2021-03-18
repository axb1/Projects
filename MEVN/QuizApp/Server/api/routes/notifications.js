const express = require('express');
const router = express.Router();
var admin = require('firebase-admin');
var serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// Initialize firebase app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


router.post('/', async (req, res) => {
    const token = "epvPnYPFTZez8_8o7V7eo2:APA91bGarK8PbgC1vtL-jBtuj6cxySFjSeeXR7W4quGBq51TrllJhOqnxATOUSOgOuLXZWx3HodVbTCIlR1oUgJ2PUMUOrrPm5GrXDRw99qPhqY1_H7Dp5nQF9urBcaWbOeZ41o4XfqZ";
    var message = {
        data: {
          score: '850',
          time: '2:45'
        },
        token: token
      };

    try {
        admin.messaging().send(message)
        .then(function(response) {
            console.log("Succesfully sent message:", response)
        })
        .catch(function(error) {
            console.log("Error sending message:", error)
        })

    } catch(err){
        res.json({message: err})
    }
});

module.exports = router;
