const List = require("../model/ListModel");
const Profile = require("../model/ProfileModel");
const User = require("../model/UserModel");
const customError = require("../utils/errorTemplate");
const customResponse = require("../utils/responseTemplate");


const getAllLists = async (req, res) => {
    try {
        const lists = await List.find();
        customResponse(req, res, 200, "Approved", { lists });
    }
    catch (err) {
        customError(req, res, err?.code, err?.message);
    }
};

const userOptionsCtrl = async (req, res) => {
    const SPICE_LEVEL = [
        'None',
        'Mild',
        'Medium',
        'Spicy',
        'Very Spicy',
    ];

    const DISH_CUISINE_TYPE = [
        'None',
        'American',
        'Asian',
        'Indian',
        'Italian',
        'Mexican',
        'Middle Eastern',
        'Mediterranean',
        'Chinese',
        'Japanese',
        'Thai',
        'French',
        'Greek',
        'African',
        'South American',
        'Other',
    ];

    const DISH_CATEGORY = [
        'None',
        'Appetizer',
        'Soup',
        'Salad',
        'Main Course',
        'Side Dish',
        'Dessert',
        'Beverage',
        'Other',
    ];

    const INGREDIENTS = [
        'None',
        'Meat',
        'Poultry',
        'Seafood',
        'Vegetarian',
        'Vegan',
        'Gluten-Free',
        'Dairy-Free',
        'Nut-Free',
        'Soy-Free',
        'Egg-Free',
        'Other',
    ];

    const PRESENTATION = [
        'None',
        'Plated',
        'Buffet',
        'Takeout',
        'Fast Food',
        'Street Food',
        'Fine Dining',
        'Casual Dining',
        'Other',
    ];

    const TASTE_PROFILE = [
        'None',
        'Sweet',
        'Savory',
        'Spicy',
        'Sour',
        'Bitter',
        'Umami',
        'Balanced',
        'Other',
    ];

    const PORTION_SIZE = [
        'None',
        'Small',
        'Medium',
        'Large',
    ];

    const PRICE_RANGE = [
        'None',
        'Inexpensive',
        'Moderate',
        'Expensive',
    ];
    // console.log("here");
    customResponse(req, res, 200, 'Approved', {
        SPICE_LEVEL,
        DISH_CUISINE_TYPE,
        DISH_CATEGORY,
        INGREDIENTS,
        PRESENTATION,
        TASTE_PROFILE,
        PORTION_SIZE,
        PRICE_RANGE
    });
}

const createNewList = async (req, res) => {
    try {
        // console.log("vioytd", req.body);
        // console.log("files", req.file);

        // get the bare minimum for it from the body
        const { restaurantName, dish } = req.body;
        const filePath = req.file.path;

        const newDish = {
            dishName: dish.dishName,
            description: dish.description,
            userOptionList: dish.userOptionList,
            photo: filePath
        }

        console.log(newDish)

        const userId = req.UserIdExtracted.data;

        // get all the user lists
        const user = await User.findById(userId);
        const userProfile = user.profileId;
        // console.log(userProfile);

        // get all the lists user created
        const userLists = await List.find({ userId: userId });

        var existingRestFound = false;

        // now map over the lists to find out if there is existing list for the restaurant available.
        userLists.forEach(async (list) => {
            if (list.restaurantName === restaurantName) {
                const existingDishes = list.dishes;

                existingDishes.push(newDish);

                existingRestFound = true;

                // update the list. 
                await List.updateOne({ _id: list._id }, { dishes: existingDishes });
            }
        });

        if (!existingRestFound) {
            const list = await List.create({ restaurantName, newDish, userId: userId });

            if (list) {
                // update the user as well
                const profile = await Profile.findByIdAndUpdate(userProfile, {
                    $push: { lists: list }
                }, { new: true });
            }
        }
        const message = existingRestFound ? "Appended the old list" : "Created a new list"
        customResponse(req, res, 200, "Approved", message);

    } catch (err) {
        customError(req, res, err?.code, err?.message);
    }


};

const getMyListsCtrl = async (req, res) => {
    // get the lists for the user
    try {
        const userId = req.UserIdExtracted.data;

        // get just the restaurant names
        const lists = await List.find({ userId: userId }, { restaurantName: true });

        customResponse(req, res, 200, "Lists extracted", { lists });
    } catch (e) {
        customError(req, res, e?.status, e?.message);
    }
}

const getMyListByIdCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.UserIdExtracted.data;

        const list = await List.findById(id);

        customResponse(req, res, 200, "List extractd", { list });
    } catch (e) {
        customError(req, res, e?.status, e?.message);
    }
}

module.exports = { createNewList, getAllLists, getMyListByIdCtrl, getMyListsCtrl, userOptionsCtrl };
