!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var t = [],
      e = {},
      n = function () {};
    Prism.plugins.toolbar = {};
    var a = (Prism.plugins.toolbar.registerButton = function (n, a) {
        var o;
        (o =
          "function" == typeof a
            ? a
            : function (t) {
                var e;
                return (
                  "function" == typeof a.onClick
                    ? ((e = document.createElement("button")),
                      (e.type = "button"),
                      e.addEventListener("click", function () {
                        a.onClick.call(this, t);
                      }))
                    : "string" == typeof a.url
                    ? ((e = document.createElement("a")), (e.href = a.url))
                    : (e = document.createElement("span")),
                  (e.textContent = a.text),
                  e
                );
              }),
          t.push((e[n] = o));
      }),
      o = (Prism.plugins.toolbar.hook = function (a) {
        var o = a.element.parentNode;
        if (
          o &&
          /pre/i.test(o.nodeName) &&
          !o.parentNode.classList.contains("code-toolbar")
        ) {
          var r = document.createElement("div");
          r.classList.add("code-toolbar"),
            o.parentNode.insertBefore(r, o),
            r.appendChild(o);
          var i = document.createElement("div");
          i.classList.add("toolbar"),
            document.body.hasAttribute("data-toolbar-order") &&
              (t = document.body
                .getAttribute("data-toolbar-order")
                .split(",")
                .map(function (t) {
                  return e[t] || n;
                })),
            t.forEach(function (t) {
              var e = t(a);
              if (e) {
                var n = document.createElement("div");
                n.classList.add("toolbar-item"),
                  n.appendChild(e),
                  i.appendChild(n);
              }
            }),
            r.appendChild(i);
        }
      });
    a("label", function (t) {
      var e = t.element.parentNode;
      if (e && /pre/i.test(e.nodeName) && e.hasAttribute("data-label")) {
        var n,
          a,
          o = e.getAttribute("data-label");
        try {
          a = document.querySelector("template#" + o);
        } catch (r) {}
        return (
          a
            ? (n = a.content)
            : (e.hasAttribute("data-url")
                ? ((n = document.createElement("a")),
                  (n.href = e.getAttribute("data-url")))
                : (n = document.createElement("span")),
              (n.textContent = o)),
          n
        );
      }
    }),
      Prism.hooks.add("complete", o);
  }
})();
