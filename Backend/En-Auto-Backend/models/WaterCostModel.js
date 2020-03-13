const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waterCost = new Schema({
    'postCode': {
        type: Number,
        required: true
    },
    'cost': {
        type: Number,
        required: true
    }
});
const WaterCostModel = mongoose.model('watercost', waterCost);

module.exports = WaterCostModel;
