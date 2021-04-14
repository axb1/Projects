const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const LookingForGame = require('./api/models/lookingForGame');

const app = express();


// Connect to DB
mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import routes
const questionRoutes = require('./api/routes/questions.js');
const adminRoutes = require('./api/routes/admins.js');
const userRoutes = require('./api/routes/users.js');
const lookingForGameRoutes = require('./api/routes/lookingForGames.js');
const notificationRoutes = require('./api/routes/notifications.js');

app.use('/question', questionRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/lookingForGame', lookingForGameRoutes);
app.use('/notification', notificationRoutes);

// Set to port 5000 and listen on port
const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => console.log(`Server started on port ${port}`));

async function matchPlayers() {
    // Get 
    let lookingForGames = await LookingForGame.find();
    console.log(lookingForGames);

}

setInterval(matchPlayers, 5000);

