const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
  Movie.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const genre = req.body.genre;

  const newMovie = new Movie({title, genre});

  newMovie.save()
    .then(() => res.json('Movie added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;