const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const protect = require('./protect');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const newUser = new User({ ...req.body });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/username').get(protect, (req, res, nxt) => {
  res.status(200).json({success: true, name: req.user.userName});
});


router.route('/user').get(protect, (req,res,nxt)=>{
  res.status(200).json({success: true, user: req.user})
})


module.exports = router;