class PagefindSearch extends HTMLElement {
	static register(tagName) {
		if ("customElements" in window) {
			customElements.define(tagName || "pagefind-search", PagefindSearch);
		}
	}

	constructor() {
		super();
		this.pagefind = null;
		this.onInputTimeout = null;
	}

	clearResults() {
		this.searchResultsCount.innerHTML = "results";
		this.searchResultsList.innerHTML = "";
	}

	addResult(result) {
		const listItem = document.createElement("li");
		const title = document.createElement("h3");
		const link = document.createElement("a");
		const metadata = document.createElement("p");
		const matches = document.createElement("p");

		listItem.className = "[ flow ]";

		link.href = result.url;
		link.textContent = result.meta.title || result.url;

		metadata.className = "[ metadata ]";
		if (result.meta.date) {
			const date = document.createElement("time");
			date.dateTime = result.meta.date;
			date.textContent = new Date(result.meta.date).toLocaleDateString("en-AU", { timeZone: "Australia/Melbourne" });
			metadata.append(date);
		}
		if (result.filters.tags?.length) {
			const tags = document.createElement("span");
			tags.textContent = `Tags: ${result.filters.tags.join(", ")}`;
			if (metadata.hasChildNodes()) {
				metadata.append(" • ");
			}
			metadata.append(tags);
		}

		matches.innerHTML = result.excerpt;

		title.append(link);
		listItem.append(title, metadata, matches);
		this.searchResultsList.append(listItem);
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

			if (value.length > 1) {
				this.searchResults.removeAttribute("hidden");

				let search = await pagefind.search(value);
				let results = await Promise.all(search.results.map((r) => r.data()));

				for (let result of results) {
					this.addResult(result, value);
				}

				if (results.length) {
					this.searchResultsCount.innerHTML = `${results.length} result${
						results.length > 1 ? "s" : ""
					}`;
				} else {
					this.searchResultsList.innerHTML = `<li>No matches found.</li>`;
				}

				this.searchResultsList.classList[results.length > 0 ? "remove" : "add"](
					"search-results-notfound"
				);
			} else {
				this.searchResults.setAttribute("hidden", "");
			}
		}, 100);
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

		let results = document.querySelector(`#search-results`);
		if (results) {
			this.searchResults = results;
		}

		let resultsCount = this.searchResults.querySelector(`h2`);
		if (resultsCount) {
			this.searchResultsCount = resultsCount;
		}

		let resultsList = this.searchResults.querySelector(`ol`);
		if (resultsList) {
			this.searchResultsList = resultsList;
		}
	}
}

PagefindSearch.register();
