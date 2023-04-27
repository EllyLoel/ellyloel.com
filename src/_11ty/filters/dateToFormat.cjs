const { DateTime } = require("luxon");

module.exports = (date, format) =>
	DateTime.fromJSDate(date, { zone: "Australia/Melbourne" }).toFormat(String(format));
