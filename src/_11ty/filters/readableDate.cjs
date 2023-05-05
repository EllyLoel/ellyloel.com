const { DateTime } = require("luxon");

module.exports = (date, format, zone) => {
	// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
	return DateTime.fromJSDate(new Date(date), {
		zone: zone || "Australia/Melbourne",
	}).toFormat(format || "dd LLLL yyyy");
};
