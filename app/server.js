var app = require("./index");
var config = require("config3");
var db = require("monk")(config.mongodb.url, {}, function (error) {
  if (error) {
    console.error("Could not connect to", config.mongodb.url);
    process.exit(11);
  }
  console.log("Connected to db at", config.mongodb.url);
});
require("./userStore").col = db.get("users");


app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    console.error("Server cannot start. Error binding network port.", error);
    process.exit(10);
  }
  console.log("Express server listening on port", config.express.port);
});
