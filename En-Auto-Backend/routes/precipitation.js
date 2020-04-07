const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RN = mongoose.model('rain');

//post
router.post('', function(req, res, next) {
    let precipitation = new RN( {
        codePost: req.body.codePost ? req.body.codePost : undefined,
        rain: req.body.rain ? req.body.rain : undefined,
    })
    precipitation.save()
        .then(r =>{
            return res.status(201).json({"message":true});
        }).catch(error => {
        return res.status(400).json({message : error})
    })

});

//Récupération de la précipitation en fonction du code postal
router.get('', function(req, res, next) {
    precipitation.find({codePost : req.query.codePost.toString()},(err,precipitation) =>{
        if(!precipitation) {
            return res.status(401).send({
                message : "Precipitation not found with code postal "+ req.query.codePost
            });
        }else{
            return res.status(201).json(precipitation);
        }
    })
});

module.exports = router;
