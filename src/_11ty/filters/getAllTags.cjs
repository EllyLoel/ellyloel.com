module.exports = (collection) => {
	let tagSet = new Set();
	for (let item of collection) {
		(item.data.tags || []).forEach((tag) => tagSet.add(tag));
	}
	return Array.from(tagSet);
};
