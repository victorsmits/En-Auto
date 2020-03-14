const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Devis = mongoose.model('Devis');

//Création d'un devis
router.post('', function(req, res, next) {
    let devis = new Devis ({
        // required
        addresse: req.body.address? req.body.address : undefined,
        code_postal : req.body.code_postal ? req.body.code_postal : undefined,
        id_user: req.body.id_user ? req.body.id_user : undefined,
        cout_acheminement: req.body.routing_cost ? req.body.routing_cost : undefined,
        prix_cuve : req.body.tank_cost ? req.body.tank_cost : undefined,
        prix_eau : req.body.water_cost ? req.body.water_cost : undefined,
        total_cost: req.body.total_cost ? req.body.total_cost : undefined,

        // non required
        cout_structure: req.body.structural_cost ? req.body.structural_cost : undefined,
        conso : req.body.consum ? req.body.consum : undefined,
        superficie : req.body.roof_area ? req.body.roof_area : undefined,
        recup_eau : req.body.water_volume ? req.body.water_volume : undefined,
        rentabilite : req.body.rentability ? req.body.rentability : undefined,
        createdAt : req.body.created_at ? req.body.created_at : undefined,
        economie : req.body.final_save ? req.body.final_save : undefined
    });

    devis.save()
        .then(r =>{
            return res.status(201).json(r);
        }).catch(error => {
            return res.status(501).json({message : error})
        })
});

//Récupération d'un devis en fonction de l'id_user
router.get('', function(req, res, next) {
    Devis.find({id_user : req.query.id_user.toString()},(err,devis)=>{
        if(!devis) {
            return res.status(401).send({
                message : "Devis not found with id "+ req.query.id_user
            });
        }else{
            return res.status(201).json(devis);
        }
    })
});

//Suppression d'un devis utilisateur (dépendant de l'id du devis)
router.delete('', function(req, res, next) {
    console.log(Devis.find({_id: req.query._id}))
    Devis.findByIdAndRemove({_id: req.query._id.toString()}, (err,devis) =>{
        if(!devis) {
            return res.status(401).send({
                message : "Devis not found with id "+ req.query._id
            });
        }
        res.status(201).send({message: "Devis deleted successfully!"});
    });
})

//M.A.J d'un devis utilisateur (dépendant de l'id du devis)
router.put('', function(req, res, next) {
    Devis.findByIdAndUpdate(req.query._id, req.body, (err, devis) => {
        console.log("devis= ",devis);
        if(!devis) {
            return res.status(401).send({
                message : "Devis not found with id "+ req.query._id
            });
        }
        return res.status(201).send({message : "Devis updated successfully!"});
    })
})

module.exports = router;
