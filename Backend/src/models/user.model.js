const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique : [true, "Username already exists"],
        required : [true, "Username is required"]
    },
    email: {
        type: String,
        unique : [true, "Email already exists"],
        required : [true, "Email is required"]
    },
    password: {
        type: String,
        required : false,
        select: false

    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/Ajay02/userImage.webp?updatedAt=1775062815034"
    },
    //2000
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    //200
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel