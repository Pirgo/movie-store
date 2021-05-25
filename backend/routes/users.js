const router = require('express').Router();
let User = require('../models/user.model');
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