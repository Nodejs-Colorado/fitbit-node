var app = require("express")();
var connect = require("connect");

app.set("views", __dirname);
app.set("view engine", "jade");
app.locals.titleSuffix = " | FitBit Leader Board";
app.locals.addTitleSuffix = true;

app.use(connect.static(__dirname + "/../public"));
require("./fitbitAuth")(app);

app.get("/", function (req, res) {
  res.locals.user = req.user;
  res.locals.addTitleSuffix = false;
  res.render("home");
});

module.exports = app;
