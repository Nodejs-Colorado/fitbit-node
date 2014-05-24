var express = require("express");

var app = express();
app.use(express.static(__dirname + "/../public"));
app.set("views", __dirname);
app.set("view engine", "jade");
app.locals.titleSuffix = " | FitBit Leader Board";
app.locals.addTitleSuffix = true;

app.use(require("./fitbitAuth"));
app.use("/activities", require("./activities"));
app.get("/", function (req, res) {
  res.locals.addTitleSuffix = false;
  res.render("home");
});

module.exports = app;
