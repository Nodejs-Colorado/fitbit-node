var app = require("./index");

app.listen(app.get("port"), app.get("ip"), function (error) {
  if (error) {
    console.error("Server cannot start. Error binding network port.", error);
    process.exit(10);
  }
  console.log("Express server listening on port", app.get("port"));
});
