const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    },

    profilePic: {
        type: String
    }
},
    { timestamps: true });

const User = mongoose.model("User", userModel);

module.exports = User;