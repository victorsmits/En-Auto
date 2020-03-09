var express = require('express');
const User = require('../sequelize/models/User');
var router = express.Router();

const errHandler = err =>{
console.error("Error:", err)
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
