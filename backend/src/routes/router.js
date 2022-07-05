const express = require('express');
const router = express.Router();
const { signup, login, myProfile, logout } = require('../controllers/controller')


router.post('/signup', signup)
router.get('/my-profile', myProfile)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router;