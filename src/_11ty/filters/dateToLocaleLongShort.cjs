const { DateTime } = require("luxon");

module.exports = (date) =>
	DateTime.fromJSDate(new Date(date), {
		zone: "Australia/Melbourne",
	}).toLocaleString({ dateStyle: "long", timeStyle: "short" });
