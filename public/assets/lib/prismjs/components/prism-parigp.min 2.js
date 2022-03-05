Prism.languages.parigp = {
  comment: /\/\*[\s\S]*?\*\/|\\\\.*/,
  string: { pattern: /"(?:[^"\\\r\n]|\\.)*"/, greedy: !0 },
  keyword: (function () {
    var r = [
      "breakpoint",
      "break",
      "dbg_down",
      "dbg_err",
      "dbg_up",
      "dbg_x",
      "forcomposite",
      "fordiv",
      "forell",
      "forpart",
      "forprime",
      "forstep",
      "forsubgroup",
      "forvec",
      "for",
      "iferr",
      "if",
      "local",
      "my",
      "next",
      "return",
      "until",
      "while",
    ];
    return (
      (r = r
        .map(function (r) {
          return r.split("").join(" *");
        })
        .join("|")),
      RegExp("\\b(?:" + r + ")\\b")
    );
  })(),
  function: /\w[\w ]*?(?= *\()/,
  number: {
    pattern:
      /((?:\. *\. *)?)(?:\d(?: *\d)*(?: *(?!\. *\.)\.(?: *\d)*)?|\. *\d(?: *\d)*)(?: *e *[+-]? *\d(?: *\d)*)?/i,
    lookbehind: !0,
  },
  operator:
    /\. *\.|[*\/!](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\+(?: *[+=])?|-(?: *[-=>])?|<(?:(?: *<)?(?: *=)?| *>)?|>(?: *>)?(?: *=)?|=(?: *=){0,2}|\\(?: *\/)?(?: *=)?|&(?: *&)?|\| *\||['#~^]/,
  punctuation: /[\[\]{}().,:;|]/,
};
