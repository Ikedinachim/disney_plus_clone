!(function (e) {
  function n(e) {
    return new RegExp("(\\()" + e + "(?=[\\s\\)])");
  }
  function a(e) {
    return new RegExp("([\\s([])" + e + "(?=[\\s)])");
  }
  var t = "[-+*/_~!@$%^=<>{}\\w]+",
    r = "&" + t,
    i = "(\\()",
    s = "(?=\\))",
    o = "(?=\\s)",
    l = {
      heading: { pattern: /;;;.*/, alias: ["comment", "title"] },
      comment: /;.*/,
      string: {
        pattern: /"(?:[^"\\]*|\\.)*"/,
        greedy: !0,
        inside: {
          argument: /[-A-Z]+(?=[.,\s])/,
          symbol: new RegExp("`" + t + "'"),
        },
      },
      "quoted-symbol": {
        pattern: new RegExp("#?'" + t),
        alias: ["variable", "symbol"],
      },
      "lisp-property": { pattern: new RegExp(":" + t), alias: "property" },
      splice: { pattern: new RegExp(",@?" + t), alias: ["symbol", "variable"] },
      keyword: [
        {
          pattern: new RegExp(
            i +
              "(?:(?:lexical-)?let\\*?|(?:cl-)?letf|if|when|while|unless|cons|cl-loop|and|or|not|cond|setq|error|message|null|require|provide|use-package)" +
              o
          ),
          lookbehind: !0,
        },
        {
          pattern: new RegExp(
            i + "(?:for|do|collect|return|finally|append|concat|in|by)" + o
          ),
          lookbehind: !0,
        },
      ],
      declare: { pattern: n("declare"), lookbehind: !0, alias: "keyword" },
      interactive: {
        pattern: n("interactive"),
        lookbehind: !0,
        alias: "keyword",
      },
      boolean: { pattern: a("(?:t|nil)"), lookbehind: !0 },
      number: { pattern: a("[-+]?\\d+(?:\\.\\d*)?"), lookbehind: !0 },
      defvar: {
        pattern: new RegExp(i + "def(?:var|const|custom|group)\\s+" + t),
        lookbehind: !0,
        inside: { keyword: /^def[a-z]+/, variable: new RegExp(t) },
      },
      defun: {
        pattern: new RegExp(
          i + "(?:cl-)?(?:defun\\*?|defmacro)\\s+" + t + "\\s+\\([\\s\\S]*?\\)"
        ),
        lookbehind: !0,
        inside: {
          keyword: /^(?:cl-)?def\S+/,
          arguments: null,
          function: { pattern: new RegExp("(^\\s)" + t), lookbehind: !0 },
          punctuation: /[()]/,
        },
      },
      lambda: {
        pattern: new RegExp(i + "lambda\\s+\\((?:&?" + t + "\\s*)*\\)"),
        lookbehind: !0,
        inside: { keyword: /^lambda/, arguments: null, punctuation: /[()]/ },
      },
      car: { pattern: new RegExp(i + t), lookbehind: !0 },
      punctuation: [
        /(['`,]?\(|[)\[\]])/,
        { pattern: /(\s)\.(?=\s)/, lookbehind: !0 },
      ],
    },
    p = {
      "lisp-marker": new RegExp(r),
      rest: {
        argument: { pattern: new RegExp(t), alias: "variable" },
        varform: {
          pattern: new RegExp(i + t + "\\s+\\S[\\s\\S]*" + s),
          lookbehind: !0,
          inside: {
            string: l.string,
            boolean: l.boolean,
            number: l.number,
            symbol: l.symbol,
            punctuation: /[()]/,
          },
        },
      },
    },
    d = "\\S+(?:\\s+\\S+)*",
    u = {
      pattern: new RegExp(i + "[\\s\\S]*" + s),
      lookbehind: !0,
      inside: {
        "rest-vars": {
          pattern: new RegExp("&(?:rest|body)\\s+" + d),
          inside: p,
        },
        "other-marker-vars": {
          pattern: new RegExp("&(?:optional|aux)\\s+" + d),
          inside: p,
        },
        keys: {
          pattern: new RegExp("&key\\s+" + d + "(?:\\s+&allow-other-keys)?"),
          inside: p,
        },
        argument: { pattern: new RegExp(t), alias: "variable" },
        punctuation: /[()]/,
      },
    };
  (l.lambda.inside.arguments = u),
    (l.defun.inside.arguments = e.util.clone(u)),
    (l.defun.inside.arguments.inside.sublist = u),
    (e.languages.lisp = l),
    (e.languages.elisp = l),
    (e.languages.emacs = l),
    (e.languages["emacs-lisp"] = l);
})(Prism);
