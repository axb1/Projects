const express = require('express');
const router = express.Router();
var admin = require('firebase-admin');
var serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// Initialize firebase app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


router.post('/', async (req, res) => {
  var message = {
    notification: {
      title: req.body.title,
      body: req.body.body
    },
    token: req.body.token
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
