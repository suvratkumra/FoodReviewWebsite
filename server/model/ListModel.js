const { default: mongoose } = require("mongoose");

const listModel = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    dishes: [{
        type: {
            dishName: { type: String, required: true },
            dishType: { type: String },
            photo: { type: String },
            ratings: { type: Number, required: true },
            description: { type: String }
        },
        required: true
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true });

const List = mongoose.model("List", listModel);

module.exports = List;