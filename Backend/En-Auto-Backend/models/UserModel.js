const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

if (mongoose.connection.readyState === 0) {
    mongoose.connect(process.env.MONGO);
}
const userSchema = new Schema({
    '_id': {
        type: Schema.Types.ObjectId,
        ref: ''
    },
    'lastName': {
        type: String,
        required: true
    },
    'firstName': {
        type: String,
        required: true
    },
    'hash': {
        type: String,
        required: true
    },
    'salt': {
        type: String
    },
    'email': {
        type: String
        , unique: true,
        required: true
    },
    'id_devis': {
        type: [Number]
    }
});

const users = new Schema({
    users: {type: [userSchema]}
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        lastName: this.lastName,
        firstName: this.firstName,
        id_devis : this.id_devis,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', users);
module.exports = mongoose.model('userSchema', userSchema);
