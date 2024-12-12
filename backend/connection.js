const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);

mongoose.connection.once('open', function() {
    console.log('Connection has been made, thank you Elizabeth');
}).on('error', function(error) {
    console.log('Connection failed:', error);
});