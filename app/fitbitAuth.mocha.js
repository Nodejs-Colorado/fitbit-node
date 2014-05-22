var testApp = require("./testApp");
var expect = require("expectacle");

describe("FitBit authentication", function () {

  it("should redirect to fitbit", function(done) {
    //https://api.fitbit.com/oauth/authorize?oauth_token=72c7b12f45e4bd5d321998703ee0a680
    testApp.get("/auth/fitbit")
      .expect("Location", /https:\/\/api\.fitbit\.com\/oauth\/authorize/i)
      .expect(302)
      .end(done);
  });

  it("should redirect to fitbit with an empty callback", function(done) {
    //https://api.fitbit.com/oauth/authorize?oauth_token=72c7b12f45e4bd5d321998703ee0a680
    testApp.get("/auth/fitbit/callback")
      .expect("Location", /https:\/\/api\.fitbit\.com\/oauth\/authorize/i)
      .expect(302)
      .end(done);
  });

  it("should establish a session cookie for the home page", function(done) {
    testApp.get("/")
      .expect("Set-Cookie", /connect\.sid/i)
      .end(done);
  });
});

