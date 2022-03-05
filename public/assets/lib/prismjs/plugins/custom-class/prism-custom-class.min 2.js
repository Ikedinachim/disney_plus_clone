!(function () {
  if (
    ("undefined" != typeof self && self.Prism) ||
    ("undefined" != typeof global && global.Prism)
  ) {
    var s = { classMap: {} };
    (Prism.plugins.customClass = {
      map: function (i) {
        s.classMap = i;
      },
      prefix: function (i) {
        s.prefixString = i;
      },
    }),
      Prism.hooks.add("wrap", function (i) {
        (s.classMap || s.prefixString) &&
          (i.classes = i.classes.map(function (i) {
            return (s.prefixString || "") + (s.classMap[i] || i);
          }));
      });
  }
})();
