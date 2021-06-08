const router = require('express').Router();
let User = require('../models/user.model');
let Movie = require('../models/movie.model');
const jwt = require('jsonwebtoken');

const protect = require('./protect');

router.route('/:section/checkstate').post(protect, (req, res, next) => {
    const userID = req.user._id;
    const movieID = req.body.movieID;
    const section = req.params.section;

    let query;
    if (section === "towatch") {
        query = { _id: userID, 'library.toWatch.movieID': movieID };
    } else if (section === 'favourites') {
        query = { _id: userID, 'library.favourites.movieID': movieID };
    } else if (section === 'seen') {
        query = { _id: userID, 'library.seen.movieID': movieID };
    }

    User.countDocuments(query)
        .then((count) => {
            if (count) res.json({ found: true });
            else res.json({ found: false });
        })
        .catch(err => console.log(err))
})


router.route('/:section/add').post(protect, (req, res, next) => {
    const userID = req.user._id;
    const movieID = req.body.movieID;
    const title = req.body.title;
    const section = req.params.section;

    let query, toPush;
    if (section === "towatch") {
        query = { _id: userID, 'library.toWatch.movieID': { $nin: movieID } };
        toPush = { "library.toWatch": { "movieID": movieID, "title": title } };
    } else if (section === 'favourites') {
        query = { _id: userID, 'library.favourites.movieID': { $nin: movieID } };
        toPush = { "library.favourites": { "movieID": movieID, "title": title } };
    } else if (section === 'seen') {
        query = { _id: userID, 'library.seen.movieID': { $nin: movieID } };
        toPush = { "library.seen": { "movieID": movieID, "title": title } };
    }

    Movie.countDocuments({ id: movieID }, (err, count) => {
        if (err || count <= 0) {
            res.status(401).json('Error no movie with that id')
            return;
        }
        User.findOneAndUpdate(query, { "$push": toPush }, (err, doc) => {
            if (doc != null) {
                res.json("Added")
            }
            else {
                res.json("Error: Already in lib")
            }
        })
    })
})

router.route('/:section/remove').post(protect, (req, res, next) => {
    const userID = req.user._id
    const movieID = req.body.movieID
    const title = req.body.title
    const section = req.params.section;

    let query, toPull;
    if (section === "towatch") {
        query = { _id: userID, 'library.toWatch.movieID': { $in: movieID } };
        toPull = { "library.toWatch": { "movieID": movieID, "title": title } };
    } else if (section === 'favourites') {
        query = { _id: userID, 'library.favourites.movieID': { $in: movieID } };
        toPull = { "library.favourites": { "movieID": movieID, "title": title } };
    } else if (section === 'seen') {
        query = { _id: userID, 'library.seen.movieID': { $in: movieID } };
        toPull = { "library.seen": { "movieID": movieID, "title": title } };
    }

    Movie.countDocuments({ id: movieID }, (err, count) => {
        if (err || count <= 0) {
            res.status(401).json('Error no movie with that id')
            return;
        }

        User.findOneAndUpdate(query, { "$pull": toPull }, (err, doc) => {
            if (doc != null) {
                res.json("Removed")
            }
            else {
                res.json("Nothing to remove")
            }
        })
    })
})



router.route('/seen/rate/add').post(protect, (req, res, next) => {
    const userID = req.user._id
    const movieID = req.body.movieID
    const rate = req.body.rate
    Movie.countDocuments({ id: movieID }, (err, count) => {
        if (err || count <= 0) {
            res.status(401).json('Error no movie with that id')
            return;
        }

        User.findOneAndUpdate({ _id: userID, "library.seen.movieID": { $in: movieID } }, { $set: { "library.seen.$.rate": rate } }, { runValidators: true }, (err, doc) => {
            if (doc != null) {
                res.json("Rate updated")
            }
            else {
                res.json("Nothing to update")
            }
        })
    })
})

router.route('/seen/rate/value').post(protect, (req, res, next) => {
    const userID = req.user._id;
    const movieID = req.body.movieID;
    Movie.countDocuments({ id: movieID }, (err, count) => {
        if (err || count <= 0) {
            res.status(401).json('Error no movie with that id')
            return;
        }

        User.findOne({ _id: userID, "library.seen.movieID": movieID }, { "library.seen": 1 }, (err, doc) => {
            if (doc != null) {
                for (let m of doc.library.seen) {
                    if (m.movieID === movieID) {
                        res.json({ rate: m.rate });
                        return;
                    }
                }
            }
            res.json({ rate: 0 });
        })
    })
})

module.exports = router;