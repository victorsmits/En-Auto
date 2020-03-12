const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Devis = mongoose.model('Devis');

//Création de devis (données à récup auprès de l'utilisateur)
router.post('', function(req, res, next) {
    let devis = new Devis ({
        id_user: req.body.id_user,
        cout_structure: req.body.cout_structure,
        cout_acheminement: req.body.cout_acheminement,
        prix_cuve : req.body.prix_cuve, 
        conso : req.body.conso,
        superficie : req.body.superficie
    });

    devis.save()
        .then(r =>{
            return res.status(201).json(r);
        }).catch(error => {
            return res.status(501).json({message : error})
        })
});

//Récupération du devis en fonction de l'id_user
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

//Suppression du devis utilisateur (dépendant de l'id_user)
router.delete('', function(req, res, next) {
    console.log(Devis.find({_id: req.query._id}))
    Devis.findByIdAndRemove({_id: req.query._id.toString()}, (err,devis) =>{
        console.log("devis = ",devis)
        if(!devis) {
            return res.status(401).send({
                message : "Devis not found with id "+ req.query._id
            });
        }
        res.send({message: "Devis deleted successfully!"});
    });
})

//M.A.J du devis utilisateur (dépendant de l'id_user)
router.put('', function(req, res, next) {
    Devis.findByIdAndUpdate(req.query._id, req.body, (err, devis) => {
        console.log("devis= ",devis);
        if(!devis) {
            return res.status(401).send({
                message : "Devis not found with id "+ req.query._id
            });
        }
        return res.status(201).json(devis);
    })
})



module.exports = router;