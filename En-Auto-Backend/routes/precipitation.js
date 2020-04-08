const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RN = mongoose.model('rain');

//post
router.post('', function (req, res, next) {
    let jeanmi = new RN({
        postCode: req.body.postCode ? req.body.postCode : undefined,
        rain: req.body.rain ? req.body.rain : undefined,
    })
    jeanmi.save()
        .then(r => {
            return res.status(201).json({"message": true});
        }).catch(error => {
        return res.status(400).json({message: error})
    })

});

//Récupération de la précipitation en fonction du code postal
router.get('', function (req, res, next) {
    RN.findOne({"postCode": req.query.postCode.toString()}, function (err, result) {
        if (err) throw err;    //There was an error with the database.
        if (result === null) {
            RN.findOne({"postCode": 99999}, function (err, result) {
                if (err) throw err;
                if (result) return res.status(201).send(result);
            });
        }//The default query
        else {
            return res.status(201).send(result);
        }
    });
})

module.exports = router;
