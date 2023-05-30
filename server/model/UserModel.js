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
    profilePic: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    lists: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "List"
    },
    verification: {
        // VERIFIED / NOT_VERIFIED
        type: String
    },
},
    { timestamps: true });

const User = mongoose.model("User", userModel);

module.exports = User;