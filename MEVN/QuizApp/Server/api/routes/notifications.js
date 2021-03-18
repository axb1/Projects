const express = require('express');
const router = express.Router();
var admin = require('firebase-admin');

// Initialize firebase app
admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });

router.post('/', async (req, res) => {
    const token = "dGWauRtnToS0COmEB22CIG:APA91bFM_Y1OA2rYVRF87DsTMXabqh8PNBWAXOjBDjZi7-f93E_Il0b09ftSurv3eEPAstecM1qZGcflly4YiML7Enl30xSJUYplF2S6YJBtw1Ny1kQI5dpwMvQQBkZWOdgQsJUL3IDy";
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
