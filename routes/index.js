var express = require('express');
var models = require('../models/index');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memos' });
  // models.findAll(function(data){
  //   res.json(data);
  // });
});

router.post('/', function(req, res, next) {
  var text_memo = req.body.text_memo;
  if(text_memo){
    models.create(text_memo, function(){
      models.findAll(function(data){
        res.json(data);
      });
    });
  } else {
    models.findAll(function(data){
      res.json(data);
    });
  }
});

router.put('/', function(req, res){
  var text_id = req.body.text_id;
  var text_name = req.body.text_memo;
  models.update(text_id, text_name, function(){
    models.findAll(function(data){
      res.json(data);
    });
  });
});

router.delete('/', function(req, res){
  var text_id = req.body.text_id;
  models.delete(text_id, function(){
    models.findAll(function(data){
      res.json(data);
    });
  });
});


module.exports = router;
