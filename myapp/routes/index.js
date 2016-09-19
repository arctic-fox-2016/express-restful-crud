var express = require('express');
var router = express.Router();
var model = require("../models/index")
var Sequelize = require('sequelize');
let bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.urlencoded({extended: true}))

/* GET home page. */
router.get('/', function(req, res, next) {
  let memo = []
  model.Memo.findAll().then(function(memos){
    for (let idx in memos){
      memo.push(memos[idx])
    }
    res.render('index',{data:memo});
  })
});

router.post('/memos', function(req, res, next){
  model.Memo.create({name: req.body.name})
  console.log('saved to database')
  res.redirect('/')
})

router.post('/delete', function(req, res, next){
  model.Memo.destroy({where: {id: req.query.id}})
  console.log('delete is successful')
  res.redirect('/')
})



module.exports = router;
