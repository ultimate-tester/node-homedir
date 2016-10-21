// references

var path = require('path');
var uidToUsername = require("userid-username");
var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

// exports

module.exports = homedir;

/**
 * Resolves the path to the user's home directory.
 *
 * @param {String/Number} [username]
 * Username of user whose path you seek.
 *
 * @param {Function} [next]
 * Callback function with an error and the full path to the user's home directory as parameters.
 */

function homedir(username, next) {
  if (typeof username == 'function') {
    next = username;
  }

  if (typeof username == 'number') {
    uidToUsername(username, function (err, username) {
      next(err, path.resolve(path.dirname(home), username));
    });
  } else {
    next(null, username ? path.resolve(path.dirname(home), username) : home);
  }
}

