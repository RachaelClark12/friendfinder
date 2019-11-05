//Dependencies//
var express = require("express");
var path = require("path");

//Express App Setup//
var app = express();
var PORT = process.env.PORT || 3000;

//Express App Data Parsing//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data//
var friends = [
  {
    name: 'Rachael',
    photo: 'https://media.licdn.com/dms/image/C4D03AQF5U7pq_CKCYQ/profile-displayphoto-shrink_200_200/0?e=1578528000&v=beta&t=_VhrPBEEK8KrNN5ULoSeZwEXK5IqQhQrGs1bAGTEPVY',
    scores: [
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1',
      '1'
    ]
  }
]

//Routes//
//htmlRoutes//
//Basic route to display the home page//
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/home.html'));
});

//Survey route//
app.get('/survey', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/survey.html'));
});

//Catch-all route to display the home page//
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/public/home.html'));
// });

//apiRoutes//
//Display all friends//
app.get('/api/friends', function (req, res) {
  return res.json(friends);
});

//Create new friend//
app.post("/api/friends", function (req, res) {
  var newFriend = req.body;
  console.log(newFriend);
  friends.push(newFriend);

  //Compare score array for difference//
  var bestmatch;
  var bestscore = 999;

  for (var i = 0; i < friends.length - 1; i++) {
    var score = 0;
    for (var j = 0; j < 10; j++) {
      var partialsum = Math.abs(friends[i].scores[j] - newFriend.scores[j]);
      score += partialsum;
    }
    if (score < bestscore) {
      bestscore = score;
      bestmatch = i;
    }
  }
  res.json(friends[bestmatch]);
});


//Start the server to begin listening//
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});