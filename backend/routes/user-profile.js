const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { route } = require('./library');


const protect = require('./protect');

router.route('/').get(protect, (req, res) => {
    User.findOne({ _id: req.user })
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;