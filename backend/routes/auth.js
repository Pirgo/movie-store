const router = require('express').Router();
const User = require('../models/user.model');

router.route("/register").post((req, res, nxt) => {
    const { username, email, password } = req.body;
    //res.send("Register");

    const user = User.create({
        userName: username,
        email: email,
        password: password
    });
    res.status(201).json({
        success: true,
        user
    });
});

router.route("/login").post((req, res, nxt) => {
    const { email, password } = req.body;
    //if !email or passwd


    const user = User.findOne({ email }).select("+password").then(user => {
        if(!user) {
            res.status(404).json({ success: false, error: "Invalid email" });
            return;
        }
        user.comparePassword(password).then(isMatch => {
            console.log(isMatch);
            if (isMatch) {
                res.status(200).json({ success: true, token: "sgfh" });
            } else {
                res.status(404).json({ success: false, error: "Invalid password" });
            }
        });
    });



});









module.exports = router;