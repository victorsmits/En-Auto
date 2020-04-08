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
router.get('', function (req, res, next) {
    RN.find({"postCode": req.query.postCode.toString()}, function(err, result){
        if(err) throw err;    //There was an error with the database.
        if(result == 0) {
            console.log("oOOO");
            result = {
                "_id" : ObjectId("5e8db702606e552066da3561"),
                "postCode" : 99999,
                "avg" : 2
            };
            return res.status(201).json(result);
                }//The default query
        else {
            return res.status(201).json(result);
        }
});})

module.exports = router;
