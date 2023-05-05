const { DateTime } = require("luxon");

module.exports = (date) => {
	// date input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	return DateTime.fromJSDate(new Date(date), {
		zone: "Australia/Melbourne",
	}).toFormat("yyyy-LL-dd");
};
