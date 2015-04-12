


var str = `

$foo:   "bar";


`;

var re = require('./lib/re');
var token = require('./lib/token');
var parser = require('./lib/parser');
var Scanner = require("pstrscan");
var s = new Scanner(str);

//
// Parse
//

while (!s.hasTerminated()) {
  if (s.check(new RegExp(token.scss.variable.source+':')))
    console.log(parser.assignment(s))
  else if (s.check(token.scss.variable))
    console.log(parser.variable(s))
  else if (s.check(/(["'a-z-])/i))
    console.log(parser.string(s))
  else if (s.check(token.newline))
    console.log(parser.newline(s))
  else if (s.check(token.whitespace))
    console.log(parser.whitespace(s))
  else if (s.scan(/[^]/)) // always true
    console.log({
      type: 'uncategorised',
      length: s.getMatch().length,
      capture: s.getMatch(),
    });
}
