const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String
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
        type: {
            verificationCode: { type: Number },
            createdAt: { type: Date },
            expiresAt: { type: Date },
            isVerified: { type: Boolean }
        }
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback"
    }
},
    { timestamps: true });

const Profile = mongoose.model("Profile", userModel);

module.exports = Profile;