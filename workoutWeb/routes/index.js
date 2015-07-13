var express = require('express');
var router = express.Router();

var assert = require('assert');

var MongoDb = require('mongodb');
var mongoClient = MongoDb.MongoClient;
var mongoWIO = null;

var url = 'mongodb://localhost:27017/workitout';
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workout Configuration' });
});

router.all('/read', function(req, res, next) {
  mongoClient.connect(url, function(err, db){
    assert.equal(null,err);
    console.log(req.body);
    if(!req.body.data || !req.body.data.user){
      res.send(JSON.stringify({workouts:[]}));
      return;
    }
    var workouts = db.collection('workouts');
    console.log("user: "+req.body.data.user);
    workouts.findOne({user: req.body.data.user}, function(err, w){
      console.log(w);
      assert.equal(null,err);
      var data = null;
      if(w!=null)
        var data =w;
      else
        var data = {"workouts": ""};

      res.send(JSON.stringify(data));
    });
  });
});


router.post('/save', function(req, res, next) {

  console.log(req.body.data);
  var wts = JSON.parse(req.body.data);
  console.log(wts);
  mongoClient.connect(url, function(err, db){
    console.log(err);
    assert.equal(null, err);
    var workouts = db.collection('workouts');
    console.log("got collection");
    workouts.deleteMany({user: wts.user});
    console.log("deleted all workouts");
    workouts.insertOne(wts, function(err, r){
      console.log(err);
      assert.equal(null,err);
      res.send("OK");
    });
  });
});
module.exports = router;
