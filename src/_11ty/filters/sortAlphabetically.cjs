module.exports = (pages) =>
	[...pages].sort(function (a, b) {
		if (a.data.title < b.data.title) return -1;
		if (a.data.title > b.data.title) return 1;
		return 0;
	});
