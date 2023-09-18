const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    ProfilePicture: {
        type: String,
        default: ""
    },
    CoverPicture: {
        type: String,
        default: ""
    },
    Followers: {
        type: Array,
        default: []
    },
    Following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    Desc: {
        type: String,
        max: 200
    },
    city: {
        type: String,
        max: 50
    },
    

},
    { timestamps: true })


    module.exports = mongoose.model("User",UserSchema); 