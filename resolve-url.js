const slugify = require('slugify');
module.exports = (title) => {
  const lower = title.toLowerCase();
  return `/notes/${slugify(lower)}`;
};
