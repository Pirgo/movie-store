const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');


const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

    //console.log();

    if (!token || token == 'null') {
        return res.status(404).json({
            success: false,
            error: 'not authorized'
        });

        next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'not authorized'
            });
        }

        req.user = user;
        next();
    } catch {
        return res.status(400).json({
            success: false,
            message: 'invalid token',
            error: 'invalid token'
        });
        next();
    }

};

module.exports = protect;