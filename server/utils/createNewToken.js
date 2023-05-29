const jwt = require('jsonwebtoken');

const createNewToken = (user) => {
    // generate the token for the user.
    const token = "Bearer " + jwt.sign({ data: user._id.toString() },
        process.env.JSONWEBTOKEN_SECRET, { expiresIn: '1h' });

    return token;
}
module.exports = createNewToken;