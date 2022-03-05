!(function () {
  "undefined" != typeof self &&
    self.Prism &&
    self.document &&
    document.createRange &&
    ((Prism.plugins.KeepMarkup = !0),
    Prism.hooks.add("before-highlight", function (e) {
      if (e.element.children.length) {
        var n = 0,
          o = [],
          t = function (e, d) {
            var r = {};
            d || ((r.clone = e.cloneNode(!1)), (r.posOpen = n), o.push(r));
            for (var a = 0, s = e.childNodes.length; s > a; a++) {
              var l = e.childNodes[a];
              1 === l.nodeType
                ? t(l)
                : 3 === l.nodeType && (n += l.data.length);
            }
            d || (r.posClose = n);
          };
        t(e.element, !0), o && o.length && (e.keepMarkup = o);
      }
    }),
    Prism.hooks.add("after-highlight", function (e) {
      if (e.keepMarkup && e.keepMarkup.length) {
        var n = function (e, o) {
          for (var t = 0, d = e.childNodes.length; d > t; t++) {
            var r = e.childNodes[t];
            if (1 === r.nodeType) {
              if (!n(r, o)) return !1;
            } else
              3 === r.nodeType &&
                (!o.nodeStart &&
                  o.pos + r.data.length > o.node.posOpen &&
                  ((o.nodeStart = r),
                  (o.nodeStartPos = o.node.posOpen - o.pos)),
                o.nodeStart &&
                  o.pos + r.data.length >= o.node.posClose &&
                  ((o.nodeEnd = r), (o.nodeEndPos = o.node.posClose - o.pos)),
                (o.pos += r.data.length));
            if (o.nodeStart && o.nodeEnd) {
              var a = document.createRange();
              return (
                a.setStart(o.nodeStart, o.nodeStartPos),
                a.setEnd(o.nodeEnd, o.nodeEndPos),
                o.node.clone.appendChild(a.extractContents()),
                a.insertNode(o.node.clone),
                a.detach(),
                !1
              );
            }
          }
          return !0;
        };
        e.keepMarkup.forEach(function (o) {
          n(e.element, { node: o, pos: 0 });
        }),
          (e.highlightedCode = e.element.innerHTML);
      }
    }));
})();
