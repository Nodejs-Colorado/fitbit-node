// module dependencies
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    Faker = require('Faker');

// create express server
var app = express();


// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// routes
app.get('/', routes.index);
app.get('/api', routes.api);
app.get('/ping', routes.ping);

// api endpoints
app.get('/api/v1/posts', function (req, res){
  var totalPosts = 10000 + Faker.Helpers.randomNumber(2000);
  console.log(totalPosts)
  return res.send({"total_posts":totalPosts});
});
app.get('/api/v1/comments', function (req, res){
  var totalComments = 100000 + Faker.Helpers.randomNumber(2000);
  console.log(totalComments)
  return res.send({"total_comments":totalComments});
});
app.get('/api/v1/users', function (req, res){
  var totalUsers = 1000 + Faker.Helpers.randomNumber(2000);
  console.log(totalUsers)
  return res.send({"total_users":totalUsers});
});
app.get('/api/v1/active', function (req, res){
  var totalActive = 10000 + Faker.Helpers.randomNumber(2000);
  console.log(totalActive)
  return res.send({"total_active_users":totalActive});
});
app.get('/api/v1/likes', function (req, res){
  totalLikes = []
  for(i = 7; i >= 0; i--){
    totalLikes.push({"date":moment(Faker.Date.future(20000)).format("X"), 
      "likes":100+Faker.Helpers.randomNumber(200)})
  };
  return res.send(totalLikes);
});
app.get('/api/v1/foo', function (req, res){
  var totalFoo = [{ key: "One", y: 5 },{ key: "Two", y: 2 },{ key: "Three", y: 9 },{ key: "Four", y: 7 },
{ key: "Five", y: 4 },{ key: "Six", y: 3 },{ key: "Seven", y: 9 }]
  console.log(totalFoo)
  return res.send({"total_foo":totalFoo});
});
app.get('/api/v1/bar', function (req, res){
  var totalBar = [{ key: "One", y: 5 },{ key: "Two", y: 2 },{ key: "Three", y: 9 },{ key: "Four", y: 7 },
{ key: "Five", y: 4 },{ key: "Six", y: 3 },{ key: "Seven", y: 9 }]
  console.log(totalBar)
  return res.send({"total_bar":totalBar});
});



// launch server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
