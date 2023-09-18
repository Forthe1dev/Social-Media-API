const express = require('express');
const { model } = require('mongoose');
const router = express.Router();


const User=require('../models/User')
const bcrypt = require('bcrypt');


// Register API

router.post("/register", async(req,res)=>{
    try {
        //generate password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        //create a new user
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        })

          const user = await newUser.save();

        res.status(200).json({
            'message': 'Account Created successfully',
            'user':user,
        });
    } catch (err) {
        res.status(500).json(err)
    }
})


//Login

router.post("/login", async(req,res)=>{
    try {
        //find user
        const user = await User.findOne({email:req.body.email})
        !user && res.status(404).json("email is not found")

        //checking the password
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        !validPassword && res.status(422).json("Wrong credentials")

        const {password,...others}=user._doc;

        res.status(200).json({
            'message': 'Logged in successfully',
            'user':others,
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;