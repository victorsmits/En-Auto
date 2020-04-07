const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RN = mongoose.model('rain');


//Récupération de la précipitation en fonction du code postal
router.get('', function(req, res, next) {
    RN.find({postCode : req.query.postCode.toString()},(err)=>{
        console.log(err);
        if(err) {
            return res.status(401).send({
                message : "Precipitation not found with post code "+ req.query.postCode
            });
        }else{
            return res.status(201).json(RN);
        }
    })
});