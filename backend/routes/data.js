const router = require('express').Router();
let DataInfo = require('../models/data.model');

router.route('/update').post((req,res) => {
    DataInfo.countDocuments((err, count)=>{
        if (count == 1){
            DataInfo.findOne({}, (err, doc) => {
                doc.genres = doc.genres.concat(req.body.genres)
                doc.platforms = doc.platforms.concat(req.body.platforms)
                //console.log(doc)
                //console.log(req.body)
                doc.save()
                    .then(() => res.json('Data updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
        }
        else{
            const newDataInfo = new DataInfo({
                ...req.body
            })
            newDataInfo.save()
                .then(() => res.json('Data created!'))
                .catch(err => res.status(400).json('Error: ' + err));

        }
    })
})

module.exports = router;