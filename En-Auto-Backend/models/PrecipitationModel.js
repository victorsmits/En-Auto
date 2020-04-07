const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rainschema = new Schema({
    'postCode': {
        type: Number,
        required: true
    },
    'avg': {
        type: Number,
        required: true
    }
});
const PrecipitationModel = mongoose.model('rain', rainschema);

module.exports = PrecipitationModel;
