const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Devis = mongoose.model('Devis');
const Users = mongoose.model('User');
const nodemailer = require('nodemailer');

router.post('', function(req, res, next) {
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
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
        to: process.env.MAIL,
        subject: req.body.name + ': ' + req.body.obj,
        text: 'from: ' + req.body.mail + '\n' + 'name: ' + req.body.name + '\n' + 'content: \n' + req.body.content
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("error: " + error);
            res.status(201).send({"message":'send'});
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201).send({"message":'send'});
        }
    });
});


module.exports = router;
