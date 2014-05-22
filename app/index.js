var app = require("express")();
var connect = require("connect");

app.set("port", process.env.PORT || 1337);
app.set("ip", process.env.IP || "127.0.0.1");
app.set("views", __dirname);
app.set("view engine", "jade");
app.locals.titleSuffix = " | FitBit Leader Board";
app.locals.addTitleSuffix = true;

app.use(connect.static(__dirname + "/../public"));

app.get("/", function (req, res) {
  res.locals.addTitleSuffix = false;
  res.render("home");
});

module.exports = app;
