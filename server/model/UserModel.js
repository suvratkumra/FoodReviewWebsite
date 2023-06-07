const { default: mongoose } = require("mongoose");
const List = require("./ListModel");

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
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }
},
    { timestamps: true });

const User = mongoose.model("User", userModel);

module.exports = User;