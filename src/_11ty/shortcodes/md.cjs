const markdown = require("../plugins/markdown.cjs");

module.exports = (content = "") => markdown.library.render(content);
