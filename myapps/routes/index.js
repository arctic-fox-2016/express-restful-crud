var express = require('express');
var router = express.Router();
var models = require('./../models')

/* GET home page. */

router.get('/', function (req, res, next) {
  models.findAll(function (data) {
    res.render('index', {
      title: 'Memo',
      data: data
    });
  })
});

router.post('/post', function (req, res, next) {
  models.insert(req, function () {
    models.findAll(function (data) {
      res.redirect("/")
    })
  })
});

router.post('/delete', function (req, res, next) {
  models.delete(req, function () {
    models.findAll(function (data) {
      res.redirect("/")
    })
  })
})

router.post('/update', function (req, res, next) {
  models.update(req, function () {
    models.findAll(function (data) {
      res.redirect("/")
    })
  })
})

module.exports = router;
