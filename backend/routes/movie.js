const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
    Movie.find()
        .then(movie => res.json(movie))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    // const title = req.body.title;
    // const genre = req.body.genre;
    // const date = req.body.date;
    // const runtime = req.body.runtime;
    // const plot = req.body.plot
    // const rate = req.body.rate;
    // const directors = req.body.directors;
    // const writers = req.body.writers;
    // const actors = req.body.actors;
    // const cover = req.body.cover;
    // const platforms = req.body.cover;

    // const newMovie = new Movie({
    //     title,
    //     genre,
    //     date, 
    //     runtime, 
    //     plot, 
    //     rate,
    //     directors,
    //     writers,
    //     actors,
    //     cover,
    //     platforms
    // });
    const newMovie = new Movie({
            ...req.body
        });

    newMovie.save()
        .then(() => res.json('Movie added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").get((req, res) => {
    Movie.findOne({_id: req.params.id})
        .then(movie => res.json(movie))
        .catch(err => res.status(404).json('Error: ' + err));
});

module.exports = router;