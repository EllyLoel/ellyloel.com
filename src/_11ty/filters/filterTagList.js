export default (tags) =>
	(tags || []).filter(
		(tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
	);
