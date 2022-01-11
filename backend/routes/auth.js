const router = require('express').Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const protect = require('./protect');

router.route("/register").post((req, res, nxt) => {
    const { username, email, password } = req.body;

    User.create({
        userName: username,
        email: email,
        password: password
    }).then(user => {
        const token = user.getToken();
        res.status(201).json({
            success: true,
            token: token
        });
    });

});

router.route("/login").post((req, res, nxt) => {
    const { email, password } = req.body;
    //if !email or passwd

    if (!email || !password) {
        res.status(404).json({ success: false, error: "Invalid data" });
        return;
    }

    const user = User.findOne({ email }).select("+password").then(user => {
        if (!user) {
            res.status(404).json({ success: false, error: "Invalid email" });
            return;
        }
        user.comparePassword(password).then(isMatch => {
            if (isMatch) {
                const token = user.getToken();
                res.status(201).json({ success: true, token: token });
            } else {
                res.status(404).json({ success: false, error: "Invalid password" });
            }
        });
    });

});


module.exports = router;