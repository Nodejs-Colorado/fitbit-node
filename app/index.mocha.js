var testApp = require("./testApp");
var expect = require("expectacle");

describe("static assets", function () {
  it("should serve the favicon", function(done) {
    testApp.get("/favicon.ico")
      .expect("Content-Type", "image/x-icon")
      .expect(200)
      .end(done);
  });
});

describe("the home page HTML", function () {
  var $ = null;

  before(function(done) {
    testApp.loadPage("/", function(error, dom) {
      $ = dom;
      done(error);
    });
  });

  it('should have the correct title', function() {
    expect($("title").text()).toEqual("FitBit Leader Board");
  });

  it('should link to a favicon', function() {
    testApp.expectSelector($, "link[rel=icon]");
  });
});
