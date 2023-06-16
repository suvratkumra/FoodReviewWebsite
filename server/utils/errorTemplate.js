const customError = (req, res, status = 401, message = "Not authorized", ...response) => {
    return res.status(status).json({ status: status, message: message, response });
}

module.exports = customError