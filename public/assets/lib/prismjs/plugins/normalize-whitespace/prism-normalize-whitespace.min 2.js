!(function () {
  function e(e) {
    this.defaults = r({}, e);
  }
  function n(e) {
    return e.replace(/-(\w)/g, function (e, n) {
      return n.toUpperCase();
    });
  }
  function t(e) {
    for (var n = 0, t = 0; t < e.length; ++t)
      e.charCodeAt(t) == "	".charCodeAt(0) && (n += 3);
    return e.length + n;
  }
  var r =
    Object.assign ||
    function (e, n) {
      for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
      return e;
    };
  (e.prototype = {
    setDefaults: function (e) {
      this.defaults = r(this.defaults, e);
    },
    normalize: function (e, t) {
      t = r(this.defaults, t);
      for (var i in t) {
        var o = n(i);
        "normalize" !== i &&
          "setDefaults" !== o &&
          t[i] &&
          this[o] &&
          (e = this[o].call(this, e, t[i]));
      }
      return e;
    },
    leftTrim: function (e) {
      return e.replace(/^\s+/, "");
    },
    rightTrim: function (e) {
      return e.replace(/\s+$/, "");
    },
    tabsToSpaces: function (e, n) {
      return (n = 0 | n || 4), e.replace(/\t/g, new Array(++n).join(" "));
    },
    spacesToTabs: function (e, n) {
      return (n = 0 | n || 4), e.replace(new RegExp(" {" + n + "}", "g"), "	");
    },
    removeTrailing: function (e) {
      return e.replace(/\s*?$/gm, "");
    },
    removeInitialLineFeed: function (e) {
      return e.replace(/^(?:\r?\n|\r)/, "");
    },
    removeIndent: function (e) {
      var n = e.match(/^[^\S\n\r]*(?=\S)/gm);
      return n && n[0].length
        ? (n.sort(function (e, n) {
            return e.length - n.length;
          }),
          n[0].length ? e.replace(new RegExp("^" + n[0], "gm"), "") : e)
        : e;
    },
    indent: function (e, n) {
      return e.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++n).join("	") + "$&");
    },
    breakLines: function (e, n) {
      n = n === !0 ? 80 : 0 | n || 80;
      for (var r = e.split("\n"), i = 0; i < r.length; ++i)
        if (!(t(r[i]) <= n)) {
          for (var o = r[i].split(/(\s+)/g), a = 0, s = 0; s < o.length; ++s) {
            var l = t(o[s]);
            (a += l), a > n && ((o[s] = "\n" + o[s]), (a = l));
          }
          r[i] = o.join("");
        }
      return r.join("\n");
    },
  }),
    "undefined" != typeof module && module.exports && (module.exports = e),
    "undefined" != typeof Prism &&
      ((Prism.plugins.NormalizeWhitespace = new e({
        "remove-trailing": !0,
        "remove-indent": !0,
        "left-trim": !0,
        "right-trim": !0,
      })),
      Prism.hooks.add("before-sanity-check", function (e) {
        var n = Prism.plugins.NormalizeWhitespace;
        if (!e.settings || e.settings["whitespace-normalization"] !== !1) {
          if ((!e.element || !e.element.parentNode) && e.code)
            return (e.code = n.normalize(e.code, e.settings)), void 0;
          var t = e.element.parentNode,
            r = /\bno-whitespace-normalization\b/;
          if (
            e.code &&
            t &&
            "pre" === t.nodeName.toLowerCase() &&
            !r.test(t.className) &&
            !r.test(e.element.className)
          ) {
            for (
              var i = t.childNodes, o = "", a = "", s = !1, l = 0;
              l < i.length;
              ++l
            ) {
              var c = i[l];
              c == e.element
                ? (s = !0)
                : "#text" === c.nodeName &&
                  (s ? (a += c.nodeValue) : (o += c.nodeValue),
                  t.removeChild(c),
                  --l);
            }
            if (e.element.children.length && Prism.plugins.KeepMarkup) {
              var u = o + e.element.innerHTML + a;
              (e.element.innerHTML = n.normalize(u, e.settings)),
                (e.code = e.element.textContent);
            } else
              (e.code = o + e.code + a),
                (e.code = n.normalize(e.code, e.settings));
          }
        }
      }));
})();
