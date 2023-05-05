/* eslint-disable sort-keys */

// This code is mostly borrowed (and simplified) from:
// - https://github.com/shoelace-style/localize/blob/main/src/index.ts
// - https://github.com/shoelace-style/shoelace/blob/next/src/components/relative-time/relative-time.ts

const availableUnits = [
	{ max: 2760000, value: 60000, unit: "minute" }, // max 46 minutes
	{ max: 72000000, value: 3600000, unit: "hour" }, // max 20 hours
	{ max: 518400000, value: 86400000, unit: "day" }, // max 6 days
	{ max: 2419200000, value: 604800000, unit: "week" }, // max 28 days
	{ max: 28512000000, value: 2592000000, unit: "month" }, // max 11 months
	{ max: Infinity, value: 31536000000, unit: "year" },
];

module.exports = (date) => {
	const now = new Date();
	const then = new Date(date);

	// Check for an invalid date
	if (isNaN(then.getMilliseconds())) return "";

	const diff = then.getTime() - now.getTime();
	const { unit, value } = availableUnits.find(
		(singleUnit) => Math.abs(diff) < singleUnit.max
	);

	return new Intl.RelativeTimeFormat("en-AU", {
		numeric: "auto",
		style: "long",
	}).format(Math.round(diff / value), unit);
};
