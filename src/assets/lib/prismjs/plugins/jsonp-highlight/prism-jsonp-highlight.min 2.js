!(function () {
  function t(t) {
    "function" != typeof t || e(t) || r.push(t);
  }
  function e(t) {
    return "function" == typeof t
      ? r.filter(function (e) {
          return e.valueOf() === t.valueOf();
        })[0]
      : "string" == typeof t && t.length > 0
      ? r.filter(function (e) {
          return e.name === t;
        })[0]
      : null;
  }
  function n(t) {
    if (("string" == typeof t && (t = e(t)), "function" == typeof t)) {
      var n = r.indexOf(t);
      n >= 0 && r.splice(n, 1);
    }
  }
  function a() {
    Array.prototype.slice
      .call(document.querySelectorAll("pre[data-jsonp]"))
      .forEach(function (t) {
        t.textContent = "";
        var e = document.createElement("code");
        (e.textContent = i), t.appendChild(e);
        var n = t.getAttribute("data-adapter"),
          a = null;
        if (n) {
          if ("function" != typeof window[n])
            return (
              (e.textContent =
                "JSONP adapter function '" + n + "' doesn't exist"),
              void 0
            );
          a = window[n];
        }
        var u = "prismjsonp" + o++,
          f = document.createElement("a"),
          l = (f.href = t.getAttribute("data-jsonp"));
        f.href +=
          (f.search ? "&" : "?") +
          (t.getAttribute("data-callback") || "callback") +
          "=" +
          u;
        var s = setTimeout(function () {
            e.textContent === i &&
              (e.textContent = "Timeout loading '" + l + "'");
          }, 5e3),
          d = document.createElement("script");
        (d.src = f.href),
          (window[u] = function (n) {
            document.head.removeChild(d), clearTimeout(s), delete window[u];
            var o = "";
            if (a) o = a(n, t);
            else for (var i in r) if (((o = r[i](n, t)), null !== o)) break;
            null === o
              ? (e.textContent =
                  "Cannot parse response (perhaps you need an adapter function?)")
              : ((e.textContent = o), Prism.highlightElement(e));
          }),
          document.head.appendChild(d);
      });
  }
  if (self.Prism && self.document && document.querySelectorAll && [].filter) {
    var r = [];
    (Prism.plugins.jsonphighlight = {
      registerAdapter: t,
      removeAdapter: n,
      highlight: a,
    }),
      t(function (t) {
        if (t && t.meta && t.data) {
          if (t.meta.status && t.meta.status >= 400)
            return "Error: " + (t.data.message || t.meta.status);
          if ("string" == typeof t.data.content)
            return "function" == typeof atob
              ? atob(t.data.content.replace(/\s/g, ""))
              : "Your browser cannot decode base64";
        }
        return null;
      }),
      t(function (t, e) {
        if (t && t.meta && t.data && t.data.files) {
          if (t.meta.status && t.meta.status >= 400)
            return "Error: " + (t.data.message || t.meta.status);
          var n = e.getAttribute("data-filename");
          if (null == n)
            for (var a in t.data.files)
              if (t.data.files.hasOwnProperty(a)) {
                n = a;
                break;
              }
          return void 0 !== t.data.files[n]
            ? t.data.files[n].content
            : "Error: unknown or missing gist file " + n;
        }
        return null;
      }),
      t(function (t) {
        return t && t.node && "string" == typeof t.data ? t.data : null;
      });
    var o = 0,
      i = "Loading…";
    a();
  }
})();
