const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WC = mongoose.model('watercost');

//Création d'un devis
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

//Récupération d'un devis en fonction de l'id_user
router.get('', function(req, res, next) {
    WC.find({postCode : req.query.postCode.toString()},(err,wc)=>{
        console.log(wc,err);
        if(err) {
            return res.status(401).send({
                message : "Water cost not found with post code "+ req.query.postCode
            });
        }else{
            return res.status(201).json(wc);
        }
    })
});

//Suppression d'un devis utilisateur (dépendant de l'id du devis)
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

//M.A.J d'un devis utilisateur (dépendant de l'id du devis)
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
