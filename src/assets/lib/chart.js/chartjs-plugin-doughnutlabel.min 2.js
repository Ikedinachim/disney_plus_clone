!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(require("chart.js"))
    : "function" == typeof define && define.amd
    ? define(["chart.js"], e)
    : e(t.Chart);
})(this, function (c) {
  "use strict";
  var t = {
      font: {
        family: void 0,
        lineHeight: 1.2,
        size: void 0,
        style: void 0,
        weight: null,
      },
    },
    l = (c = c && c.hasOwnProperty("default") ? c.default : c).helpers,
    p = {
      parseFont: function (t) {
        var e = c.defaults.global,
          n = l.valueOrDefault(t.size, e.defaultFontSize),
          i = {
            family: l.valueOrDefault(t.family, e.defaultFontFamily),
            lineHeight: l.options.toLineHeight(t.lineHeight, n),
            size: n,
            style: l.valueOrDefault(t.style, e.defaultFontStyle),
            weight: l.valueOrDefault(t.weight, null),
            string: "",
          };
        return (i.string = p.toFontString(i)), i;
      },
      toFontString: function (t) {
        return !t || l.isNullOrUndef(t.size) || l.isNullOrUndef(t.family)
          ? null
          : (t.style ? t.style + " " : "") +
              (t.weight ? t.weight + " " : "") +
              t.size +
              "px " +
              t.family;
      },
      textSize: function (t, e) {
        var n,
          i = [].concat(e),
          l = i.length,
          o = t.font,
          a = 0,
          r = 0;
        for (n = 0; n < l; ++n)
          (t.font = i[n].font.string),
            (a = Math.max(t.measureText(i[n].text).width, a)),
            (r += i[n].font.lineHeight);
        return (t.font = o), { height: r, width: a };
      },
    },
    y = c.helpers;
  (c.defaults.global.plugins.doughnutlabel = t),
    c.plugins.register({
      id: "doughnutlabel",
      beforeDatasetDraw: function (t, e, n) {
        !(function (n, i) {
          if (i && i.labels && 0 < i.labels.length) {
            var l = n.ctx,
              o = y.options.resolve,
              a = [];
            i.labels.forEach(function (t) {
              var e = {
                text: "function" == typeof t.text ? t.text(n) : t.text,
                font: p.parseFont(o([t.font, i.font, {}], l, 0)),
                color: o(
                  [t.color, i.color, c.defaults.global.defaultFontColor],
                  l,
                  0
                ),
              };
              a.push(e);
            });
            var t = p.textSize(l, a),
              e = Math.sqrt(Math.pow(t.width, 2) + Math.pow(t.height, 2)),
              r = (2 * n.innerRadius) / e;
            r < 1 &&
              (a.forEach(function (t) {
                (t.font.size = Math.floor(t.font.size * r)),
                  (t.font.lineHeight = void 0),
                  (t.font = p.parseFont(o([t.font, {}], l, 0)));
              }),
              (t = p.textSize(l, a))),
              (l.textAlign = "center"),
              (l.textBaseline = "middle");
            var f,
              u = (n.chartArea.left + n.chartArea.right) / 2,
              s = (n.chartArea.top + n.chartArea.bottom) / 2 - t.height / 2,
              h = a.length,
              g = 0;
            for (f = 0; f < h; ++f) {
              (l.fillStyle = a[f].color), (l.font = a[f].font.string);
              var d = s + a[f].font.lineHeight / 2 + g;
              (g += a[f].font.lineHeight), l.fillText(a[f].text, u, d);
            }
          }
        })(t, n);
      },
    });
});
