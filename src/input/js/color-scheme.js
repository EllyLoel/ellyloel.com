const pressedButtonSelector = '[data-color-scheme][aria-pressed="true"]';
const defaultColorScheme = "auto";

const applyColorScheme = (colorScheme) => {
	const target = document.querySelector(`[data-color-scheme="${colorScheme}"]`);
	document.documentElement.setAttribute(
		"data-selected-color-scheme",
		colorScheme
	);
	document
		.querySelector(pressedButtonSelector)
		.setAttribute("aria-pressed", "false");
	target.setAttribute("aria-pressed", "true");
};

const handleColorSchemeSelection = (event) => {
	const target = event.target;
	const isPressed = target.getAttribute("aria-pressed");
	const colorScheme = target.getAttribute("data-color-scheme");

	if (isPressed !== "true") {
		applyColorScheme(colorScheme);
		localStorage.setItem("selected-color-scheme", colorScheme);
	}
};

const setInitialColorScheme = () => {
	const savedColorScheme = localStorage.getItem("selected-color-scheme");
	if (savedColorScheme && savedColorScheme !== defaultColorScheme) {
		applyColorScheme(savedColorScheme);
	}
};

setInitialColorScheme();

const colorSchemeSwitcher = document.querySelector(".color-scheme-switcher");
const buttons = colorSchemeSwitcher.querySelectorAll("button");

buttons.forEach((button) => {
	button.addEventListener("click", handleColorSchemeSelection);
});
