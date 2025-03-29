const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    joiningTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

 module.exports = mongoose.model("User", userModel);