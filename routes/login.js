const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    login: user.login,
                    isAdmin: user.isAdmin
                },
                'SECRET_KEY',
                {
                    expiresIn: '30d'
                }
            );
            return res.status(200).json({
                ...user._doc,
                token
            })
        }
        return res.status(403).json("Неправильный логин или пароль!")


    } catch (error) {
        res.status(400).json("Неправильный логин или пароль!")
    }
});

module.exports = router;