const form = document.querySelector("form.garden-filters");
const filterButtons = form.querySelectorAll("button[data-filter-name]");
const showMoreTagsButton = form.querySelector("#show-more-tags");
const showLessTagsButton = form.querySelector("#show-less-tags");
const feed = document.getElementById("feed");

// Store active filters
const activeFilters = {
	stages: new Set(),
	tags: new Set(),
	types: new Set(),
};

// Handle browser navigation
window.addEventListener("popstate", () => {
	loadFiltersFromURL();
});

const updateURL = () => {
	const url = new URL(window.location);

	// Clear all existing filter params first
	url.searchParams.delete("stages");
	url.searchParams.delete("types");
	url.searchParams.delete("tags");

	// Only add parameters for categories that have active filters
	for (const [category, filters] of Object.entries(activeFilters)) {
		const activeFilters = Array.from(filters).sort();
		if (activeFilters.length > 0) {
			url.searchParams.set(category, activeFilters.join(","));
		}
	}

	// Sort search parameters for consistent caching and replace percent encoded commas with commas
	const newUrl = new URL(url);
	url.searchParams.sort();
	newUrl.search = url.search.replace(/%2C/gi, ",");

	// Update URL without reloading the page
	window.history.pushState({}, "", newUrl);
};

const loadFiltersFromURL = () => {
	const url = new URL(window.location);

	// Reset all filters and buttons
	for (const category of Object.keys(activeFilters)) {
		activeFilters[category].clear();
	}
	for (const button of filterButtons) {
		button.setAttribute("aria-pressed", "false");
	}

	// Load filters from URL params
	for (const [category, value] of url.searchParams.entries()) {
		if (value && category in activeFilters) {
			const filters = value.toLowerCase().split(",");
			for (const filter of filters) {
				activeFilters[category].add(filter);

				// Find and update corresponding button
				const button = Array.from(filterButtons).find(
					(btn) =>
						btn.getAttribute("data-filter-name") === category &&
						btn.textContent.trim().toLowerCase() === filter
				);
				if (button) {
					button.setAttribute("aria-pressed", "true");
				}
			}
		}
	}

	// Apply loaded filters
	applyFilters();
};

const toggleFilter = (button) => {
	const isPressed = button.getAttribute("aria-pressed") === "true";
	const category = button.getAttribute("data-filter-name");
	const filter = button.textContent.trim().toLowerCase();

	button.setAttribute("aria-pressed", !isPressed);

	if (!isPressed) {
		activeFilters[category].add(filter);
	} else {
		activeFilters[category].delete(filter);
	}

	applyFilters();
	updateURL();
};

const applyFilters = () => {
	const posts = feed.querySelectorAll("li");

	// If no filters are active, show all posts
	const hasActiveFilters = Object.values(activeFilters).some(set => set.size > 0);
	if (!hasActiveFilters) {
		for (const post of posts) {
			post.removeAttribute("hidden");
		}
		return;
	}

	// Apply filtering
	for (const post of posts) {
		const postTags = Array.from(post.querySelectorAll(".badge")).map((badge) =>
			badge.textContent.trim().toLowerCase()
		);

		// Check each category separately
		const categoryMatches = Object.entries(activeFilters).map(([category, filters]) => {
			// If no filters in this category, consider it a match
			if (filters.size === 0) return true;
			
			// Check if any filter in this category matches (OR within category)
			return Array.from(filters).some(filter => postTags.includes(filter));
		});

		// Post should show only if ALL categories with active filters match (AND across categories)
		const shouldShow = categoryMatches.every(matches => matches);

		if (shouldShow) {
			post.removeAttribute("hidden");
		} else {
			post.setAttribute("hidden", "until-found");
		}
	}
};

// Initialize form visibility and load filters from URL
form.previousElementSibling.removeAttribute("hidden");
form.removeAttribute("hidden");
loadFiltersFromURL();

// Set up filter button click handlers
for (const filterButton of filterButtons) {
	if (filterButton.hasAttribute("data-filter-name")) {
		filterButton.addEventListener("click", () => toggleFilter(filterButton));
	}
}

// Set up show more tags button click handlers
showMoreTagsButton.addEventListener("click", (event) => {
	// Hide the show more tags button
	event.target.setAttribute("hidden", "");
	// Show the more tags span
	event.target.nextElementSibling.removeAttribute("hidden");
	// Focus the first tag button
	event.target.nextElementSibling.querySelector("button:first-of-type").focus();
	// Show the show less tags button
	event.target.nextElementSibling.nextElementSibling.removeAttribute("hidden");
});

// Set up show less tags button click handlers
showLessTagsButton.addEventListener("click", (event) => {
	// Hide the show less tags button
	event.target.setAttribute("hidden", "");
	// Hide the more tags span
	event.target.previousElementSibling.setAttribute("hidden", "");
	// Show the show more tags button
	event.target.previousElementSibling.previousElementSibling.removeAttribute("hidden");
	// Focus the show more tags button
	event.target.previousElementSibling.previousElementSibling.focus();
});
