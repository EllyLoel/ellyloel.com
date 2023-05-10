module.exports = (stringOrArray, searchElement) => {
	if (stringOrArray) {
		return stringOrArray.includes(searchElement);
	}
	return false;
};
