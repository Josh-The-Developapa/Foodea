const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    joined: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();

    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, salt)

})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getSignedJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

const User = mongoose.model('Users', userSchema)
module.exports = User;