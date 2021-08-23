const slugify = require('slugify');
module.exports = title => `/notes/${slugify(title)}`;
