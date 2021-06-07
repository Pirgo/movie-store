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
    People.findOne({id: req.params.id})
        .then(people => {
            res.json(people)})
        .catch(err => {
            res.status(404).json('Error: ' + err)});
});

router.route('/filtered').post((req,res) => {
    const query = {name : {$regex : `.*${req.body.name}.*`, $options: "$i"}}
    People.find(query)
        .then(people => res.json(people))
        .catch(err => res.status(404).json('Error: ' + err))
})


module.exports = router;