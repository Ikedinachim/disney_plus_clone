!(function () {
  "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    document.querySelector &&
    ((self.Prism.fileHighlight = function () {
      var t = {
        js: "javascript",
        py: "python",
        rb: "ruby",
        ps1: "powershell",
        psm1: "powershell",
        sh: "bash",
        bat: "batch",
        h: "c",
        tex: "latex",
      };
      Array.prototype.slice
        .call(document.querySelectorAll("pre[data-src]"))
        .forEach(function (e) {
          for (
            var a,
              n = e.getAttribute("data-src"),
              r = e,
              o = /\blang(?:uage)?-([\w-]+)\b/i;
            r && !o.test(r.className);

          )
            r = r.parentNode;
          if ((r && (a = (e.className.match(o) || [, ""])[1]), !a)) {
            var s = (n.match(/\.(\w+)$/) || [, ""])[1];
            a = t[s] || s;
          }
          var l = document.createElement("code");
          (l.className = "language-" + a),
            (e.textContent = ""),
            (l.textContent = "Loading…"),
            e.appendChild(l);
          var i = new XMLHttpRequest();
          i.open("GET", n, !0),
            (i.onreadystatechange = function () {
              4 == i.readyState &&
                (i.status < 400 && i.responseText
                  ? ((l.textContent = i.responseText),
                    Prism.highlightElement(l))
                  : (l.textContent =
                      i.status >= 400
                        ? "✖ Error " +
                          i.status +
                          " while fetching file: " +
                          i.statusText
                        : "✖ Error: File does not exist or is empty"));
            }),
            i.send(null);
        }),
        Prism.plugins.toolbar &&
          Prism.plugins.toolbar.registerButton("download-file", function (t) {
            var e = t.element.parentNode;
            if (
              e &&
              /pre/i.test(e.nodeName) &&
              e.hasAttribute("data-src") &&
              e.hasAttribute("data-download-link")
            ) {
              var a = e.getAttribute("data-src"),
                n = document.createElement("a");
              return (
                (n.textContent =
                  e.getAttribute("data-download-link-label") || "Download"),
                n.setAttribute("download", ""),
                (n.href = a),
                n
              );
            }
          });
    }),
    document.addEventListener("DOMContentLoaded", self.Prism.fileHighlight));
})();
