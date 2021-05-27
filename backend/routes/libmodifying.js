const router = require('express').Router();
let User = require('../models/user.model');
let Movie = require('../models/movie.model');
const jwt = require('jsonwebtoken');

const protect = require('./protect');

router.route('/towatch/add').post(protect, (req,res,next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    const title = req.body.title

    Movie.countDocuments({_id: movieID }, (err, count)=>{
        if (err) console.log(err)
        else{
            if(count > 0){
                User.findOneAndUpdate({_id: userID, "library.toWatch.movieID":{$nin: movieID}}, {"$push" : {"library.toWatch": {"movieID": movieID, "title": title}}}, (err, doc)=>{
                    if(doc != null){
                        res.json("Added")
                    }
                    else{
                        res.json("Error: Already in lib")
                    }
                })
            }
            else{
                res.status(400).json('Error no movie with that id')
            }
        }
    })

})

router.route('/favourites/add').post(protect, (req,res,next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    const title = req.body.title

    Movie.countDocuments({_id: movieID}, (err, count)=>{
        if (err) console.log(err)
        else{
            if(count > 0){
                User.findOneAndUpdate({_id: userID, "library.favourites.movieID":{$nin: movieID}}, {"$push" : {"library.favourites": {"movieID": movieID, "title": title}}}, (err, doc)=>{
                    if(doc != null){
                        res.json("Added")
                    }
                    else{
                        res.json("Error: Already in lib")
                    }
                })
            }
            else{
                res.status(400).json('Error no movie with that id')
            }
        }
    })
})

router.route('/seen/add').post(protect, (req,res,next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    const title = req.body.title

    Movie.countDocuments({_id: movieID}, (err, count)=>{
        if (err) console.log(err)
        else{
            if(count > 0){
                User.findOneAndUpdate({_id: userID, "library.seen.movieID":{$nin: movieID}}, {"$push" : {"library.seen": {"movieID": movieID, "title": title}}}, (err, doc)=>{
                    if(doc != null){
                        res.json("Added")
                    }
                    else{
                        res.json("Error: Already in lib")
                    }
                })
            }
            else{
                res.status(400).json('Error no movie with that id')
            }
        }
    })
})

router.route('/towatch/rmv').post(protect, (req,res,next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    const title = req.body.title

    Movie.countDocuments({_id: movieID}, (err, count)=>{
        if (err) console.log(err)
        else{
            if(count > 0){
                User.findOneAndUpdate({_id: userID, "library.toWatch.movieID":{$in: movieID}}, {"$pull" : {"library.toWatch": {"movieID": movieID, "title": title}}}, (err, doc)=>{
                    if(doc != null){
                        res.json("Removed")
                    }
                    else{
                        res.json("Nothing to remove")
                    }
                })
            }
            else{
                res.status(400).json('Error no movie with that id')
            }
        }
    })

})

router.route('/towatch/checkstate').post(protect, (req, res, next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    User.countDocuments({_id: userID, "library.toWatch.movieID": movieID})
        .then((count) =>{
            if(count === 1) res.json({found: true})
            else res.json({found: false})
        })
        .catch(err => console.log(err))

})

router.route('/favourites/checkstate').post(protect, (req, res, next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    User.countDocuments({_id: userID, "library.favourites.movieID": movieID})
        .then((count) =>{
            if(count === 1) res.json({found: true})
            else res.json({found: false})
        })
        .catch(err => console.log(err))

})

router.route('/seen/checkstate').post(protect, (req, res, next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    User.countDocuments({_id: userID, "library.seen.movieID": movieID})
        .then((count) =>{
            if(count === 1) res.json({found: true})
            else res.json({found: false})
        })
        .catch(err => console.log(err))

})

router.route('/favourites/rmv').post(protect, (req,res,next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    const title = req.body.title

    Movie.countDocuments({_id: movieID}, (err, count)=>{
        if (err) console.log(err)
        else{
            if(count > 0){
                User.findOneAndUpdate({_id: userID, "library.favourites.movieID":{$in: movieID}}, {"$pull" : {"library.favourites": {"movieID": movieID, "title": title}}}, (err, doc)=>{
                    if(doc != null){
                        res.json("Removed")
                    }
                    else{
                        res.json("Nothing to remove")
                    }
                })
            }
            else{
                res.status(400).json('Error no movie with that id')
            }
        }
    })

})

router.route('/seen/rmv').post(protect, (req,res,next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    const title = req.body.title

    Movie.countDocuments({_id: movieID}, (err, count)=>{
        if (err) console.log(err)
        else{
            if(count > 0){
                User.findOneAndUpdate({_id: userID, "library.seen.movieID":{$in: movieID}}, {"$pull" : {"library.seen": {"movieID": movieID, "title": title}}}, (err, doc)=>{
                    if(doc != null){
                        res.json("Removed")
                    }
                    else{
                        res.json("Nothing to remove")
                    }
                })
            }
            else{
                res.status(400).json('Error no movie with that id')
            }
        }
    })

})  


router.route('/seen/rate').post(protect, (req, res, next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    const rate = req.body.rate
    Movie.countDocuments({_id: movieID}, (err, count)=>{
        if (err) res.status(400).json("Error")
        else{
            if(count > 0){
                User.findOneAndUpdate({_id: userID, "library.seen.movieID":{$in: movieID}}, {$set: {"library.seen.$.rate": rate}}, (err, doc)=>{
                    console.log(doc)
                    if(doc != null){
                        res.json("Rate updated")
                    }
                    else{
                        res.json("Nothing to update")
                    }
                })
            }
            else{
                res.status(400).json('Error no movie with that id')
            }
        }
    })
})


module.exports = router;