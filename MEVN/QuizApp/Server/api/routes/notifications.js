const express = require('express');
const router = express.Router();
var admin = require('firebase-admin');
var serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// Initialize firebase app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


router.post('/', async (req, res) => {
    const token = "eECL9qgcS2Oj_hb_qyDoU4:APA91bFo4ivH9d20QnM7WMw9Jq3jgFVN6hcpVX1IiubUYYIecKcP-60awF95SZJwjqGdWSwSi4ytkqAIbq-pSskkqfqmj_lU14d0fUJ-juretM0Al3iq9qf2LKb115Wc4_MznKYdgB5_";
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
