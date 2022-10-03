import { Howl, Howler } from "howler";

let soundEnabled = true;

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

soundButton.addEventListener("click", (e) => {
  if (soundEnabled) {
    soundEnabled = false;
    disableSound.play();
    soundButton.setAttribute("name", "fas-volume-xmark");
    soundButton.setAttribute("label", "Enable sounds");
    soundButtonTooltip.setAttribute("content", "Enable sounds");
  } else {
    soundEnabled = true;
    enableSound.play();
    soundButton.setAttribute("name", "fas-volume-high");
    soundButton.setAttribute("label", "Disable sounds");
    soundButtonTooltip.setAttribute("content", "Disable sounds");
  }
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

const popOpen = new Howl({
  src: ["/assets/sounds/pop-open.mp3"],
});
const popClose = new Howl({
  src: ["/assets/sounds/pop-close.mp3"],
});
const bite = new Howl({
  src: ["/assets/sounds/bite.mp3"],
});

const themeSwitcherButton = document.querySelector(
  "sl-icon-button#theme-switcher-open-button"
);
const themeSwitcher = document.querySelector("sl-drawer.theme-switcher");
const themeSwitcherRadioButtons = document.querySelectorAll(
  "sl-drawer sl-radio-button"
);

themeSwitcherButton.addEventListener("click", () => {
  if (soundEnabled) popOpen.play();
});

themeSwitcher.addEventListener("sl-hide", () => {
  if (soundEnabled) popClose.play();
});

themeSwitcherRadioButtons.forEach((themeSwitcherRadioButton) => {
  themeSwitcherRadioButton.addEventListener("click", () => {
    if (soundEnabled) bite.play();
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
