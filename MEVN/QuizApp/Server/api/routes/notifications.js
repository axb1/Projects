const express = require('express');
const router = express.Router();
var admin = require('firebase-admin');

// Initialize firebase app
admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });

router.post('/', async (req, res) => {
    const token = "ezAqNzNUTe-W8XuxKGigJy:APA91bGy8sAPB9wnpzHjOf6BePZ77rYXk_fE76Bll373yWD40FIcQqsvJREQZhK8qZwYKLaP_cLf1PM-kGIvk75I2niAnxeHPd9vk_9O8tgqeUBXSHUQP97X3RW9ux0X3GMuah7wJ7s-";
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