const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    phoneNumber: {
        type: Number,
        required: [true, "Your phone number is required"],
    },
    gender: {
        type: String,
        required: [true, "Your gender is required"],
    },
    images: {
        type: Array,
        default: [],
    },
    country: {
        type: String,
        required: [true, "Your country is required"],
    },
    state: {
        type: String,
        required: [true, "Your state is required"],
    },
    skills: {
        type: [String],
        required: [true, "Your skills are required"],
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

userSchema.pre("save", async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        next(error);
    }
})

module.exports = mongoose.model("User", userSchema);