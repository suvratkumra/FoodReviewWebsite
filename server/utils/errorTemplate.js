const customError = (req, res, status, message) => {
    return res.status(status).json({ status: status, message: message });
}

module.exports = customError