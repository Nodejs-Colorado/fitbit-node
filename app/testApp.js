var app = require("./index");
var cheerio = require("cheerio");
var expect = require("expectacle");
var request = require("supertest")(app);

function expectSelector($, selector) {
  expect($(selector)).toHaveLength(1);
}

function loadPage(URL, callback) {
  request.get(URL).expect(200).end(function(error, res) {
    if (error) {
      callback(error);
      return;
    }
    var $ = cheerio.load(res.text);
    callback(null, $);
  });
}

function get(URL) {
  return request.get(URL);
}

function post(URL) {
  return request.post(URL);
}

exports.expectSelector = expectSelector;
exports.get = get;
exports.loadPage = loadPage;
exports.post = post;
