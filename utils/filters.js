const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

module.exports = {
  dateToFormat: function (date, format) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format));
  },

  dateToISO: function (date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  },

  md: function (content = "") {
    return markdownIt({ html: true }).render(content);
  },

  sliceCollection: function (collection, count) {
    return collection.slice(0, count || 5);
  },
};
