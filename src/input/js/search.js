class Search {
	clearResults() {
		this.searchResultsCount.innerHTML = "Results";
		this.searchResultsList.innerHTML = "";
	}

	addResult(result) {
		const listItem = document.createElement("li");
		const link = document.createElement("a");
		const title = document.createElement("strong");
		const matches = document.createElement("code");

		link.href = result.url;
		link.className = "search-results-item";

		title.className = "search-results-item-title";
		title.textContent = result.meta.title || result.url;

		matches.className = "search-results-item-matches truncate-multiple-lines";
		matches.innerHTML =
			"&mldr;" +
			result.excerpt
				.replace(/</g, "&lt;")
				.replace(/&lt;mark>/g, "<mark>")
				.replace(/&lt;\/mark>/g, "</mark>");

		link.append(title, matches);
		listItem.append(link);
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
					this.searchResultsCount.innerHTML = `${results.length} Result${
						results.length > 1 ? "s" : ""
					}`;
				} else {
					this.searchResultsList.innerHTML = `<li>No Matches Found.</li>`;
				}
				this.searchResultsList.classList[results.length > 0 ? "remove" : "add"](
					"search-results-notfound"
				);
			} else {
				this.searchResults.setAttribute("hidden");
			}
		}, 100);
	}

	getQueryString() {
		let url = new URL(document.location.href);
		let searchQueryParam = url.searchParams.get("q");
		return searchQueryParam ? decodeURIComponent(searchQueryParam) : "";
	}

	hydrate() {
		let form = document.getElementById("search");
		if (form) {
			form.addEventListener(
				"submit",
				function (event) {
					event.preventDefault();
				},
				false
			);
		}

		let text = document.getElementById("search-term");
		if (text) {
			text.addEventListener(
				"input",
				async (event) => {
					let value = event.target.value;
					await this.onInput(value);
					window.history.replaceState(
						{},
						"",
						`/search/${value ? `?q=${encodeURIComponent(value)}` : ""}`
					);
				},
				false
			);

			let queryString = this.getQueryString();
			if (queryString) {
				text.value = queryString;
				this.onInput(queryString);
			} else {
				text.value = "";
			}
		}

		let results = document.getElementById("search-results");
		if (results) {
			this.searchResults = results;
		}

		let resultsList = document.getElementById("search-results-list");
		if (resultsList) {
			this.searchResultsList = resultsList;
		}

		let resultsCount = document.getElementById("search-results-count");
		if (resultsCount) {
			this.searchResultsCount = resultsCount;
		}
	}
}

let search = new Search();
search.hydrate();
