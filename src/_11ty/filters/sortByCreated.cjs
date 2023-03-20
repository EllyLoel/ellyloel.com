module.exports = (posts) =>
	[...posts].sort(function (a, b) {
		if (a.data.created > b.data.created) return -1;
		if (a.data.created < b.data.created) return 1;
		return 0;
	});
