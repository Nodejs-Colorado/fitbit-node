//Override values in a config.local.js file
//See https://www.npmjs.org/package/config3
var pack = require("./package");
var DEFAULT_PORT = process.env.PORT || 1337;
var FITBIT_BASE_URL = "https://api.fitbit.com";

module.exports = {
  express: {
    port: DEFAULT_PORT,
    ip: process.env.IP || "127.0.0.1"
  },
  session: {
    secret: "bo3(rw7vdaeCZdq",
    useMongodb: process.env.NODE_ENV !== "test"
  },
  fitbit: {
    baseUrl: FITBIT_BASE_URL,
    accessUrl: FITBIT_BASE_URL + "/oauth/access_token",
    requestUrl: FITBIT_BASE_URL + "/oauth/request_token",
    consumerKey: "You must get one for yourself and set it in config.local.js",
    consumerSecret: "You must get one for yourself and set it in config.local.js",
    callbackURL: "http://localhost:" + DEFAULT_PORT + "/auth/fitbit/callback"
  },
  mongodb: {
    url: "mongodb://localhost/" + pack.name
  }
};
