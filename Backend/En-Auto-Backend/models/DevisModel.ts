//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

const devis = new Schema({

    'id_devis': {type: Schema.Types.ObjectId, ref: ''},
    //coût
    'cout_structure': {type: Float32Array}, //installation de goutiere? tuiles manquante?   
    'cout_acheminement': {type: Float32Array},  //achemeniment eau pluie (goutiere)
    'prix_cuve': {type: Float32Array}, //plusieurs a proposer ?
    'conso': {type: Int16Array}, //estimation ou pas conso 
    'prix_eau': {type: Date, default: Date.now}, //m3 ou L a convertir potentiellement
    //economie
    'recup_eau': {type: Int16Array}, //recuperation d'eau annuelle
    'superficie': {type: Int8Array}, //toit m2
    'economie': {type: Float32Array}, //estimation finale en €
    'rentabilite': {type: Boolean, default: false}, //ou bien une jauge

});


module.exports = mongoose.model('Devis', devis);