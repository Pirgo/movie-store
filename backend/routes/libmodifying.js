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
    let userID = req.user._id

})

router.route('/favourites/rmv').post(protect, (req,res,next)=>{
    let userID = req.user._id
})

router.route('/seen/rmv').post(protect, (req,res,next)=>{
    let userID = req.user._id
})  


module.exports = router;