var app = require("./index");
var config = require("config3");

app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    console.error("Server cannot start. Error binding network port.", error);
    process.exit(10);
  }
  console.log("Express server listening on port", config.express.port);
});
