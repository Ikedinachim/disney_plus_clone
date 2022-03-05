!(function () {
  function e(e) {
    var n = e.toLowerCase();
    if (t.HTML[n]) return "html";
    if (t.SVG[e]) return "svg";
    if (t.MathML[e]) return "mathml";
    if (0 !== t.HTML[n] && "undefined" != typeof document) {
      var a = (document
        .createElement(e)
        .toString()
        .match(/\[object HTML(.+)Element\]/) || [])[1];
      if (a && "Unknown" != a) return (t.HTML[n] = 1), "html";
    }
    if (((t.HTML[n] = 0), 0 !== t.SVG[e] && "undefined" != typeof document)) {
      var s = (document
        .createElementNS("http://www.w3.org/2000/svg", e)
        .toString()
        .match(/\[object SVG(.+)Element\]/) || [])[1];
      if (s && "Unknown" != s) return (t.SVG[e] = 1), "svg";
    }
    return (
      (t.SVG[e] = 0),
      0 !== t.MathML[e] && 0 === e.indexOf("m")
        ? ((t.MathML[e] = 1), "mathml")
        : ((t.MathML[e] = 0), null)
    );
  }
  if (
    ("undefined" == typeof self || self.Prism) &&
    ("undefined" == typeof global || global.Prism)
  ) {
    if (
      (Prism.languages.css &&
        (Prism.languages.css.selector.pattern
          ? ((Prism.languages.css.selector.inside["pseudo-class"] = /:[\w-]+/),
            (Prism.languages.css.selector.inside["pseudo-element"] =
              /::[\w-]+/))
          : (Prism.languages.css.selector = {
              pattern: Prism.languages.css.selector,
              inside: {
                "pseudo-class": /:[\w-]+/,
                "pseudo-element": /::[\w-]+/,
              },
            })),
      Prism.languages.markup)
    ) {
      Prism.languages.markup.tag.inside.tag.inside["tag-id"] = /[\w-]+/;
      var t = {
        HTML: {
          a: 1,
          abbr: 1,
          acronym: 1,
          b: 1,
          basefont: 1,
          bdo: 1,
          big: 1,
          blink: 1,
          cite: 1,
          code: 1,
          dfn: 1,
          em: 1,
          kbd: 1,
          i: 1,
          rp: 1,
          rt: 1,
          ruby: 1,
          s: 1,
          samp: 1,
          small: 1,
          spacer: 1,
          strike: 1,
          strong: 1,
          sub: 1,
          sup: 1,
          time: 1,
          tt: 1,
          u: 1,
          var: 1,
          wbr: 1,
          noframes: 1,
          summary: 1,
          command: 1,
          dt: 1,
          dd: 1,
          figure: 1,
          figcaption: 1,
          center: 1,
          section: 1,
          nav: 1,
          article: 1,
          aside: 1,
          hgroup: 1,
          header: 1,
          footer: 1,
          address: 1,
          noscript: 1,
          isIndex: 1,
          main: 1,
          mark: 1,
          marquee: 1,
          meter: 1,
          menu: 1,
        },
        SVG: {
          animateColor: 1,
          animateMotion: 1,
          animateTransform: 1,
          glyph: 1,
          feBlend: 1,
          feColorMatrix: 1,
          feComponentTransfer: 1,
          feFuncR: 1,
          feFuncG: 1,
          feFuncB: 1,
          feFuncA: 1,
          feComposite: 1,
          feConvolveMatrix: 1,
          feDiffuseLighting: 1,
          feDisplacementMap: 1,
          feFlood: 1,
          feGaussianBlur: 1,
          feImage: 1,
          feMerge: 1,
          feMergeNode: 1,
          feMorphology: 1,
          feOffset: 1,
          feSpecularLighting: 1,
          feTile: 1,
          feTurbulence: 1,
          feDistantLight: 1,
          fePointLight: 1,
          feSpotLight: 1,
          linearGradient: 1,
          radialGradient: 1,
          altGlyph: 1,
          textPath: 1,
          tref: 1,
          altglyph: 1,
          textpath: 1,
          altglyphdef: 1,
          altglyphitem: 1,
          clipPath: 1,
          "color-profile": 1,
          cursor: 1,
          "font-face": 1,
          "font-face-format": 1,
          "font-face-name": 1,
          "font-face-src": 1,
          "font-face-uri": 1,
          foreignObject: 1,
          glyphRef: 1,
          hkern: 1,
          vkern: 1,
        },
        MathML: {},
      };
    }
    var n;
    Prism.hooks.add("wrap", function (t) {
      if (
        ("tag-id" == t.type ||
          ("property" == t.type && 0 != t.content.indexOf("-")) ||
          ("rule" == t.type && 0 != t.content.indexOf("@-")) ||
          ("pseudo-class" == t.type && 0 != t.content.indexOf(":-")) ||
          ("pseudo-element" == t.type && 0 != t.content.indexOf("::-")) ||
          ("attr-name" == t.type && 0 != t.content.indexOf("data-"))) &&
        -1 === t.content.indexOf("<") &&
        ("css" == t.language || "scss" == t.language || "markup" == t.language)
      ) {
        var a = "https://webplatform.github.io/docs/",
          s = t.content;
        if ("css" == t.language || "scss" == t.language)
          (a += "css/"),
            "property" == t.type
              ? (a += "properties/")
              : "rule" == t.type
              ? ((a += "atrules/"), (s = s.substring(1)))
              : "pseudo-class" == t.type
              ? ((a += "selectors/pseudo-classes/"), (s = s.substring(1)))
              : "pseudo-element" == t.type &&
                ((a += "selectors/pseudo-elements/"), (s = s.substring(2)));
        else if ("markup" == t.language)
          if ("tag-id" == t.type) {
            if (((n = e(t.content) || n), !n)) return;
            a += n + "/elements/";
          } else if ("attr-name" == t.type) {
            if (!n) return;
            a += n + "/attributes/";
          }
        (a += s),
          (t.tag = "a"),
          (t.attributes.href = a),
          (t.attributes.target = "_blank");
      }
    });
  }
})();
