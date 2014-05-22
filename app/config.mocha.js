var config = require("config3");
var expect = require("expectacle");

describe('config', function () {
  it('should have express stuff', function() {
    expect(config.express).toHaveProperty('ip');
    expect(config.express).toHaveProperty('port');
  });

  it('should have session stuff', function() {
    expect(config.session).toHaveProperty('secret');
  });
});
