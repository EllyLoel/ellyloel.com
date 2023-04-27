const { DateTime } = require("luxon");

module.exports = (date) =>
	DateTime.fromJSDate(date, { zone: "Australia/Melbourne" }).toLocaleString(DateTime.DATE_FULL);
