const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    department: String,
    password: {
        type: String,
        required: true,
        minlength: 6
    },
})

module.exports = mongoose.model('User', userSchema);