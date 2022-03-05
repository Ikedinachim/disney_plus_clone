!(function () {
  "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    Prism.languages.markup &&
    ((Prism.plugins.UnescapedMarkup = !0),
    Prism.hooks.add("before-highlightall", function (e) {
      e.selector +=
        ", [class*='lang-'] script[type='text/plain'], [class*='language-'] script[type='text/plain'], script[type='text/plain'][class*='lang-'], script[type='text/plain'][class*='language-']";
    }),
    Prism.hooks.add("before-sanity-check", function (e) {
      if (
        (e.element.matches || e.element.msMatchesSelector).call(
          e.element,
          "script[type='text/plain']"
        )
      ) {
        var t = document.createElement("code"),
          n = document.createElement("pre");
        return (
          (n.className = t.className = e.element.className),
          e.element.dataset &&
            Object.keys(e.element.dataset).forEach(function (t) {
              Object.prototype.hasOwnProperty.call(e.element.dataset, t) &&
                (n.dataset[t] = e.element.dataset[t]);
            }),
          (e.code = e.code.replace(/&lt;\/script(>|&gt;)/gi, "</script>")),
          (t.textContent = e.code),
          n.appendChild(t),
          e.element.parentNode.replaceChild(n, e.element),
          (e.element = t),
          void 0
        );
      }
      var n = e.element.parentNode;
      !e.code &&
        n &&
        "pre" == n.nodeName.toLowerCase() &&
        e.element.childNodes.length &&
        "#comment" == e.element.childNodes[0].nodeName &&
        (e.element.textContent = e.code = e.element.childNodes[0].textContent);
    }));
})();
