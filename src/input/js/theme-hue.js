const themeHueInput = document.querySelector("#theme-hue");
const defaultThemeHue = Number.parseInt(
	getComputedStyle(document.documentElement).getPropertyValue("--hue"),
	10
);

const applyThemeHue = (themeHue) => {
	document.documentElement.setAttribute("data-selected-theme-hue", themeHue);
	document.documentElement.style.setProperty("--hue", `${themeHue}deg`);
	themeHueInput.value = themeHue;
};

const handleThemeHueSelection = (event) => {
	const target = event.target;
	const themeHue = target.value;

	applyThemeHue(themeHue);
	localStorage.setItem("selected-theme-hue", themeHue);
};

const setInitialThemeHue = () => {
	const savedThemeHue = localStorage.getItem("selected-theme-hue");
	if (savedThemeHue) {
		applyThemeHue(savedThemeHue);
	} else {
		applyThemeHue(defaultThemeHue);
	}
};

setInitialThemeHue();

themeHueInput.addEventListener("valuechange", handleThemeHueSelection);
