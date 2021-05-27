const router = require('express').Router();
let People = require('../models/people.model');

router.route('/').get((req, res) => {
    People.find()
        .then(people => res.json(people))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const newHuman = new People({ ...req.body });

    newHuman.save()
        .then(() => res.json('Human added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/id/:id').get((req, res) => {
    People.findOne({_id: req.params.id})
        .then(movie => res.json(movie))
        .catch(err => res.status(404).json('Error: ' + err));
});

module.exports = router;