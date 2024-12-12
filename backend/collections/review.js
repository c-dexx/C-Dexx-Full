const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
      },
    text: {
        type: String,
      },
    rating: {
        type: Number,
    },
    movie:{
        type: String
    }
});
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;