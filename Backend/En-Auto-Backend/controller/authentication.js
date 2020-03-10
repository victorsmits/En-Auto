const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('userSchema');

module.exports.register = function(req, res) {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
        let token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    }).then(r => {
        console.log("user save")
    });
};
