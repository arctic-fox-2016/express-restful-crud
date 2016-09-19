var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

router.route('/')
    .get(function(req, res, next) {
        mongoose.model('Memo').find({}, function (err, memos) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    html: function(){
                        res.render('memos/index', {
                              title: 'All my Memos',
                              "memos" : memos
                          });
                    },
                    json: function(){
                        res.json(memos);
                    }
                });
              }
        });
    })
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var memoList = req.body.memolist;
        //call the create function for our database
        mongoose.model('Memo').create({
            name : memoList
        }, function (err, memo) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new memo: ' + memo);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("memos");
                        // And forward to success page
                        res.redirect("/memos");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(memo);
                    }
                });
              }
        })
    });

router.get('/new', function(req, res) {
    res.render('memos/new', { title: 'Add New Memo' });
});

router.route('/:id/edit')
      .delete(function (req, res){
          //find memo by ID
          mongoose.model('Memo').findById(req.params.id, function (err, memo) {
              if (err) {
                  return console.error(err);
              } else {
                  console.log(memo);
                  // console.log('DELETE removing ID: ' + memo._id);
                  memo.remove(function (err, memo) {
                      if (err) {
                          return console.error(err);
                      } else {
                          //Returning success messages saying it was deleted
                          console.log('DELETE removing ID: ' + memo._id);
                          res.format({
                              //HTML returns us back to the main page, or you can create a success page
                                html: function(){
                                     res.redirect("/memos");
                               },
                               //JSON returns the item with the message that is has been deleted
                              json: function(){
                                     res.json({message : 'deleted',
                                         item : memo
                                     });
                               }
                            });
                      }
                  });
              }
          });
      })
      .put(function(req, res) {
    	    // Get our REST or form values. These rely on the "name" attributes
    	    var name = req.body.name;
    	    //find the document by ID
    	    mongoose.model('Memo').findById(req.params.id, function (err, memo) {
    	        //update it
    	        memo.update({
    	            name : name
    	        }, function (err, memoID) {
    	          if (err) {
    	              res.send("There was a problem updating the information to the database: " + err);
    	          }
    	          else {
                    console.log("akakakaka");
    	                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
    	                  res.format({
    	                      html: function(){
    	                           res.redirect("/memos");
    	                     },
    	                     //JSON responds showing the updated values
    	                    json: function(){
    	                           res.json(memo);
    	                     }
    	                  });
    	           }
    	        })
    	    });
    	})
      .get(function(req, res) {
    	    //search for the blob within Mongo
    	    mongoose.model('Memo').findById(req.params.id, function (err, memo) {
    	        if (err) {
    	            console.log('GET Error: There was a problem retrieving: ' + err);
    	        } else {
    	            //Return the blob
    	            console.log('GET Retrieving ID: ' + memo._id);
    	            res.format({
    	                //HTML response will render the 'edit.jade' template
    	                html: function(){
    	                       res.render('memos/edit', {
    	                          title: 'Memos' + memo._id,
    	                          "memo" : memo
    	                      });
    	                 },
    	                 //JSON response will return the JSON output
    	                json: function(){
    	                       res.json(memo);
    	                 }
    	            });
    	        }
    	    });
    	})


module.exports = router;
