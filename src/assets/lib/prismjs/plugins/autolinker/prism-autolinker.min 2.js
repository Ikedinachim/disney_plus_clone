!(function () {
  if (
    ("undefined" == typeof self || self.Prism) &&
    ("undefined" == typeof global || global.Prism)
  ) {
    var i =
        /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~\/.:=&]+(?:\?[\w\-+%~\/.:#=?&!$'()*,;]*)?(?:#[\w\-+%~\/.:#=?&!$'()*,;]*)?/,
      n = /\b\S+@[\w.]+[a-z]{2}/,
      e = /\[([^\]]+)]\(([^)]+)\)/,
      t = ["comment", "url", "attr-value", "string"];
    (Prism.plugins.autolinker = {
      processGrammar: function (r) {
        r &&
          !r["url-link"] &&
          (Prism.languages.DFS(r, function (r, a, l) {
            t.indexOf(l) > -1 &&
              "Array" !== Prism.util.type(a) &&
              (a.pattern || (a = this[r] = { pattern: a }),
              (a.inside = a.inside || {}),
              "comment" == l && (a.inside["md-link"] = e),
              "attr-value" == l
                ? Prism.languages.insertBefore(
                    "inside",
                    "punctuation",
                    { "url-link": i },
                    a
                  )
                : (a.inside["url-link"] = i),
              (a.inside["email-link"] = n));
          }),
          (r["url-link"] = i),
          (r["email-link"] = n));
      },
    }),
      Prism.hooks.add("before-highlight", function (i) {
        Prism.plugins.autolinker.processGrammar(i.grammar);
      }),
      Prism.hooks.add("wrap", function (i) {
        if (/-link$/.test(i.type)) {
          i.tag = "a";
          var n = i.content;
          if ("email-link" == i.type && 0 != n.indexOf("mailto:"))
            n = "mailto:" + n;
          else if ("md-link" == i.type) {
            var t = i.content.match(e);
            (n = t[2]), (i.content = t[1]);
          }
          i.attributes.href = n;
        }
        try {
          i.content = decodeURIComponent(i.content);
        } catch (r) {}
      });
  }
})();
