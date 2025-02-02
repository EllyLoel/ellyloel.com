export default (stringOrArray, searchElement) => {
	if (stringOrArray) {
		return stringOrArray.includes(searchElement);
	}
	return false;
};
