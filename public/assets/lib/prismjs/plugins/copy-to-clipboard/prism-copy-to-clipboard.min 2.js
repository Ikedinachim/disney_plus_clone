!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    if (!Prism.plugins.toolbar)
      return (
        console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."),
        void 0
      );
    var o = window.ClipboardJS || void 0;
    o || "function" != typeof require || (o = require("clipboard"));
    var e = [];
    if (!o) {
      var t = document.createElement("script"),
        n = document.querySelector("head");
      (t.onload = function () {
        if ((o = window.ClipboardJS)) for (; e.length; ) e.pop()();
      }),
        (t.src =
          "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"),
        n.appendChild(t);
    }
    Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (t) {
      function n() {
        var e = new o(i, {
          text: function () {
            return t.code;
          },
        });
        e.on("success", function () {
          (i.textContent = "Copied!"), r();
        }),
          e.on("error", function () {
            (i.textContent = "Press Ctrl+C to copy"), r();
          });
      }
      function r() {
        setTimeout(function () {
          i.textContent = "Copy";
        }, 5e3);
      }
      var i = document.createElement("a");
      return (i.textContent = "Copy"), o ? n() : e.push(n), i;
    });
  }
})();
