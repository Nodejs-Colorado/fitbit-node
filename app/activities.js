var app = require("express")();
var config = require("config3");
var request = require("superagent");
require("superagent-oauth")(request);

app.get("/:date", function (req, res) {
  var url = [
    config.fitbit.baseUrl,
    "/1/user/",
    req.user.id,
    "/activities/date/",
    req.params.date,
    ".json"
  ].join("");
  request.get(url)
  .sign(req.oauth, req.user.token, req.user.tokenSecret)
  .end(function (error, fitbitRes) {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.send(fitbitRes.text);
  });
});

module.exports = app;
