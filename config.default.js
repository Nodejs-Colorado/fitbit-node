//Override values in a config.local.js file
//See https://www.npmjs.org/package/config3
var DEFAULT_PORT = process.env.PORT || 1337;
module.exports = {
  express: {
    port: DEFAULT_PORT,
    ip: process.env.IP || "127.0.0.1"
  },
  session: {
    secret: "bo3(rw7vdaeCZdq"
  },
  fitbit: {
    consumerKey: 'You must get one for yourself and set it in config.local.js',
    consumerSecret: 'You must get one for yourself and set it in config.local.js',
    callbackURL: 'http://localhost:' + DEFAULT_PORT + '/auth/fitbit/callback'
  }
};
