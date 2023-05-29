const { default: mongoose } = require("mongoose");

const listModel = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    dishes: {
        type: {
            dishType: { type: String },
            photo: { type: String },
            ratings: { type: Number },
            description: { type: String }
        },
        required: true
    }
},
    { timestamps: true });

const List = mongoose.model("List", listModel);

module.exports = List;