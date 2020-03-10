const mongoose = require('mongoose');
const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
    mongoose.connect(require(process.env.MONGO));
}
const user = {
    '_id': {type: Schema.Types.ObjectId, ref: ''},
    'lastName': {type: String},
    'firstName': {type: String},
    'password': {type: String},
    'email': {type: String},
    'id_devis': {type: [Number]},
    'createdAt': {type: Date, default: Date.now},
    'updatedAt': {type: Date, default: Date.now}
};

const users = new Schema({
    users : {type: [user]}
});

users.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

users.pre('update', function () {
    this.update({}, {$set: {updatedAt: Date.now()}});
});

users.pre('findOneAndUpdate', function () {
    this.update({}, {$set: {updatedAt: Date.now()}});
});


module.exports = mongoose.model('User', user);
