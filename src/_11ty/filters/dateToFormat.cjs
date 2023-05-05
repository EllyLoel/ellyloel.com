const { DateTime } = require("luxon");

module.exports = (date, format) =>
	DateTime.fromJSDate(new Date(date), { zone: "Australia/Melbourne" }).toFormat(
		String(format)
	);
