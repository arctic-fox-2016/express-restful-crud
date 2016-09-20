var express = require('express');
var router = express.Router();
//var data =  require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', text:" " });
});
router.post('/', function(req, res, next) {
  var string = req.body.teksname;
  string = string.toLowerCase();
  teksname_array =string.split(' ');
  if(teksname_array.length<=1){
  teksname ="masukkan minimal dua kata"
  }
  res.render('index', { title: 'Express', text:string });
});


module.exports = router;
