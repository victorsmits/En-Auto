var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
/* GET users listing. */


router.post('/register', function(req, res, next) {
  let user = new User({
    lastName : req.body.lastName,
    firstName : req.body.firstName,
    email : req.body.email,
  });
  user.setPassword(req.body.password);

  user.save()
      .then(r =>{
        return res.status(201).json(r);
      }).catch(error => {
    return res.status(501).json({message: error});
  });
});

router.post('/login', function(req, res, next) {
  User.findOne({email: req.body.email},(err,user)=>{
    if(user.validPassword(req.body.password)){
      return res.status(201).json({connected: user.generateJwt()});
    }else{
      return res.status(501).json({message: err});
    }
  });
});

module.exports = router;
