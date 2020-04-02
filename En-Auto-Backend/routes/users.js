const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
let decodedToken = "";

router.post('/register', function (req, res, next) {
    let user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
    });
    user.setPassword(req.body.password);

    user.save()
        .then(r => {
            return res.status(201).json(r);
        }).catch(error => {
        return res.status(401).json({message: error});
    });
});

router.post('/login', function (req, res, next) {
    User.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            if (user.validPassword(req.body.password)) {
                return res.status(201).json({token: user.generateJwt()});
            } else {
                return res.status(401).json({message: "wrong credentials"});
            }
        } else {
            return res.status(401).json({message: "User not register"});
        }
    }).catch(err => {
        return res.status(401).json({message: err});
    });
});

router.get('/profile', verifyToken, (req, res, next) => {
    return res.status(201).json({profile: decodedToken})
});


function verifyToken(req, res, next) {
    let token = req.query.token;

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: err});
        }
        if (decoded) {
            console.log(decoded);
            decodedToken = decoded;
            next();
        }
    })
}

module.exports = router;
