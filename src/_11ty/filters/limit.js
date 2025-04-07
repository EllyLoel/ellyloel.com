export default (array, n) => {
	if (!Array.isArray(array) || array.length === 0) {
		return [];
	}
	if (n < 0) {
		return array.slice(n);
	}

	return array.slice(0, n);
};
