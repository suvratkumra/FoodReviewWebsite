const customResponse = (req, res, status, message, ...response) => {
    return res.status(status).json({ status: status, message: message, response });
}

module.exports = customResponse