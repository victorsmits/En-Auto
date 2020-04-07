const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RN = mongoose.model('rain');

//post
router.post('', function(req, res, next) {
    let precipitation = new precipitation( {


    })
    precipitation.save()
        .then(r =>{
            return res.status(201).json({"message":true});
        }).catch(error => {
        return res.status(400).json({message : error})
    })

}

//Récupération de la précipitation en fonction du code postal
router.get('', function(req, res, next) {
    RN.find({postCode : req.query.postCode.toString()},(err)=>{
        console.log(err);
        if(err, res) {
            return res.status(401).send({
                message : "Precipitation not found with post code "+ req.query.postCode
            });
        }else{
            return res.status(201).json(RN);
        }
    })
});

module.exports = router;