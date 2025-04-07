import path from "node:path";

const filters = ({ mentionTypes }) => {
	function filterWebmentions(webmentions, page) {
		const pageUrl = new URL(page, "https://ellyloel.com");
		const normalizedPagePath = path.normalize(`${pageUrl.pathname}/`).toLowerCase();

		return webmentions
			.filter((mention) => {
				const target = new URL(mention["wm-target"]);
				const normalisedTargetPath = path.normalize(`${target.pathname}/`).toLowerCase();
				return path.basename(normalizedPagePath) === path.basename(normalisedTargetPath);
			});
	}

	function count(webmentions, pageUrl) {
		const page =
			pageUrl ||
			this.page?.url ||
			this.ctx?.page?.url ||
			this.context?.environments?.page?.url;

		return filterWebmentions(webmentions, page).length;
	}

	function mentions(webmentions, pageUrl) {
		const page =
			pageUrl ||
			this.page?.url ||
			this.ctx?.page?.url ||
			this.context?.environments?.page?.url;

		const filteredWebmentions = filterWebmentions(webmentions, page);

		const returnedWebmentions = {
			total: filteredWebmentions.length,
		};

		Object.keys(mentionTypes).map((type) => {
			returnedWebmentions[type] = filteredWebmentions.filter((mention) =>
				mentionTypes[type].includes(mention["wm-property"])
			);
		});

		return returnedWebmentions;
	}

	return {
		count,
		mentions,
	};
};

export default filters;
