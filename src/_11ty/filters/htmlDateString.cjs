const { DateTime } = require("luxon");

module.exports = (dateObj) => {
	// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	return DateTime.fromJSDate(dateObj, { zone: "Australia/Melbourne" }).toFormat("yyyy-LL-dd");
};
