module.exports = (tags) =>
	(tags || []).filter(
		(tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
	);
