const express = require('express');
const UserModel = require('../models/user.model');
const crypto = require("crypto-js");
const router = express.Router();

router.post('/veggiebox/users/register', async (req, res) => {
    const { username, password } = req.body;
      
    // check if user already exists
    const existingUser = await UserModel.findOne({ username: username });
    if (existingUser) {
        return res.status(400).json("Username already exists.");
    }

    // hash password and save user with user access
    const hashedPassword = crypto.SHA3(password).toString();
    const userToSave = {
        username: username,
        password: hashedPassword,
        access: "user"
    }
    const savedUser = await UserModel.create(userToSave);
    res.status(201).json({id: savedUser._id, username: savedUser.username});
});
    

router.post('/veggiebox/users/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username:username });

    if (!user || !crypto.SHA3(password).toString() === user.password) {    
        return res.status(401).json("Incorrect password or username!");
    }

    //create session
    req.session.username = user.username
    req.session.access = user.access
    res.status(200).json({id: user._id, username: user.username});
});

router.post('/veggiebox/users/logout', async (req, res) => {
    req.session = null;
    res.status(200).json("Logged out.");
});

module.exports = router;