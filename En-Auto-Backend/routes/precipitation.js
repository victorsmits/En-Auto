const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RN = mongoose.model('rain');

//post
router.post('', function(req, res, next) {
    let jeanmi = new RN( {
        postCode: req.body.postCode ? req.body.postCode : undefined,
        rain: req.body.rain ? req.body.rain : undefined,
    })
    jeanmi.save()
        .then(r =>{
            return res.status(201).json({"message":true});
        }).catch(error => {
        return res.status(400).json({message : error})
    })

});

//Récupération de la précipitation en fonction du code postal
router.get('', function (req, res, next) {
    RN.findOne({"postCode": req.query.postCode.toString()}, function(err, result){
        if(err) throw err;    //There was an error with the database.
        if(!result) {
            RN.findOne({"postCode": "99999"} , function (err,result) {
               // if(err) throw err;  //There was an error with the database.
              //  if(!result) console.log("no entry");
               // else {
                    console.log("ok");
                    return res.status(201).json(result);
                //}
            })
        } //The default query

        else {
            console.log(result.postCode);
            return res.status(201).json(result);
        }

  //  RN.find({postCode: req.query.postCode.toString()}, (err, precep) => {
       // if (err) {
         //   console.log("In the first error");
            //RN.findOne({"postCode": "99999"}, (err, precepd) => {
            //  if(err) {
            //    console.log("in the second error");
       //       return res.status(401).send({
            //    message: "Precipitation not found with post code " + req.query.postCode
         //   });
     //   }
      //  if (!precep) {
        //    return res.status(401).send({
      //          message: "Precipitation not found with post code " + req.query.postCode
       //     });

               // else {
                //    console.log("eee"+res.postCode)
            //        return res.status(201).json(precepd);
            //    }
           // })
      //  } if(precep) {
     //       console.log("ok");
     //       return res.status(201).json(precep);
     //   }
   // })
});})

module.exports = router;
