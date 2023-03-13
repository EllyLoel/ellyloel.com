const { DateTime } = require("luxon");

module.exports = (date) =>
	DateTime.fromJSDate(date, { zone: "utc" }).toLocaleString(DateTime.DATE_FULL);
