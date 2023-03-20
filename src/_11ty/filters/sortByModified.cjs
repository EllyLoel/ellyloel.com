module.exports = (posts) =>
	[...posts].sort(function (a, b) {
		if (a.data.modified > b.data.modified) return -1;
		if (a.data.modified < b.data.modified) return 1;
		return 0;
	});
