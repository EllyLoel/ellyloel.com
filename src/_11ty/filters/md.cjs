const markdownIt = require("markdown-it");

module.exports = (content = "") => markdownIt({ html: true }).render(content);
