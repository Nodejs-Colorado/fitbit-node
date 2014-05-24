var _ = require("lodash");
var userStore = require("./userStore");
var expect = require("expectacle");
var fitbitContact = require("./fitbitContact.mocha");

describe("userStore", function () {
  it("should allow setting the collection to use", function() {
    expect(userStore.col).toBeNull();
    var mockCol = {};
    userStore.col = mockCol;
    expect(userStore.col).toEqual(mockCol);
  });
});

describe("userStore.contactToUser", function () {
  it("should construct the correct user object for a fitbit contact", function() {
    fitbitContact.token = "TOKEN";
    fitbitContact.tokenSecret = "TOKENSECRET";
    var user = userStore.contactToUser(fitbitContact);
    _.each({
      id: "12345",
      displayName: "Bobby Tester",
      provider: "fitbit",
      gender: "MALE",
      token: "TOKEN",
      tokenSecret: "TOKENSECRET"
    }, function (value, property) {
      expect(user).toHaveProperty(property);
      expect(user[property]).toEqual(value);
    });
  });
});
