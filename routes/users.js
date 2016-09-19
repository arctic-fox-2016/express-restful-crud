var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
//   console.log(req.query.id);
// });



router.post('/', (req,response) => {
  //response.send('respond with a resource');
  console.log("Masuk USERS NEH");
  let db = req.db
  console.log('masuk ke update');
  console.log(req.query.namamemo);
  db.collection('memos').find({"namamemo": req.query.namamemo}).toArray(function(err,results){
    if (err) return console.log(err)
		// render index.ejs
    console.log(results)
		response.render('update.jade', {updatejade: results})

  })

})
module.exports = router;
