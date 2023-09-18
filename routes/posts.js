const express = require('express');
const router = express.Router();

const Post = require("../models/Post");
const User = require("../models/User");

//CREATE POST

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
         const savedPost = await newPost.save();
        res.status(200).json({
            "message": "post created successfully!!",
            "data": newPost
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


//UPDATE POST

router.put("/:id", async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body }, { new: true });
            res.status(200).json({
                "message": "your post has been updated",
                "data": post
            });
        }
        else {
            res.status(403).json("invalid")
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

//delete post

router.delete("/:id", async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json({
                "message": "your post has been deleted",
            });
        }
        else {
            res.status(403).json("invalid")
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL POSTS

router.get("/", async (req, res) => {

    try {
        const postsss = await Post.find();
        res.status(200).json(postsss)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//GET a post  by id

router.get("/:id", async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            res.status(200).json(post)
        }
        else {
            res.status(403).json("invalid")
        }

    } catch (error) {
        res.status(500).json(error)
    }
})


// Post Like/dislike API

router.post("/:id/like", async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        const userId = req.body.userId;
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post has been liked")
        }
        else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("Post has been Unliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


//GET a users all post

router.get("/postsByEmail/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router