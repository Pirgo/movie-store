const router = require('express').Router();
let People = require('../models/people.model');

router.route('/').get((req, res) => {
    People.find().sort({name: 1})
        .then(people => res.json(people))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/page/:page').get((req, res) => {
    const page = req.params.page;
    People.find().sort({name: 1}).skip((page-1)*30).limit(30)
        .then(people => res.json(people))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/count/').get((req, res) => {
    People.countDocuments({}, (err, count)=>{
        if(err){
            res.status(400).json('Error: ' + err)
        }
        else{
            res.json(count)
        }
    })
})

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
    let query = {}
    if(req.body.name !== "-"){
        query = {name : {$regex : `.*${req.body.name}.*`, $options: "$i"}}
    }
    People.find(query).sort({name: 1})
        .then(people => res.json(people))
        .catch(err => res.status(404).json('Error: ' + err))
})


module.exports = router;