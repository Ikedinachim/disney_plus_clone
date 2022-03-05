!(function () {
  ("undefined" != typeof self && !self.Prism) ||
    ("undefined" != typeof global && !global.Prism) ||
    Prism.hooks.add("before-highlight", function (e) {
      var f = e.grammar;
      f &&
        ((f.tab = /\t/g),
        (f.crlf = /\r\n/g),
        (f.lf = /\n/g),
        (f.cr = /\r/g),
        (f.space = / /g));
    });
})();
