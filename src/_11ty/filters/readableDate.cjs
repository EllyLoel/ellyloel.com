const { DateTime } = require("luxon");

module.exports = (dateObj, format, zone) => {
	// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
	return DateTime.fromJSDate(dateObj, { zone: zone || "Australia/Melbourne" }).toFormat(
		format || "dd LLLL yyyy"
	);
};
