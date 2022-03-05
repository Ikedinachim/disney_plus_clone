!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var e = /\s*\bcommand-line\b\s*/;
    Prism.hooks.add("before-highlight", function (a) {
      if (
        ((a.vars = a.vars || {}),
        (a.vars["command-line"] = a.vars["command-line"] || {}),
        a.vars["command-line"].complete || !a.code)
      )
        return (a.vars["command-line"].complete = !0), void 0;
      var n = a.element.parentNode;
      if (
        !n ||
        !/pre/i.test(n.nodeName) ||
        (!e.test(n.className) && !e.test(a.element.className))
      )
        return (a.vars["command-line"].complete = !0), void 0;
      if (a.element.querySelector(".command-line-prompt"))
        return (a.vars["command-line"].complete = !0), void 0;
      var t = a.code.split("\n");
      (a.vars["command-line"].numberOfLines = t.length),
        (a.vars["command-line"].outputLines = []);
      var r = n.getAttribute("data-output"),
        s = n.getAttribute("data-filter-output");
      if (r || "" === r) {
        r = r.split(",");
        for (var o = 0; o < r.length; o++) {
          var m = r[o].split("-"),
            i = parseInt(m[0], 10),
            l = 2 === m.length ? parseInt(m[1], 10) : i;
          if (!isNaN(i) && !isNaN(l)) {
            1 > i && (i = 1), l > t.length && (l = t.length), i--, l--;
            for (var d = i; l >= d; d++)
              (a.vars["command-line"].outputLines[d] = t[d]), (t[d] = "");
          }
        }
      } else if (s) for (var o = 0; o < t.length; o++) 0 === t[o].indexOf(s) && ((a.vars["command-line"].outputLines[o] = t[o].slice(s.length)), (t[o] = ""));
      a.code = t.join("\n");
    }),
      Prism.hooks.add("before-insert", function (e) {
        if (
          ((e.vars = e.vars || {}),
          (e.vars["command-line"] = e.vars["command-line"] || {}),
          !e.vars["command-line"].complete)
        ) {
          for (
            var a = e.highlightedCode.split("\n"), n = 0;
            n < e.vars["command-line"].outputLines.length;
            n++
          )
            e.vars["command-line"].outputLines.hasOwnProperty(n) &&
              (a[n] = e.vars["command-line"].outputLines[n]);
          e.highlightedCode = a.join("\n");
        }
      }),
      Prism.hooks.add("complete", function (a) {
        if (
          ((a.vars = a.vars || {}),
          (a.vars["command-line"] = a.vars["command-line"] || {}),
          !a.vars["command-line"].complete)
        ) {
          var n = a.element.parentNode;
          e.test(a.element.className) &&
            (a.element.className = a.element.className.replace(e, " ")),
            e.test(n.className) || (n.className += " command-line");
          var t = function (e, a) {
              return (n.getAttribute(e) || a).replace(/"/g, "&quot");
            },
            r = new Array(a.vars["command-line"].numberOfLines + 1),
            s = t("data-prompt", "");
          if ("" !== s) r = r.join('<span data-prompt="' + s + '"></span>');
          else {
            var o = t("data-user", "user"),
              m = t("data-host", "localhost");
            r = r.join(
              '<span data-user="' + o + '" data-host="' + m + '"></span>'
            );
          }
          var i = document.createElement("span");
          (i.className = "command-line-prompt"), (i.innerHTML = r);
          for (var l = 0; l < a.vars["command-line"].outputLines.length; l++)
            if (a.vars["command-line"].outputLines.hasOwnProperty(l)) {
              var d = i.children[l];
              d.removeAttribute("data-user"),
                d.removeAttribute("data-host"),
                d.removeAttribute("data-prompt");
            }
          a.element.insertBefore(i, a.element.firstChild),
            (a.vars["command-line"].complete = !0);
        }
      });
  }
})();
