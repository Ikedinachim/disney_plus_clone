!(function () {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var e = "line-numbers",
      t = /\n(?!$)/g,
      n = function (e) {
        var n = r(e),
          s = n["white-space"];
        if ("pre-wrap" === s || "pre-line" === s) {
          var l = e.querySelector("code"),
            i = e.querySelector(".line-numbers-rows"),
            a = e.querySelector(".line-numbers-sizer"),
            o = l.textContent.split(t);
          a ||
            ((a = document.createElement("span")),
            (a.className = "line-numbers-sizer"),
            l.appendChild(a)),
            (a.style.display = "block"),
            o.forEach(function (e, t) {
              a.textContent = e || "\n";
              var n = a.getBoundingClientRect().height;
              i.children[t].style.height = n + "px";
            }),
            (a.textContent = ""),
            (a.style.display = "none");
        }
      },
      r = function (e) {
        return e
          ? window.getComputedStyle
            ? getComputedStyle(e)
            : e.currentStyle || null
          : null;
      };
    window.addEventListener("resize", function () {
      Array.prototype.forEach.call(document.querySelectorAll("pre." + e), n);
    }),
      Prism.hooks.add("complete", function (e) {
        if (e.code) {
          var r = e.element.parentNode,
            s = /\s*\bline-numbers\b\s*/;
          if (
            r &&
            /pre/i.test(r.nodeName) &&
            (s.test(r.className) || s.test(e.element.className)) &&
            !e.element.querySelector(".line-numbers-rows")
          ) {
            s.test(e.element.className) &&
              (e.element.className = e.element.className.replace(s, " ")),
              s.test(r.className) || (r.className += " line-numbers");
            var l,
              i = e.code.match(t),
              a = i ? i.length + 1 : 1,
              o = new Array(a + 1);
            (o = o.join("<span></span>")),
              (l = document.createElement("span")),
              l.setAttribute("aria-hidden", "true"),
              (l.className = "line-numbers-rows"),
              (l.innerHTML = o),
              r.hasAttribute("data-start") &&
                (r.style.counterReset =
                  "linenumber " +
                  (parseInt(r.getAttribute("data-start"), 10) - 1)),
              e.element.appendChild(l),
              n(r),
              Prism.hooks.run("line-numbers", e);
          }
        }
      }),
      Prism.hooks.add("line-numbers", function (e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      }),
      (Prism.plugins.lineNumbers = {
        getLine: function (t, n) {
          if ("PRE" === t.tagName && t.classList.contains(e)) {
            var r = t.querySelector(".line-numbers-rows"),
              s = parseInt(t.getAttribute("data-start"), 10) || 1,
              l = s + (r.children.length - 1);
            s > n && (n = s), n > l && (n = l);
            var i = n - s;
            return r.children[i];
          }
        },
      });
  }
})();
