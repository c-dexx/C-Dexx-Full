const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],  
        unique: true,  
        lowercase: true,  
        trim: true,  
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'],  // Email format validation
      },
      password: {
        type: String,
        required: true,
      },
      review: {
        type: String,
      },
});
const User = mongoose.model('User', userSchema);
module.exports = User;