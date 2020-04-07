const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const devisSchema = new Schema({
    'address' : {
      type: String,
      required: true
    },
    'code_postal' : {
      type: Number,
      required: true
    },
    'id_user': {
        type: mongoose.Types.ObjectId,
        required : true
    },
    //coût
    'structural_cost': {
        type: Number
    }, //installation de goutiere? tuiles manquante?
    'routing_cost': {
        type: Number,
        required: true
    },  //achemeniment eau pluie (goutiere)
    'tank_cost': {
        type: Number,
        required: true
    }, //plusieurs a proposer ?
    'consum': {
        type: Number,
    }, //estimation ou pas conso
    'water_cost': {
        type: Number
    }, //m3 ou L a convertir potentiellement
    'Total_cost': {
        type: Number,
    },

    //economie
    'water_volume': {
        type: Number
    }, //recuperation d'eau annuelle
    'roof_area': {
        type: Number
    }, //toit m2
    'vol_storage': {
        type: Number
    }, //volume de stockage
    'final_save': {
        type: Number
    }, //estimation finale en €
    'rentability': {
        type: Number,
        // default: false
    }, //ou bien une jauge
    'created_at': {
        type: Date,
        default: Date.now
    },
    'total_cost': {
        type: Number,
    },
    'tiles_number': {
        type: Number,
    },
    'tiles_cost': {
        type: Number,
    },
    'gutter_cost': {
        type: Number,
    },
    'gutter_length': {
        type: Number,
    },
    'tank_dist': {
        type: Number,
    },
    'tank_type': {
        type: String,
    }
});
const DevisModel = mongoose.model('Devis', devisSchema);

module.exports = DevisModel;
