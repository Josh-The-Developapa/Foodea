const axios = require('axios');
const User = require('../models/Users');
const ErrorResponse = require('../Utils/errorResponse.js');
const jwt = require('jsonwebtoken');

function sendTokenResponse(user, res, statusCode) {
    const token = user.getSignedJWT();

    res
        .status(statusCode)
        .cookie('jwt_cookie', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })
        .json({ success: true, data: user })
}

module.exports.signup = async function (req, res, next) {
    try {
        const { name, password, telephone } = req.body;
        if (!name) {
            return next(new ErrorResponse('Please enter a name', 400))
        }

        if (!password) {
            return next(new ErrorResponse('Please enter a password', 400))
        }

        if (req.cookies.jwt_cookie) {
            return next(new ErrorResponse("You are already logged in", 400))
        }
        const user = await User.create({
            name: name,
            password: password,
        })

        // sendSMS('Hi there, this is a test SMS from Foodea')

        sendTokenResponse(user, res, 200)
    } catch (error) {
        next(error)
    }
}

module.exports.myProfile = async function (req, res, next) {
    const token = req.cookies.jwt_cookie;
    if (!token) {
        return next(new ErrorResponse("You are not logged in", 400))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    res.json({
        success: true,
        user: req.user
    })
}

module.exports.logout = async function (req, res, next) {
    res.cookie('jwt_cookie', 'none', {
        expires: new Date(Date.now())
    })
    res.json({
        success: true,
        message: 'Successfully logged out'
    })
}

module.exports.login = async function (req, res, next) {
    try {
        const { name, password } = req.body;
        if (req.cookies.jwt_cookie) {
            return next(new ErrorResponse('Already Logged In', 400))
        }

        if (!name) {
            return next(new ErrorResponse('Please enter a name', 400))
        }

        if (!password) {
            return next(new ErrorResponse('Please enter a password', 400))
        }

        const user = await User.findOne({
            name: name,
        })

        if (!user) {
            return next(new ErrorResponse("Invalid credentials, try again", 400))
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse('Invalid password', 400))
        }

        sendTokenResponse(user, res, 200)
    } catch (error) {
        next(error)
    }
}