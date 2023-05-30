const customError = (req, res, status = 401, message = "Not authorized") => {
    return res.status(status).json({ status: status, message: message });
}

module.exports = customError