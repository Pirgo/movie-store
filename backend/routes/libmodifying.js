const router = require('express').Router();
let User = require('../models/user.model');
let Movie = require('../models/movie.model');
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


router.route('/towatch/add').post(protect, (req,res,next)=>{
    const userID = req.user._id
    const movieID = req.body.movieID
    const title = req.body.title

    Movie.countDocuments({_id: movieID}, (err, count)=>{
        if (err) console.log(err)
        else{
            if(count > 0){
                User.findOneAndUpdate({_id: userID}, {"$push" : {"library.toWatch": {"movieID": movieID, "title": title}}}, (err, doc)=>{
                    console.log(doc)
                    res.json("Added")
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
                User.findOneAndUpdate({_id: userID}, {"$push" : {"library.favourites": {"movieID": movieID, "title": title}}}, (err, doc)=>{
                    console.log(doc)
                    res.json("Added")
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
                User.findOneAndUpdate({_id: userID}, {"$push" : {"library.seen": {"movieID": movieID, "title": title}}}, (err, doc)=>{
                    console.log(doc)
                    res.json("Added")
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