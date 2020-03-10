const mongoose = require('mongoose');
const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

const user = new Schema({

    '_id': {type: Schema.Types.ObjectId, ref: ''},
    'lastName': {type: String},
    'firstName': {type: String},
    'password': {type: String},
    'address': {type: String},
    'email': {type: String},
    'createdAt': {type: Date, default: Date.now},
    'updatedAt': {type: Date, default: Date.now}
});

user.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

user.pre('update', function() {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

user.pre('findOneAndUpdate', function() {
    this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('User', user);
