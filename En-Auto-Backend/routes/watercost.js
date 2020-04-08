const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WC = mongoose.model('watercost');

//Post watercost
router.post('', function(req, res, next) {
    let wc = new WC ({
        postCode: req.body.postCode,
        cost: req.body.cost,
    });

    wc.save()
        .then(r =>{
            return res.status(201).json(r);
        }).catch(error => {
        return res.status(501).json({message : error})
    })
});

//Récupération du coup de l'eau en fonction du codepostal
router.get('', function(req, res, next) {
    WC.findOne({"postCode" : req.query.postCode.toString()}, function(err,wc) {
        if (err) throw err;    //There was an error with the database.
        if (wc === null) {
            WC.findOne({"postCode": 99999}, function (err, wc) {
                if (err) throw err;
                if (wc) return res.status(201).send(wc);
            });
        }//The default query
        else {
            return res.status(201).send(wc); //resultat si dans la DB
        }

    })
});

//Suppression du prix de l'eau
router.delete('', function(req, res, next) {
    WC.findByIdAndRemove({_id: req.query._id.toString()}, (err,wc) =>{
        if(!wc) {
            return res.status(401).send({
                message : "water cost not found with id "+ req.query._id
            });
        }
        res.status(201).send({message: "water cost deleted successfully!"});
    });
});

//M.A.J du prix de l'eau
router.put('', function(req, res, next) {
    WC.findByIdAndUpdate(req.query._id, req.body, (err, wc) => {
        if(!wc) {
            return res.status(401).send({
                message : "water cost not found with id "+ req.query._id
            });
        }
        return res.status(201).send({message : "Devis updated successfully!"});
    })
});
module.exports = router;
