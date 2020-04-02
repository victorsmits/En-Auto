const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Devis = mongoose.model('Devis');
const Users = mongoose.model('User');
const nodemailer = require('nodemailer');

router.get('', function(req, res, next) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PWD
        }
    });

    const mailOptions = {
        from: process.env.MAIL,
        to: 'victor-smi@hotmail.fr',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(401).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({message:'Email sent: ' + info.response});
        }
    });
});


module.exports = router;
