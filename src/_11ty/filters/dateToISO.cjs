module.exports = (date) => {
	const dateObj = new Date(date);

	// Check for invalid date
	if (isNaN(dateObj.getTime())) return "";

	// Add Melbourne's UTC offset (during both standard and daylight saving time)
	const melbourneOffset = dateObj.toLocaleString("en-AU", { hour12: false, timeZone: "Australia/Melbourne" }).split(", ")[1].split(":")[0] - dateObj.getUTCHours();
	const melbourneDate = new Date(dateObj.getTime() + (melbourneOffset * 60 * 60 * 1000));
	
	return melbourneDate.toISOString().split("T")[0];
};
