var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workout Configuration' });
});

router.get('/read', function(req, res, next) {
  var data = {
      "workouts": [
          {
              "title": "Workout Title",
              "moves": [
                  {
                    "name" : "Move 1",
                    "value" : 19, //secs
                    "type" : "time"
                  },
                  {
                    "name" : "Move 2",
                    "value" : 5, //reps
                    "type" : "reps"
                  }
              ]
          },
          {
              "title": "Workout Title",
              "moves": [
                  //...
              ]
          }
      ]
  };
  res.send(JSON.stringify(data));
});


router.get('/save', function(req, res, next) {
  res.send("OK");
});
module.exports = router;
