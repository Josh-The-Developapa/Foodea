const ErrorResponse = require("../Utils/errorResponse");
function errorHandler(err, req, res, next) {
    let error = { ...err };
    error.message = err.message

    if (err.code == 11000) {
        error = new ErrorResponse("Duplicate field value entered", 400)
    }


    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    })
}

module.exports = errorHandler;