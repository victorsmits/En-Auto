const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const precipitation = new Schema({
    'postCode': {
        type: Number,
        required: true
    },
    'avg': {
        type: Number,
        required: true
    }
});
const PrecipitationModel = mongoose.model('rain', rain);

module.exports = PrecipitationModel;