var express = require('express');
var router = express.Router();

const errHandler = err =>{
console.error("Error:", err)
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
