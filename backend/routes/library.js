const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const protect = require('./protect');



router.route('/').get(protect, (req, res) => {
  User.findOne({_id: req.user})
    .then(user => {
      res.json(user.library);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/towatch').get(protect, (req, res) => {
  User.findOne()
    .then(user => res.json(user.library.toWatch))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/favourites').get(protect, (req, res) => {
  User.findOne()
    .then(user => res.json(user.library.favourites))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/seen').get(protect, (req, res) => {
  User.findOne()
    .then(user => res.json(user.library.seen))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;