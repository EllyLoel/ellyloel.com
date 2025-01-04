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

const settingsDialogOpenButton = document.querySelector(
	"#settings-dialog-open-button"
);
const settingsDialogCloseButton = document.querySelector(
	'[data-action="close"]'
);
const settingsDialog = document.querySelector(".settings-dialog");

settingsDialogOpenButton.addEventListener("click", (event) => {
	settingsDialog.showModal();
});
settingsDialogCloseButton.addEventListener("click", (event) => {
	settingsDialog.close("close");
});
