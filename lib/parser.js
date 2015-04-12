var re = require ('./re');
var token = require ('./token');
var parser = {};

parser.newline = function (s) {
  if (!s.scan(token.newline)) return null;
  return {
    type: 'newline',
    length: s.getMatch().length,
    capture: s.getMatch(),
  };
};

parser.whitespace = function (s) {
  if (!s.scan(token.whitespace)) return null;
  return {
    type: 'whitespace',
    length: s.getMatch().length,
    capture: s.getMatch(),
  };
};

parser.variable = function (s) {
  if (!s.scan(token.scss.variable)) return null;
  return {
    type: 'variable',
    name: s.getCapture(1),
    capture: s.getCapture(1),
  };
};


parser.string = function (s) {
  if (s.scan(/["']/) === null && s.scan(token.ident) === null) return null;
  var quote = /["']/.test(s.getMatch()) && s.getMatch();
  var capture = '';

  if (quote) {
    while (!s.hasTerminated() && s.peek() !== quote) capture += s.scanChar();
    if (!s.scan(quote)) throw 'Unterminated string';
    capture = quote + capture + quote;
  }
  else {
    capture = s.getMatch();
  }

  return {
    type: 'string',
    quoted: !!quote,
    quote: quote,
    capture: capture,
  };
};

parser.assignment = function (s) {
  if (!s.check('\\$')) return null;

  var variable = parser.variable(s);
  var spaceBeforeColon = parser.whitespace(s);
  if (!s.scan(':')) throw 'Expect : after variable in assignment';
  var spaceAfterColon = parser.whitespace(s);
  var value = parser.string(s) || false;

  return {
    type: 'assignment',
    left: variable,
    right: value,
    spaceBeforeColon: spaceBeforeColon,
    spaceAfterColon: spaceAfterColon,
  };
};




module.exports = parser;
