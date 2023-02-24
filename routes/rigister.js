const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    try {
        const { name, login, password } = req.body;
        const user = new User({ name, login, password: bcrypt.hashSync(password, 5) })
        await user.save()
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
    } catch (error) {
        res.status(400).json('Что-то пошло не так')
    }
});

module.exports = router;