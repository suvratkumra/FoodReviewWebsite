const mongoose = require('mongoose');
const User = require('./UserModel');

const feedbackModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ratings: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5]
    },
    description: {
        type: String,
        required: true
    }
}, { timestamp: true });

const Feedback = mongoose.model("Feedback", feedbackModel);

module.exports = Feedback;