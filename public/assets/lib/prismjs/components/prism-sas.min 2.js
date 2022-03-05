Prism.languages.sas = {
  datalines: {
    pattern: /^\s*(?:(?:data)?lines|cards);[\s\S]+?(?:\r?\n|\r);/im,
    alias: "string",
    inside: {
      keyword: { pattern: /^(\s*)(?:(?:data)?lines|cards)/i, lookbehind: !0 },
      punctuation: /;/,
    },
  },
  comment: [
    { pattern: /(^\s*|;\s*)\*.*;/m, lookbehind: !0 },
    /\/\*[\s\S]+?\*\//,
  ],
  datetime: { pattern: /'[^']+'(?:dt?|t)\b/i, alias: "number" },
  string: { pattern: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/, greedy: !0 },
  keyword: /\b(?:data|else|format|if|input|proc\s\w+|quit|run|then)\b/i,
  number: /\b(?:[\da-f]+x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i,
  operator:
    /\*\*?|\|\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\/=&]|[~¬^]=?|\b(?:eq|ne|gt|lt|ge|le|in|not)\b/i,
  punctuation: /[$%@.(){}\[\];,\\]/,
};
