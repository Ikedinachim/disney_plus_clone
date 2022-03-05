!(function () {
  "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    Prism.hooks.add("before-sanity-check", function (e) {
      if (e.code) {
        var s = e.element.parentNode,
          n = /\s*\bkeep-initial-line-feed\b\s*/;
        !s ||
          "pre" !== s.nodeName.toLowerCase() ||
          n.test(s.className) ||
          n.test(e.element.className) ||
          (e.code = e.code.replace(/^(?:\r?\n|\r)/, ""));
      }
    });
})();
