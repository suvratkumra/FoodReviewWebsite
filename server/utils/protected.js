const customError = require("./errorTemplate");
const jwt = require('jsonwebtoken')

const authorization = (req, res, next) => {
    if (!req.headers.authorization) {
        customError(req, res, 401, "Authorization token missing");
    }
    else {

        // spliting the authorization token
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET, (err, response) => {
            if (err) {
                customError(req, res, 403, "Token Invalid/Expired. Please sign in again");
            }
            else {
                req.UserIdExtracted = response;
                next();
            }
        });
    }
}

module.exports = authorization;