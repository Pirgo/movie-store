const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;
  console.log(req.headers);
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token);

  if (!token) {
    //return 404 not authirized
    //return req.status(404)
    //console.log("dsgsdfgsfgfshdfh");
    return res.status(404).json({
      success: false,
      error: 'not authorized'
    });

  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(decodedToken);

  const user = await User.findById(decodedToken.id);

  if (!user) {
    //40 no user find
  }

  req.user = user;
  next();

};


router.route('/').get(protect, (req, res) => {
  //console.log('sfhgdfh');
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