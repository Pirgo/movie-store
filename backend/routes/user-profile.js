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

router.route('/update/firstname').post(protect, (req, res) => {
    //console.log(req.body.firstname);
    User.findByIdAndUpdate({ _id: req.user._id }, { $set: { "firstName": req.body.value } })
        .then(user => {
            res.status(202);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        });
});

router.route('/update/lastname').post(protect, (req, res) => {
    //console.log(req.body.firstname);
    User.findByIdAndUpdate({ _id: req.user._id }, { $set: { "lastName": req.body.value } })
        .then(user => {
            res.status(202);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        });
});

router.route('/update/description').post(protect, (req, res) => {
    //console.log(req.body.firstname);
    User.findByIdAndUpdate({ _id: req.user._id }, { $set: { "description": req.body.value } })
        .then(user => {
            res.status(202);
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        });
});

module.exports = router;