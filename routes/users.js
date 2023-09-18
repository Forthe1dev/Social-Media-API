const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User");
const Post = require("../models/Post");

// Update User API
router.put("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { authenticatedUserId } = req.body; 

        // Verifification of the user
        if (userId !== authenticatedUserId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const { username, password, profilePicture, coverPicture, desc, city } = req.body;

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update username if provided
        if (username) {
            user.username = username;
        }

        // Update password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Update other fields if provided
        user.ProfilePicture = profilePicture || user.ProfilePicture;
        user.CoverPicture = coverPicture || user.CoverPicture;
        user.Desc = desc || user.Desc;
        user.city = city || user.city;

        await user.save();

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});


//Get user's all followers

router.get("/:userId/followers", async (req, res) => {

    try {
        const user = await User.findById(req.params.userId);
        if(!user){res.status(404).json("User not found")}

        const followers = user.Followers;

        res.status(200).json({ followers });
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//Get user's all followings
router.get("/:userId/followings", async (req, res) => {

    try {
        const user = await User.findById(req.params.userId);
        if(!user){res.status(404).json("User not found")}

        const followings = user.Following;

        res.status(200).json({ followings });
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//Remove user

router.delete("/:userId/delete", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        console.log(user);
        if (!user || (Array.isArray(user) && user.length === 0)) {
            return res.status(404).json("User not found")
        }

        await Post.deleteMany({ userId: user._id });
        await User.deleteOne({ _id: user._id });

        res.status(200).json({ message: "User and associated posts deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
