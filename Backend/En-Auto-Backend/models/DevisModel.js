const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devisSchema = new Schema({
    'id_user': {
        type: mongoose.Types.ObjectId,
        required : true
    },
    //coût
    'cout_structure': {
        type: Number,
        required: true
    }, //installation de goutiere? tuiles manquante?
    'cout_acheminement': {
        type: Number,
        required: true
    },  //achemeniment eau pluie (goutiere)
    'prix_cuve': {
        type: Number,
        required: true
    }, //plusieurs a proposer ?
    'conso': {
        type: Number,
        required: true
    }, //estimation ou pas conso
    'prix_eau': {
        type: Number
    }, //m3 ou L a convertir potentiellement
    //economie
    'recup_eau': {
        type: Number
    }, //recuperation d'eau annuelle
    'superficie': {
        type: Number
    }, //toit m2
    'economie': {
        type: Number
    }, //estimation finale en €
    'rentabilite': {
        type: Boolean,
        default: false
    }, //ou bien une jauge
    'createdAt': {
        type: Date,
        default: Date.now
    },
});
const DevisModel = mongoose.model('Devis', devisSchema);

module.exports = DevisModel;
