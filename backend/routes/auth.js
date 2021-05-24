const router = require('express').Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;
    //console.log(req.headers);
    if(req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    //console.log(token);

    if(!token) {
        //return 404 not authirized
        //return req.status(404);
        return;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decodedToken);

    const user = await User.findById(decodedToken.id);

    if(!user) {
        //40 no user find
    }

    req.user = user;
    next();

};

router.route("/register").post((req, res, nxt) => {
    const { username, email, password } = req.body;
    //res.send("Register");

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

router.route("/library").get(protect, (req, res, nxt) => {
    res.status(200).json({success: true, data: "acces granted"});
});








module.exports = router;