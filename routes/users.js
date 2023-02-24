const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json(users)


    } catch (error) {
        res.status(400).json("Неправильный логин или пароль!")
    }
});

module.exports = router;