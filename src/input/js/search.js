class PagefindSearch extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "pagefind-search", PagefindSearch);
		}
	}

	static MIN_SEARCH_LENGTH = 2;
	static SEARCH_DEBOUNCE_MS = 100;

	constructor() {
		super();
		this.pagefind = null;
		this.onInputTimeout = null;
	}

	clearResults() {
		this.searchResults.innerHTML = "";
	}

	addResult(result) {
		const article = document.createElement("article");
		const title = document.createElement("h3");
		const link = document.createElement("a");
		const metadata = document.createElement("p");
		const matches = document.createElement("p");

		article.className = "[ flow ]";

		link.href = result.url;
		link.textContent = result.meta.title || result.url;

		metadata.className = "[ metadata ]";
		if (result.meta.date) {
			const date = document.createElement("time");
			date.dateTime = result.meta.date;
			date.textContent = new Date(result.meta.date).toLocaleDateString("en-AU", {
				dateStyle: "long",
				timeZone: "Australia/Melbourne",
			});
			metadata.append(date);
		}
		if (result.filters.tags?.length) {
			const tags = document.createElement("span");
			tags.textContent = result.filters.tags.join(", ");
			if (metadata.hasChildNodes()) {
				const divider = document.createElement("span");
				divider.setAttribute("aria-hidden", "true");
				divider.textContent = " • ";
				metadata.append(divider);
			}
			metadata.append(tags);
		}

		matches.innerHTML = result.excerpt;

		title.append(link);
		article.append(title, metadata, matches);
		this.searchResults.append(article);
	}

	async getLibrary() {
		if (!this.pagefind) {
			this.pagefind = await import("/pagefind/pagefind.js");
		}
		return this.pagefind;
	}

	async onInput(value) {
		let pagefind = await this.getLibrary();
		window.clearTimeout(this.onInputTimeout);
		this.onInputTimeout = window.setTimeout(async () => {
			this.clearResults();

			this.searchResults.toggleAttribute("hidden", value.length < PagefindSearch.MIN_SEARCH_LENGTH);

			let results = [];
			if (value.length >= PagefindSearch.MIN_SEARCH_LENGTH) {
				const search = await pagefind.search(value);
				results = await Promise.all(search.results.map((r) => r.data()));
			}

			this.searchResultsHeading.innerHTML = value.length >= PagefindSearch.MIN_SEARCH_LENGTH
				? `${results.length || "No"} result${results.length !== 1 ? "s" : ""} found for <q>${value}</q>`
				: ``;

			for (const result of results) {
				this.addResult(result, value);
			}
		}, PagefindSearch.SEARCH_DEBOUNCE_MS);
	}

	getQueryString() {
		let url = new URL(document.location.href);
		let searchQueryParam = url.searchParams.get("q");
		return searchQueryParam ? decodeURIComponent(searchQueryParam) : "";
	}

	connectedCallback() {
		let form = this.querySelector(`form[role="search"]`);
		if (form) {
			form.addEventListener("submit", (event) => event.preventDefault());
		}

		let text = this.querySelector(`input[type="text"]`);
		if (text) {
			text.addEventListener("input", async (event) => {
				let value = event.target.value;
				await this.onInput(value);
				window.history.replaceState(
					{}, "", `/search/${value ? `?q=${encodeURIComponent(value)}` : ""}`
				);
			});

			let queryString = this.getQueryString();
			if (queryString) {
				text.value = queryString;
				this.onInput(queryString);
			} else {
				text.value = "";
			}
		}

		let results = document.querySelector("#search-results");
		if (results) {
			this.searchResults = results;
		}

		let resultsHeading = document.querySelector(`h2[aria-live="polite"]`);
		if (resultsHeading) {
			this.searchResultsHeading = resultsHeading;
		}
	}
}

PagefindSearch.register();
