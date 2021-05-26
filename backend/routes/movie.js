const router = require('express').Router();
const { emit } = require('../models/movie.model');
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

router.route('/id/:id').get((req, res) => {
    Movie.findOne({_id: req.params.id})
        .then(movie => res.json(movie))
        .catch(err => res.status(404).json('Error: ' + err));
});

router.route('/id/:id').delete((req,res)=>{
    Movie.findByIdAndDelete(req.params.id, (err, doc) =>{
        if(err) console.log(err)
        else{
            res.json(doc)
        }
    })
        
});

router.route('/filters/runtime').get((req, res) => {
    Movie.distinct( 'runtime' )
        .then(runtime => res.json(runtime))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/filters/year').get((req, res) => {
    Movie.aggregate([
        {$project: {year: {$year: "$date"}, _id: 0}},
        {$group: {_id: "$year"}}
    ])
    .then(years => res.json(years.map(obj => obj._id).sort()))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/filters/genre').get((req, res) => {
    Movie.distinct('genre')
        .then(genres => res.json(genres))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/filters/platform').get((req, res) => {
    Movie.distinct('platforms.name')
        .then(platforms => res.json(platforms))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/filtered').post((req, res) => {
    //console.log(req.body.params);
    let filter = {}
    let query = {}
    for (const [key, value] of Object.entries(req.body.params)) {
        if(value !== "-"){
            //TODO przydaloby sie to zmienic ale chyba dziala
            if (key === "date"){
                let start = new Date(String(value)+'-1-1')
                let end = new Date(String(parseInt(value)+1)+'-1-1')
                query["date"] = {$gte: start, $lt: end}
            }
            else if (key === "platforms"){
                query["platforms.name"] = value
            }
            else{
                query[key] = value
            }
        }
      }
    //console.log(query)
    Movie.find(query)
        .then(movie => res.json(movie))
        .catch(err => res.status(404).json('Error: ' + err));
});

module.exports = router;