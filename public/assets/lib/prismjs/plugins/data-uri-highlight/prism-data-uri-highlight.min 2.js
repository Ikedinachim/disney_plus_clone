!(function () {
  if (
    ("undefined" == typeof self || self.Prism) &&
    ("undefined" == typeof global || global.Prism)
  ) {
    var i = function (i) {
        return (
          Prism.plugins.autolinker &&
            Prism.plugins.autolinker.processGrammar(i),
          i
        );
      },
      a = {
        pattern: /(.)\bdata:[^\/]+\/[^,]+,(?:(?!\1)[\s\S]|\\\1)+(?=\1)/,
        lookbehind: !0,
        inside: {
          "language-css": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?css,)[\s\S]+/,
            lookbehind: !0,
          },
          "language-javascript": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?javascript,)[\s\S]+/,
            lookbehind: !0,
          },
          "language-json": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?json,)[\s\S]+/,
            lookbehind: !0,
          },
          "language-markup": {
            pattern: /(data:[^\/]+\/(?:[^+,]+\+)?(?:html|xml),)[\s\S]+/,
            lookbehind: !0,
          },
        },
      },
      n = ["url", "attr-value", "string"];
    (Prism.plugins.dataURIHighlight = {
      processGrammar: function (i) {
        i &&
          !i["data-uri"] &&
          (Prism.languages.DFS(i, function (i, e, r) {
            n.indexOf(r) > -1 &&
              "Array" !== Prism.util.type(e) &&
              (e.pattern || (e = this[i] = { pattern: e }),
              (e.inside = e.inside || {}),
              "attr-value" == r
                ? Prism.languages.insertBefore(
                    "inside",
                    e.inside["url-link"] ? "url-link" : "punctuation",
                    { "data-uri": a },
                    e
                  )
                : e.inside["url-link"]
                ? Prism.languages.insertBefore(
                    "inside",
                    "url-link",
                    { "data-uri": a },
                    e
                  )
                : (e.inside["data-uri"] = a));
          }),
          (i["data-uri"] = a));
      },
    }),
      Prism.hooks.add("before-highlight", function (n) {
        if (a.pattern.test(n.code))
          for (var e in a.inside)
            if (
              a.inside.hasOwnProperty(e) &&
              !a.inside[e].inside &&
              a.inside[e].pattern.test(n.code)
            ) {
              var r = e.match(/^language-(.+)/)[1];
              Prism.languages[r] &&
                (a.inside[e].inside = { rest: i(Prism.languages[r]) });
            }
        Prism.plugins.dataURIHighlight.processGrammar(n.grammar);
      });
  }
})();
