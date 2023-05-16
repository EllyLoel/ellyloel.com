import GuiDialog from "./dialog.js";

// new events
const dialogClosing = ({ target: dialog }) => {
	console.log("Dialog closing", dialog);
};

const dialogClosed = ({ target: dialog }) => {
	console.log("Dialog closed", dialog);
	console.info("Dialog user action:", dialog.returnValue);
};

const dialogOpened = ({ target: dialog }) => {
	console.log("Dialog open", dialog);
};

const dialogOpening = ({ target: dialog }) => {
	console.log("Dialog opening", dialog);
};

const dialogRemoved = ({ target: dialog }) => {
	// cleanup new/optional <dialog> events
	dialog.removeEventListener("closing", dialogClosing);
	dialog.removeEventListener("closed", dialogClosed);
	dialog.removeEventListener("opening", dialogOpening);
	dialog.removeEventListener("opened", dialogOpened);
	dialog.removeEventListener("removed", dialogRemoved);

	console.log("Dialog removed", dialog);
};

// SETUP
document.querySelectorAll("dialog").forEach((dialog) => {
	// sugar up <dialog> elements
	GuiDialog(dialog);

	// new/optional <dialog> events to choose from
	dialog.addEventListener("closing", dialogClosing);
	dialog.addEventListener("closed", dialogClosed);
	dialog.addEventListener("opening", dialogOpening);
	dialog.addEventListener("opened", dialogOpened);
	dialog.addEventListener("removed", dialogRemoved);
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
