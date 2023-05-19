import GuiDialog from "./dialog.js";

// new events
const dialogClosing = ({ target: dialog }) => {};

const dialogClosed = ({ target: dialog }) => {};

const dialogOpened = ({ target: dialog }) => {};

const dialogOpening = ({ target: dialog }) => {};

// SETUP
document.querySelectorAll("dialog").forEach((dialog) => {
	// sugar up <dialog> elements
	GuiDialog(dialog);

	// new/optional <dialog> events to choose from
	dialog.addEventListener("closing", dialogClosing);
	dialog.addEventListener("closed", dialogClosed);
	dialog.addEventListener("opening", dialogOpening);
	dialog.addEventListener("opened", dialogOpened);
});

const colorSchemeSwitcherDialogOpenButton = document.querySelector(
	"#color-scheme-switcher-dialog-open-button"
);
const colorSchemeSwitcherDialogCloseButton = document.querySelector(
	'[data-action="close"]'
);
const colorSchemeSwitcherDialog = document.querySelector(
	".color-scheme-switcher-dialog"
);

colorSchemeSwitcherDialogOpenButton.addEventListener("click", (event) => {
	colorSchemeSwitcherDialog.showModal();
});
colorSchemeSwitcherDialogCloseButton.addEventListener("click", (event) => {
	colorSchemeSwitcherDialog.close("close");
});
