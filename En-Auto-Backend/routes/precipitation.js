const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RN = mongoose.model('rain');

//post
router.post('', function(req, res, next) {
    let jeanmi = new RN( {
        postCode: req.body.postCode ? req.body.postCode : undefined,
        rain: req.body.rain ? req.body.rain : undefined,
    })
    jeanmi.save()
        .then(r =>{
            return res.status(201).json({"message":true});
        }).catch(error => {
        return res.status(400).json({message : error})
    })

});

//Récupération de la précipitation en fonction du code postal
router.get('', function(req, res, next) {
    RN.find({postCode : req.query.postCode.toString()},(err,precep)=>{
        if(err) {
            return res.status(401).send({
                message : "Precipitation not found with post code "+ req.query.postCode
            });
        }else{
            return res.status(201).json(precep);
        }
    })
});

module.exports = router;
