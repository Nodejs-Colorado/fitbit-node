var _ = require("lodash");
//External code central to the app should set this to a monk collection
//when a real database connection should be used
exports.col = null;
function col() {
  return exports.col;
}

function contactToUser(contact) {
  var user = _.pick(contact, "id", "provider");
  return _.extend(user, contact._json.user);
}

function saveContact(contact, callback) {
  var user = contactToUser(contact);
  var query = _.pick(contact, "provider", "id");
  col().update(query, user, {upsert: true, multi: false}, function (error) {
    if (error) {
      callback(error);
      return;
    }
    col().findOne(query, callback);
  });
}

function findById() {
  return col().findById.apply(col(), arguments);
}

exports.contactToUser = contactToUser;
exports.findById = findById;
exports.saveContact = saveContact;
