const defaultColorScheme = "auto";

const createThemeColorMetaTag = (color) => {
	const themeColorMetaTag = document.createElement("meta");
	themeColorMetaTag.setAttribute("name", "theme-color");
	themeColorMetaTag.setAttribute("content", color);
	return themeColorMetaTag;
};

const removeAnyThemeColorMetaTags = () => {
	const themeColorMetaTags = document.querySelectorAll(
		'meta[name="theme-color"]'
	);

	for (const themeColorMetaTag of themeColorMetaTags) {
		themeColorMetaTag.remove();
	}
};

const applyColorScheme = (colorScheme) => {
	const previouslyPressedButton = document.querySelector(
		'button[data-color-scheme][aria-pressed="true"]'
	);
	const nextPressedButton = document.querySelector(
		`button[data-color-scheme="${colorScheme}"]`
	);

	document.documentElement.setAttribute(
		"data-selected-color-scheme",
		colorScheme
	);

	removeAnyThemeColorMetaTags();
	if (colorScheme === "light") {
		const themeColorMetaTag = createThemeColorMetaTag("#f9f9f9");
		document.head.appendChild(themeColorMetaTag);
	}
	if (colorScheme === "dark") {
		const themeColorMetaTag = createThemeColorMetaTag("#111111");
		document.head.appendChild(themeColorMetaTag);
	}
	if (colorScheme === "auto") {
		const lightThemeColorMetaTag = createThemeColorMetaTag("#f9f9f9");
		const darkThemeColorMetaTag = createThemeColorMetaTag("#111111");

		lightThemeColorMetaTag.setAttribute(
			"media",
			"(prefers-color-scheme: light)"
		);
		darkThemeColorMetaTag.setAttribute("media", "(prefers-color-scheme: dark)");

		document.head.appendChild(lightThemeColorMetaTag);
		document.head.appendChild(darkThemeColorMetaTag);
	}

	if (
		previouslyPressedButton &&
		previouslyPressedButton.getAttribute("data-color-scheme") !== colorScheme
	) {
		previouslyPressedButton.setAttribute("aria-pressed", "false");
	}

	if (
		nextPressedButton &&
		nextPressedButton.getAttribute("aria-pressed") !== "true"
	)
		nextPressedButton.setAttribute("aria-pressed", "true");
};

const handleColorSchemeSelection = (event) => {
	// If the current button is not already pressed
	if (event.target.getAttribute("aria-pressed") !== "true") {
		const colorScheme = event.target.getAttribute("data-color-scheme");

		applyColorScheme(colorScheme);
		localStorage.setItem("selected-color-scheme", colorScheme);
	}
};

const setInitialColorScheme = () => {
	const savedColorScheme = localStorage.getItem("selected-color-scheme");
	if (savedColorScheme) {
		applyColorScheme(savedColorScheme);
	} else {
		applyColorScheme(defaultColorScheme);
	}
};

setInitialColorScheme();

const colorSchemeSwitcher = document.querySelector(".color-scheme-switcher");
const buttons = colorSchemeSwitcher.querySelectorAll("button");

buttons.forEach((button) => {
	button.addEventListener("click", handleColorSchemeSelection);
});
