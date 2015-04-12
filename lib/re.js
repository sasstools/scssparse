var re = { scss: {} };

re.newline     = /\r\n|\r|\n|\f/;
re.whitespace  = new RegExp(" |\\t|" + re.newline.source);
re.hexdigit    = /[a-f0-9]/i;
re.escape      = new RegExp("\\\\("+re.hexdigit.source+"{1,6}"+re.whitespace.source+"?|(?!("+re.newline.source+"|"+re.hexdigit.source+")))");
re.ident       = /-?[a-z_][[a-z0-9_]*/;

module.exports = re;
