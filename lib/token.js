var re = require ('./re');
var token = { scss: {} };

token.newline       = new RegExp("("+re.newline.source+")*");
token.whitespace    = new RegExp("("+re.whitespace.source+")*");
token.ident         = new RegExp("-?([a-z_]|"+re.escape.source+")([a-z0-9_]|"+re.escape.source+")*");
token.scss.variable = new RegExp("\\$("+token.ident.source+")");

module.exports = token;
