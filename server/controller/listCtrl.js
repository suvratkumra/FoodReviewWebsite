const List = require("../model/ListModel");
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
    const parameter = req.params;


    const SPICE_LEVEL = [
        'Mild',
        'Medium',
        'Spicy',
        'Very Spicy',
    ];

    const DISH_CUISINE_TYPE = [
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
        'Other (Provide an input field for users to specify if the cuisine type is not listed)',
    ];

    const DISH_CATEGORY = [
        'Appetizer',
        'Soup',
        'Salad',
        'Main Course',
        'Side Dish',
        'Dessert',
        'Beverage',
        'Other (Provide an input field for users to specify if the category is not listed)',
    ];

    const INGREDIENTS = [
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
        'Other (Provide an input field for users to specify if the ingredient is not listed)',
    ];

    const PRESENTATION = [
        'Plated',
        'Buffet',
        'Takeout',
        'Fast Food',
        'Street Food',
        'Fine Dining',
        'Casual Dining',
        'Other (Provide an input field for users to specify if the presentation style is not listed)',
    ];

    const TASTE_PROFILE = [
        'Sweet',
        'Savory',
        'Spicy',
        'Sour',
        'Bitter',
        'Umami',
        'Balanced',
        'Other (Provide an input field for users to specify if the taste profile is not listed)',
    ];

    const PORTION_SIZE = [
        'Small',
        'Medium',
        'Large',
    ];

    const PRICE_RANGE = [
        'Inexpensive',
        'Moderate',
        'Expensive',
    ];

    switch (parameter.userOption) {
        case 'spice_level': {
            customResponse(req, res, 200, 'Approved', SPICE_LEVEL)
        }
            break;
        case 'dish_cuisine_type': {
            customResponse(req, res, 200, 'Approved', DISH_CUISINE_TYPE);
        }
            break;
        case 'dish_category': {
            customResponse(req, res, 200, 'Approved', DISH_CATEGORY);
        }
            break;
        case 'ingredients': {
            customResponse(req, res, 200, 'Approved', INGREDIENTS);
        }
            break;
        case 'taste_profile': {
            customResponse(req, res, 200, 'Approved', TASTE_PROFILE);
        }
            break;
        case 'portion_size': {
            customResponse(req, res, 200, 'Approved', PORTION_SIZE);
        }
            break;
        case 'price_range': {
            customResponse(req, res, 200, 'Approved', PRICE_RANGE);
        }
            break;
        default: {
            customError(req, res, 400, "Rejected");
        }
    }
}

const createNewList = async (req, res) => {

    try {
        // get the bare minimum for it from the body
        const { restaurantName, dishes } = req.body;

        const userId = req.UserIdExtracted.data;
        const list = await List.create({ restaurantName, dishes, userId: userId });

        if (list) {
            // update the user as well
            const user = await User.findByIdAndUpdate(userId, {
                $push: { lists: list }
            }, { new: true });
        }

        customResponse(req, res, 200, "Created new List", { list });
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
