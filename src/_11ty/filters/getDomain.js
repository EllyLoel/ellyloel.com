export default (url, base) => {
	return new URL(url, base).hostname;
};
