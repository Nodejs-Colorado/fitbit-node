var app = require("express")();
var config = require("config3");
var FitbitStrategy = require("passport-fitbit").Strategy;
var OAuth = require("oauth");
var passport = require("passport");
var session = require("express-session");
var userStore = require("./userStore");

var sessionOptions = {
  secret: config.session.secret
};
if (config.session.useMongodb) {
  var MongoStore = require("connect-mongo")(session);
  sessionOptions.store = new MongoStore(config.mongodb);
}

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  userStore.findById(_id, done);
});
passport.use(new FitbitStrategy(config.fitbit, fitbitSuccess));

var oauth = new OAuth.OAuth(
  config.fitbit.accessUrl,
  config.fitbit.requestUrl,
  config.fitbit.consumerKey,
  config.fitbit.consumerSecret,
  "1.0",
  null,
  "HMAC-SHA1"
);
function fitbitSuccess(token, tokenSecret, contact, done) {
  contact.token = token;
  contact.tokenSecret = tokenSecret;
  userStore.saveContact(contact, function (error, user) {
    if (error) {
      done(error);
      return;
    }
    done(null, user);
  });
}

app.use(require("cookie-parser")());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  req.oauth = oauth;
  res.locals.user = req.user;
  next();
});
app.get("/auth/fitbit", passport.authenticate("fitbit"));
app.get("/auth/fitbit/callback", passport.authenticate("fitbit", {
  failureRedirect: "/",
  successRedirect: "/"
}));
app.get("/auth/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = app;
