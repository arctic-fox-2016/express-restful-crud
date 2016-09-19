var express = require('express');
var router = express.Router();


/* GET home page. */


router.get('/memo', (request, res) => {
  let db = request.db;

	db.collection('memos').find().toArray(function(err, results) {
		if (err) return console.log(err)
		// render index.ejs
		res.render('memo.jade', {users: results})

	})
})


router.post('/add', (req,response) => {
  let db = req.db
  db.collection('memos').save(req.body, (err, res) => {
    if (err) return console.log(err);
    console.log('saved to database')
    response.redirect('http://localhost:3000/memo')

  })
})

router.post('/view', (req,response) => {
  let db = req.db
  db.collection('memos').save(req.body, (err, res) => {
    if (err) return console.log(err);
    console.log('saved to database')
    response.redirect('http://localhost:3000/memo')

  })
})


router.post('/delete', (req,response) => {

  let db = req.db
  console.log('masuk ke delete');
  console.log(req.query.id);
  db.collection('memos').remove({"_id": { "$oid" : '57dfc1c6ce290c1ad9b1f10d' }})


})


module.exports = router;
