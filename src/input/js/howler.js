import "howler/dist/howler.core.min.js";

let soundEnabled = localStorage.getItem("sound-enabled") ?? true;

Howler.volume(0.25);

const enableSound = new Howl({
	src: ["/assets/sounds/enable-sound.mp3"],
});
const disableSound = new Howl({
	src: ["/assets/sounds/disable-sound.mp3"],
});

const soundButton = document.getElementById("sound-button");
const soundButtonTooltip = document.querySelector(
	'sl-tooltip[content="Disable sounds"]'
);

const toggleSound = (event) => {
	if (soundEnabled) {
		soundEnabled = false;
		if (event) disableSound.play();
		localStorage.setItem("sound-enabled", soundEnabled);
		soundButton.setAttribute("name", "fas-volume-xmark");
		soundButton.setAttribute("label", "Enable sounds");
		soundButtonTooltip.setAttribute("content", "Enable sounds");
	} else {
		soundEnabled = true;
		if (event) enableSound.play();
		localStorage.setItem("sound-enabled", soundEnabled);
		soundButton.setAttribute("name", "fas-volume-high");
		soundButton.setAttribute("label", "Disable sounds");
		soundButtonTooltip.setAttribute("content", "Disable sounds");
	}
};

toggleSound();

soundButton.addEventListener("click", toggleSound);

////////////

const popOpen = new Howl({
	src: ["/assets/sounds/pop-open.mp3"],
});
const popClose = new Howl({
	src: ["/assets/sounds/pop-close.mp3"],
});
const bite = new Howl({
	src: ["/assets/sounds/bite.mp3"],
});

if (soundEnabled) bite.play();

document.querySelectorAll("dialog").forEach((dialog) => {
	dialog.addEventListener("opening", () => {
		if (soundEnabled) popOpen.play();
	});
	dialog.addEventListener("closing", () => {
		if (soundEnabled) popClose.play();
	});
});

const colorSchemeSwitcher = document.querySelector(".color-scheme-switcher");
const buttons = colorSchemeSwitcher.querySelectorAll("button");

buttons.forEach((button) => {
	button.addEventListener("click", () => {
		const isPressed = button.getAttribute("aria-pressed");
		if (soundEnabled && isPressed !== "true") bite.play();
	});
});

////////////

const pop = new Howl({
	src: ["/assets/sounds/pop.mp3"],
});

const stroked = document.querySelectorAll("span.stroke");

stroked.forEach((element) => {
	element.addEventListener("click", () => {
		if (soundEnabled) pop.play();
	});
});

////////////

const fanfare = new Howl({
	src: ["/assets/sounds/fanfare.mp3"],
});

const newsletterForm = document.querySelector("form.newsletter");

newsletterForm.addEventListener("submit", (e) => {
	if (soundEnabled) {
		e.preventDefault();
		fanfare.play();
		setTimeout(() => {
			newsletterForm.submit();
		}, 2000);
	}
});
