const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  console.log('sfhgdfh');
  User.findOne()
    .then(user => {
      console.log(user.library);
      res.json(user.library.toWatch);
      console.log(user.library);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/towatch').get((req, res) => {
  User.findOne()
    .then(user => res.json(user.library.toWatch))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/favourites').get((req, res) => {
    User.findOne()
      .then(user => res.json(user.library.favourites))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/seen').get((req, res) => {
    User.findOne()
      .then(user => res.json(user.library.seen))
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;