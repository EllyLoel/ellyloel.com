const textTransformButton = document.querySelector("#text-transform-button");

// Text transform initialisation is also in init-settings.njk
const isTextTransformEnabled = localStorage.getItem("textTransformEnabled") !== "false";
textTransformButton.setAttribute("aria-pressed", isTextTransformEnabled.toString());
isTextTransformEnabled
	? (document.documentElement.style.textTransform = "lowercase")
	: (document.documentElement.style.textTransform = null);

textTransformButton.addEventListener("click", () => {
	const isPressed = textTransformButton.getAttribute("aria-pressed") === "true";
	const newState = !isPressed;
	
	textTransformButton.setAttribute("aria-pressed", newState.toString());
	document.documentElement.style.textTransform = newState ? "lowercase" : "none";
	localStorage.setItem("textTransformEnabled", newState.toString());
});
