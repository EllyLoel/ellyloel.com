const markdown = require("../plugins/markdown.cjs");

module.exports = (content = "") => markdown.plugin.render(content);
