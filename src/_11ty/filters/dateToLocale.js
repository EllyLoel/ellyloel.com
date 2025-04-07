export default (date, options) => {
	const dateObj = new Date(date);

	// Check for invalid date
	if (isNaN(dateObj.getTime())) return "";

	const formatter = new Intl.DateTimeFormat("en-AU", {
		dateStyle: options?.dateStyle || "long",
		timeStyle: options?.timeStyle || undefined,
		timeZone: options?.timeZone || "Australia/Melbourne",
	});
	return formatter.format(dateObj);
};
