const form = document.querySelector("form");
const filterButtons = form.querySelectorAll("button[data-filter-name]");
const moreTags = form.querySelector("#show-more-tags + span");
const showMoreTagsButton = form.querySelector("#show-more-tags");
const showLessTagsButton = form.querySelector("#show-less-tags");
const feed = document.getElementById("feed");

// Store active filters
const activeFilters = {
	stage: new Set(),
	tags: new Set(),
	type: new Set(),
};

// Handle browser navigation
window.addEventListener("popstate", () => {
	loadFiltersFromURL();
});

const updateURL = () => {
	const url = new URL(window.location);

	// Clear all existing filter params first
	url.searchParams.delete("stage");
	url.searchParams.delete("type");
	url.searchParams.delete("tags");

	// Only add parameters for categories that have active filters
	for (const [category, filters] of Object.entries(activeFilters)) {
		const activeFilters = Array.from(filters);
		if (activeFilters.length > 0) {
			url.searchParams.set(category, activeFilters.join(","));
		}
	}

	// Update URL without reloading the page
	window.history.pushState({}, "", url);
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
			const filters = value.split(",");
			for (const filter of filters) {
				activeFilters[category].add(filter);

				// Find and update corresponding button
				const button = Array.from(filterButtons).find(
					(btn) =>
						btn.getAttribute("data-filter-name") === category &&
						btn.textContent.trim() === filter
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
	const filterName = button.getAttribute("data-filter-name");
	const filterValue = button.textContent.trim();

	button.setAttribute("aria-pressed", !isPressed);

	if (!isPressed) {
		activeFilters[filterName].add(filterValue);
	} else {
		activeFilters[filterName].delete(filterValue);
	}

	applyFilters();
	updateURL();
};

const applyFilters = () => {
	const posts = feed.querySelectorAll("li");

	// Get all active filters across all categories
	const allActiveFilters = Object.values(activeFilters)
		.flatMap((set) => Array.from(set))
		.map((filter) => filter.toLowerCase());

	// If no filters are active, show all posts
	if (allActiveFilters.length === 0) {
		for (const post of posts) {
			post.removeAttribute("hidden");
		}
		return;
	}

	// Otherwise, apply filtering
	for (const post of posts) {
		const postTags = Array.from(post.querySelectorAll(".badge")).map((badge) =>
			badge.textContent.trim().toLowerCase()
		);

		// Show post if it matches any active filter
		const shouldShow = allActiveFilters.some((filter) =>
			postTags.includes(filter)
		);

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
