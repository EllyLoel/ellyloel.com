export default (date) => {
	const now = new Date();
	const then = new Date(date);

	// Check for invalid date
	if (isNaN(then.getTime())) return "";

	const diff = then.getTime() - now.getTime();
	const formatter = new Intl.RelativeTimeFormat("en-AU", {
		numeric: "auto",
		style: "long"
	});

	// Convert milliseconds to appropriate unit
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (Math.abs(years) > 0) return formatter.format(years, "year");
	if (Math.abs(months) > 0) return formatter.format(months, "month");
	if (Math.abs(weeks) > 0) return formatter.format(weeks, "week");
	if (Math.abs(days) > 0) return formatter.format(days, "day");
	if (Math.abs(hours) > 0) return formatter.format(hours, "hour");
	if (Math.abs(minutes) > 0) return formatter.format(minutes, "minute");
	return formatter.format(seconds, "second");
};
