export default {
	canonical: (data) => new URL(data.page.url, data.metadata.url).href,
};
