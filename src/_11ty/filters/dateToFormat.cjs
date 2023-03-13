const { DateTime } = require("luxon");

module.exports = (date, format) =>
	DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format));
