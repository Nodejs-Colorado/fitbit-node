var connect = require("connect");
var config = require("config3");
var passport = require("passport");
var FitbitStrategy = require("passport-fitbit").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FitbitStrategy(config.fitbit, fitbitSuccess));

function fitbitSuccess(token, tokenSecret, profile, done) {
    // User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  done(null, profile._json.user);
}

function setup(app) {
  app.use(connect.cookieParser());
  app.use(connect.session(config.session));
  app.use(passport.initialize());
  app.use(passport.session());
  app.get("/auth/fitbit", passport.authenticate("fitbit"));
  app.get("/auth/fitbit/callback", passport.authenticate("fitbit", {
    failureRedirect: "/",
    successRedirect: "/"
  }));
}

module.exports = setup;
