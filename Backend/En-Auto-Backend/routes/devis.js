const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Devis = mongoose.model('Devis');

router.post('/create-devis', function(req, res, next) {
    let devis = new Devis ({
        cout_structure: '', // calcul :  besoin de req.body.installation et de req.body.tuile et faire ensuite un calcul
        cout_acheminement: "", //Calcul ?
        prix_cuve : "", //En fonction du choix de l'utilisateur ?
        conso : "",
        prix_eaux:"",
        recup_eaux:"", //req.body.superficie * hauteur pluviométrie
        superficie : req.body.superficie,
        economie : "", //
        rentabilite:""
    });

    devis.save()
        .then(r =>{
            return res.status(201).json(r);
        }).catch(error => {
            return res.status(501).json({message : error})
        })
});

router.put('/update-devis', function(req, res, next) {
    
});

module.exports = router;