!(function () {
  if (
    "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    document.createElement
  ) {
    var e = {
        javascript: "clike",
        actionscript: "javascript",
        arduino: "cpp",
        aspnet: ["markup", "csharp"],
        bison: "c",
        c: "clike",
        csharp: "clike",
        cpp: "c",
        coffeescript: "javascript",
        crystal: "ruby",
        "css-extras": "css",
        d: "clike",
        dart: "clike",
        django: "markup",
        erb: ["ruby", "markup-templating"],
        fsharp: "clike",
        flow: "javascript",
        glsl: "clike",
        go: "clike",
        groovy: "clike",
        haml: "ruby",
        handlebars: "markup-templating",
        haxe: "clike",
        java: "clike",
        jolie: "clike",
        kotlin: "clike",
        less: "css",
        markdown: "markup",
        "markup-templating": "markup",
        n4js: "javascript",
        nginx: "clike",
        objectivec: "c",
        opencl: "cpp",
        parser: "markup",
        php: ["clike", "markup-templating"],
        "php-extras": "php",
        plsql: "sql",
        processing: "clike",
        protobuf: "clike",
        pug: "javascript",
        qore: "clike",
        jsx: ["markup", "javascript"],
        tsx: ["jsx", "typescript"],
        reason: "clike",
        ruby: "clike",
        sass: "css",
        scss: "css",
        scala: "java",
        smarty: "markup-templating",
        soy: "markup-templating",
        swift: "clike",
        tap: "yaml",
        textile: "markup",
        tt2: ["clike", "markup-templating"],
        twig: "markup",
        typescript: "javascript",
        vbnet: "basic",
        velocity: "markup",
        wiki: "markup",
        xeora: "markup",
        xquery: "markup",
      },
      a = {},
      c = "none",
      t = document.getElementsByTagName("script");
    t = t[t.length - 1];
    var r = "components/";
    if (t.hasAttribute("data-autoloader-path")) {
      var s = t.getAttribute("data-autoloader-path").trim();
      s.length > 0 &&
        !/^[a-z]+:\/\//i.test(t.src) &&
        (r = s.replace(/\/?$/, "/"));
    } else
      /[\w-]+\.js$/.test(t.src) &&
        (r = t.src.replace(/[\w-]+\.js$/, "components/"));
    var i = (Prism.plugins.autoloader = {
        languages_path: r,
        use_minified: !0,
      }),
      t = function (e, a, c) {
        var t = document.createElement("script");
        (t.src = e),
          (t.async = !0),
          (t.onload = function () {
            document.body.removeChild(t), a && a();
          }),
          (t.onerror = function () {
            document.body.removeChild(t), c && c();
          }),
          document.body.appendChild(t);
      },
      n = function (e) {
        return (
          i.languages_path +
          "prism-" +
          e +
          (i.use_minified ? ".min" : "") +
          ".js"
        );
      },
      l = function (e, c) {
        var t = a[e];
        t || (t = a[e] = {});
        var r = c.getAttribute("data-dependencies");
        !r &&
          c.parentNode &&
          "pre" === c.parentNode.tagName.toLowerCase() &&
          (r = c.parentNode.getAttribute("data-dependencies")),
          (r = r ? r.split(/\s*,\s*/g) : []),
          o(r, function () {
            p(e, function () {
              Prism.highlightElement(c);
            });
          });
      },
      o = function (e, a, c) {
        "string" == typeof e && (e = [e]);
        var t = 0,
          r = e.length,
          s = function () {
            r > t
              ? p(
                  e[t],
                  function () {
                    t++, s();
                  },
                  function () {
                    c && c(e[t]);
                  }
                )
              : t === r && a && a(e);
          };
        s();
      },
      p = function (c, r, s) {
        var i = function () {
            var e = !1;
            c.indexOf("!") >= 0 && ((e = !0), (c = c.replace("!", "")));
            var i = a[c];
            if (
              (i || (i = a[c] = {}),
              r &&
                (i.success_callbacks || (i.success_callbacks = []),
                i.success_callbacks.push(r)),
              s &&
                (i.error_callbacks || (i.error_callbacks = []),
                i.error_callbacks.push(s)),
              !e && Prism.languages[c])
            )
              u(c);
            else if (!e && i.error) m(c);
            else if (e || !i.loading) {
              i.loading = !0;
              var l = n(c);
              t(
                l,
                function () {
                  (i.loading = !1), u(c);
                },
                function () {
                  (i.loading = !1), (i.error = !0), m(c);
                }
              );
            }
          },
          l = e[c];
        l && l.length ? o(l, i) : i();
      },
      u = function (e) {
        a[e] &&
          a[e].success_callbacks &&
          a[e].success_callbacks.length &&
          a[e].success_callbacks.forEach(function (a) {
            a(e);
          });
      },
      m = function (e) {
        a[e] &&
          a[e].error_callbacks &&
          a[e].error_callbacks.length &&
          a[e].error_callbacks.forEach(function (a) {
            a(e);
          });
      };
    Prism.hooks.add("complete", function (e) {
      e.element &&
        e.language &&
        !e.grammar &&
        e.language !== c &&
        l(e.language, e.element);
    });
  }
})();
